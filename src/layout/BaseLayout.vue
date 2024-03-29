<template>
	<v-app class="base-layout">
		<v-app-bar flat class="base-layout__toolbar" color="primary" :height="50">
			<v-toolbar-title>
				<span class="text-h4">
					{{ title }}
				</span>
			</v-toolbar-title>

			<v-spacer />

			<v-btn
				v-if="$vuetify.display.mdAndUp"
				class="base-layout__onboard-buttons"
				@click="visibleOnboardButtons = true"
			>
				<icon-custom name="steering-wheel" :colors="{ primary: 'white', secondary: 'white' }" />
				<span class="pl-2">ONBOARD</span>
			</v-btn>
			<v-btn icon="mdi-fit-to-screen-outline" @click="toggleFullscreen" />

			<bluetooth-btn />
			<update-firmware-dialog v-model="visibleUpdate" :new-version="newVersionFirmware" />

			<menu-dots :menu="menu" @click:item="onMenuClick" />
			<about-dialog v-model="visibleAbout" />
			<onboard-buttons-dialog v-model="visibleOnboardButtons" :car-model="carModel" />
			<test-dialog v-model="visibleTest" />
		</v-app-bar>
		<v-main>
			<div class="base-layout__bg" />
			<div class="base-layout__main" :style="{ width: `${pageWidth}px`, height: `${pageHeight - 50}px` }">
				<router-view />
			</div>

			<message-dialog
				v-if="message"
				v-model="visibleMessage"
				:title="message.title"
				:icon="message?.icon"
				:text="message.text"
				:btns="message?.btns"
				:width="message?.width"
			/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import router from "@/router";
import store from "@/store";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import moment from "moment/moment";
import ScreenFull from "screenfull";

import BluetoothBtn from "../components/BluetoothBtn.vue";
import UpdateFirmwareDialog from "../components/dialogs/UpdateFirmwareDialog.vue";
import MenuDots, { IMenuItem } from "@/components/MenuDots.vue";
import AboutDialog from "../components/dialogs/AboutDialog.vue";
import OnboardButtonsDialog from "../components/dialogs/OnboardButtonsDialog.vue";
import TestDialog from "../components/dialogs/TestDialog.vue";
import MessageDialog from "@/components/dialogs/MessageDialog.vue";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

import { IMessage } from "@/models/interfaces/message/IMessage";
import { Timeout } from "@/models/types/Timeout";
import { API_VERSION_EVENT } from "@/models/pjcan/version";

import canbus from "@/api/canbus";
import { API_CAR_CONFIG_EVENT, ECarModel, ICarConfig } from "@/models/pjcan/car";

export default {
	name: "BaseLayout",
	components: {
		BluetoothBtn,
		UpdateFirmwareDialog,
		MenuDots,
		AboutDialog,
		OnboardButtonsDialog,
		TestDialog,
		MessageDialog,
		IconCustom
	},
	setup()
	{
		const { t, locale } = useI18n();

		const title = computed((): string =>
		{
			const result = router.currentRoute.value.meta?.title as string;
			return "PJCAN: " + (result?.length > 0 ? t(result) : "");
		});
		const newVersionFirmware = ref(false as string | boolean);

		const carModel = ref(canbus.configs.car.carModel);
		const onReceiveCarConfig = (res: ICarConfig): void =>
		{
			if (res.isData) carModel.value = res.carModel;
		};

		const menu = computed((): IMenuItem[] =>
		{
			const result = [] as IMenuItem[];
			const { name } = router.currentRoute.value;

			result.push(
				{ id: 0, title: t("menu.onboard"), disabled: name === "Onboard" },
				{ id: 1, title: t("menu.settings.buttons"), disabled: name === "Buttons" },
				{ id: 6, title: t("menu.settings.options"), disabled: name === "Options" },
				{ id: 4, title: t("menu.onboardButtons") },
			);
			if (carModel.value !== ECarModel.CAR_MODEL_MAZDA_CX9_REST)
			{
				result.push({ id: 5, title: t("menu.test") });
			}
			result.push(
                {} as IMenuItem,
                { id: 2, title: t("menu.language." + (locale.value !== "ru" ? "russian" : "english")) }
			);
			if (typeof newVersionFirmware.value === "string")
			{
				result.push({ id: 7, title: t("menu.update", { version: newVersionFirmware.value }) });
			}
			result.push({ id: 3, title: t("menu.about") });

			return result;
		});
		const visibleAbout = ref(false);
		const visibleOnboardButtons = ref(false);
		const visibleTest = ref(false);
		const visibleUpdate = ref(false);

		/** Событие выбора пункта меню */
		const onMenuClick = (data: any) =>
		{
			switch (data.id)
			{
				case 0:
					router.push({ name: "Onboard" });
					break;
				case 1:
					router.push({ name: "Buttons" });
					break;
				case 2:
					locale.value = locale.value !== "ru" ? "ru" : "en";
					moment.locale(locale.value);
					break;
				case 3:
					visibleAbout.value = true;
					break;
				case 4:
					visibleOnboardButtons.value = true;
					break;
				case 5:
					visibleTest.value = true;
					break;
				case 6:
					router.push({ name: "Options" });
					break;
				case 7:
					visibleUpdate.value = true;
					break;
			}
		};

		const pageWidth = ref(0);
		const pageHeight = ref(0);
		const windowSize = () =>
		{
			pageWidth.value = document.documentElement.clientWidth;
			pageHeight.value = document.documentElement.clientHeight;
		};

		onMounted(() =>
		{
			window.addEventListener("resize", windowSize);
			windowSize();
			canbus.addListener(API_VERSION_EVENT, onCheckVersion);
			canbus.addListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			onReceiveCarConfig(canbus.configs.car);
		});
		onUnmounted(() =>
		{
			window.removeEventListener("resize", windowSize);
			canbus.removeListener(API_VERSION_EVENT, onCheckVersion);
			canbus.removeListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
		});

		/** Переключение полноэкранного режима */
		const toggleFullscreen = () =>
		{
			if (ScreenFull.isEnabled) ScreenFull.toggle();
		};

		// Вывод сообщений //

		const visibleMessage = computed({
			get: (): boolean => store.getters["app/visibleMessage"],
			set: (val: boolean): void => store.commit("app/setVisibleMessage", val)
		});
		const message = computed((): IMessage => store.getters["app/message"]);

		let timer: Timeout;
		watch(message, (msg: IMessage): void =>
		{
			if (timer) clearTimeout(timer);
			if (msg?.timeout)
			{
				timer = setTimeout(() =>
				{
					store.commit("app/freeMessage");
					timer = undefined;
				}, msg.timeout);
			}
		});

		/** Проверка версии прошивки */
		const onCheckVersion = (): void =>
		{
			if (!newVersionFirmware.value)
			{
				newVersionFirmware.value = true;
				canbus
					.checkVersion()
					.then((newVersion) =>
					{
						newVersionFirmware.value = newVersion.toString;
						if (!newVersion.is)
						{
							store.commit("app/setMessage", {
								title: t("update.warning"),
								icon: "mdi-alert-outline",
								text: t("update.dialog.browserOutdated"),
								btns: [{ title: t("btn.ok") }],
								width: 700
							} as IMessage);
						}
						else
						{
							setTimeout(() =>
							{
								toast.warning(t("update.notify.newVersion", { version: newVersionFirmware.value }));
							}, 5000);
						}
					})
					.catch(() => {});
			}
		};

		return {
			title,
			menu,
			carModel,
			newVersionFirmware,
			visibleAbout,
			visibleOnboardButtons,
			visibleTest,
			visibleUpdate,
			pageWidth,
			pageHeight,
			visibleMessage,
			message,
			onMenuClick,
			toggleFullscreen
		};
	}
};
</script>

<style lang="scss" scoped>
.base-layout {
	&__bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: center url("~@/assets/images/tire-track.svg");
		opacity: 10%;
		z-index: 0;
	}

	&__main {
		position: fixed;
		top: 50px;
		left: 0;
		padding: 16px;
	}

	&__onboard-buttons {
		font-size: 1.25rem !important;
		line-height: 1.5rem !important;
	}
}
</style>
