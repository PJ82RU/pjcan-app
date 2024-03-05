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
			<onboard-buttons-dialog v-model="visibleOnboardButtons" />
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
import ScreenFull from "screenfull";
import moment from "moment/moment";
import canbus from "@/api/canbus";

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
import { API_MAZDA_CONFIG_EVENT, TCarModel, IMazdaConfig } from "@/models/pjcan/mazda";

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

		const visibleAbout = ref(false);
		const visibleOnboardButtons = ref(false);
		const visibleTest = ref(false);
		const visibleUpdate = ref(false);

		const title = computed((): string =>
		{
			const result = router.currentRoute.value.meta?.title as string;
			return "PJCAN: " + (result?.length > 0 ? t(result) : "");
		});
		const newVersionFirmware = ref(false as string | boolean);
		const menu = computed((): IMenuItem[] =>
		{
			const result = [] as IMenuItem[];
			const { name, query } = router.currentRoute.value;

			result.push(
				{ id: 0, title: t("menu.onboard"), disabled: name === "Onboard" },
				{ id: 40, title: t("menu.onboardButtons") },
				{ id: 60, title: t("menu.settings.options"), disabled: name === "Options" },
				{} as IMenuItem,
				{ id: 10, title: t("menu.settings.buttonsSW1"), disabled: name === "Buttons" && query?.type === "sw1" },
				{ id: 11, title: t("menu.settings.buttonsSW3"), disabled: name === "Buttons" && query?.type === "sw3" },
				{} as IMenuItem,
			);
			result.push({
				id: 20,
				title: t("menu.language." + (locale.value !== "ru" ? "russian" : "english"))
			});
			if (typeof newVersionFirmware.value === "string")
			{
				result.push({ id: 70, title: t("menu.update", { version: newVersionFirmware.value }) });
			}
			if (store.getters["app/carModel"] !== TCarModel.CAR_MODEL_MAZDA_CX9_REST)
			{
				result.push({ id: 50, title: t("menu.test") });
			}
			result.push({} as IMenuItem, { id: 30, title: t("menu.about") });

			return result;
		});

		/** Событие выбора пункта меню */
		const onMenuClick = (data: any) =>
		{
			switch (data.id)
			{
				case 0:
					router.push({ name: "Onboard" });
					break;
				case 10:
					router.push({ name: "Buttons", query: { type: "sw1" } });
					break;
				case 11:
					router.push({ name: "Buttons", query: { type: "sw3" } });
					break;
				case 20:
					locale.value = locale.value !== "ru" ? "ru" : "en";
					moment.locale(locale.value);
					break;
				case 30:
					visibleAbout.value = true;
					break;
				case 40:
					visibleOnboardButtons.value = true;
					break;
				case 50:
					visibleTest.value = true;
					break;
				case 60:
					router.push({ name: "Options" });
					break;
				case 70:
					visibleUpdate.value = true;
					break;
			}
		};

		/** Переключение полноэкранного режима */
		const toggleFullscreen = () =>
		{
			if (ScreenFull.isEnabled) ScreenFull.toggle();
		};

		// Вывод сообщений ---

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

		// ---

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

		const pageWidth = ref(0);
		const pageHeight = ref(0);
		const windowSize = () =>
		{
			pageWidth.value = document.documentElement.clientWidth;
			pageHeight.value = document.documentElement.clientHeight;
		};

		const onReceiveMazdaConfig = (res: IMazdaConfig): void =>
		{
			if (res.isData) store.commit("app/setCarModel", res.carModel);
		};
		onMounted(() =>
		{
			window.addEventListener("resize", windowSize);
			windowSize();

			canbus.addListener(API_VERSION_EVENT, onCheckVersion);
			canbus.addListener(API_MAZDA_CONFIG_EVENT, onReceiveMazdaConfig);
			if (canbus.begin)
			{
				onCheckVersion();
				onReceiveMazdaConfig(canbus.mazda);
			}
		});
		onUnmounted(() =>
		{
			window.removeEventListener("resize", windowSize);

			canbus.removeListener(API_VERSION_EVENT, onCheckVersion);
			canbus.removeListener(API_MAZDA_CONFIG_EVENT, onReceiveMazdaConfig);
		});

		return {
			title,
			menu,
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
