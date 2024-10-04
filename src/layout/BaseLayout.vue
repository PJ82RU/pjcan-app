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
				v-if="$vuetify.display.mdAndUp && visibleOnBoard"
				class="base-layout__onboard-buttons"
				rounded
				@click="visibleOnboardButtons = true"
			>
				<icon-custom name="steering-wheel" :colors="{ primary: 'white', secondary: 'white' }" />
				<span class="pl-2">ONBOARD</span>
			</v-btn>
			<v-btn v-if="$vuetify.display.smAndUp" icon>
				<icon-custom name="save" :color="colorConfigSave" />
			</v-btn>
			<v-btn icon="mdi-fit-to-screen-outline" @click="toggleFullscreen" />

			<bluetooth-btn />
			<update-firmware-dialog
				v-model="visibleUpdate"
				:version="!rollback ? newVersionFirmware : rollbackFirmware"
				:rollback="rollback"
			/>

			<menu-dots :menu="menu" @click:item="onMenuClick" />
			<about-dialog v-model="visibleAbout" />
			<onboard-buttons-dialog v-model="visibleOnboardButtons" />
			<locale-dialog v-model="visibleLocale" />
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
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import router from "@/router";
import store from "@/store";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import ScreenFull from "screenfull";
import canbus from "@/api/canbus";

import BluetoothBtn from "../components/BluetoothBtn.vue";
import UpdateFirmwareDialog from "../components/dialogs/UpdateFirmwareDialog.vue";
import MenuDots, { IMenuItem } from "@/components/MenuDots.vue";
import AboutDialog from "../components/dialogs/AboutDialog.vue";
import OnboardButtonsDialog from "../components/dialogs/OnboardButtonsDialog.vue";
import MessageDialog from "@/components/dialogs/MessageDialog.vue";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";
import LocaleDialog from "@/components/dialogs/LocaleDialog.vue";

import { IMessage } from "@/models/interfaces/message/IMessage";
import { Timeout } from "@/models/types/Timeout";
import { API_NEW_VERSION_EVENT, IVersion } from "@/models/pjcan/version";
import { API_DEVICE_ROLLBACK_EVENT, IDeviceFirmwareUrl } from "@/models/pjcan/device";
import { TCarModel } from "@/models/pjcan/mazda";

export default {
	name: "BaseLayout",
	components: {
		BluetoothBtn,
		UpdateFirmwareDialog,
		MenuDots,
		AboutDialog,
		OnboardButtonsDialog,
		MessageDialog,
		IconCustom,
		LocaleDialog
	},
	setup()
	{
		const { t } = useI18n();

		const installPrompt = ref(undefined as undefined | Event);

		const visibleAbout = ref(false);
		const visibleOnboardButtons = ref(false);
		const visibleUpdate = ref(false);
		const visibleLocale = ref(false);

		const pageWidth = ref(0);
		const pageHeight = ref(0);

		const carModel = computed((): TCarModel => store.getters["config/carModel"]);
		const visibleOnBoard = computed(
			(): boolean =>
				carModel.value !== TCarModel.CAR_MODEL_UNKNOWN && carModel.value !== TCarModel.CAR_MODEL_MAZDA_6_GH
		);
		const title = computed((): string =>
		{
			const result = router.currentRoute.value.meta?.title as string;
			return "PJCAN: " + (result?.length > 0 ? t(result) : "");
		});
		const colorConfigSave = computed((): string =>
			store.getters["value/device"].config_save ? "success" : "error"
		);
		const newVersionFirmware = ref("");
		const rollbackFirmware = ref("");
		const rollback = ref(false);
		const menu = computed((): IMenuItem[] =>
		{
			const result = [] as IMenuItem[];
			const { name, query } = router.currentRoute.value;

			result.push(
				{ id: 0, title: t("menu.onboard"), disabled: name === "Onboard" },
				{ id: 40, title: t("menu.onboardButtons") },
				{} as IMenuItem,
				{ id: 60, title: t("menu.settings.options"), disabled: name === "Options" },
				{ id: 10, title: t("menu.settings.buttonsSW1"), disabled: name === "Buttons" && query?.type === "sw1" },
				{ id: 20, title: t("menu.language") },
				{} as IMenuItem
			);
			if (newVersionFirmware.value.length)
			{
				result.push({ id: 70, title: t("menu.update", { version: newVersionFirmware.value }) });
			}
			if (rollbackFirmware.value.length)
			{
				result.push({ id: 71, title: t("menu.rollback", { version: rollbackFirmware.value }) });
			}
			if (installPrompt.value)
			{
				result.push({ id: 72, title: t("menu.install") });
			}
			result.push({ id: 30, title: t("menu.about") });
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
				case 20:
					visibleLocale.value = true;
					break;
				case 30:
					visibleAbout.value = true;
					break;
				case 40:
					visibleOnboardButtons.value = true;
					break;
				case 60:
					router.push({ name: "Options" });
					break;
				case 70:
					rollback.value = false;
					visibleUpdate.value = true;
					break;
				case 71:
					rollback.value = true;
					visibleUpdate.value = true;
					break;
				case 72:
					if (installPrompt.value)
					{
						// @ts-ignore
						installPrompt.value.prompt();
						installPrompt.value = undefined;
					}
					break;
			}
		};

		/** Переключение полноэкранного режима */
		const toggleFullscreen = () =>
		{
			if (ScreenFull.isEnabled) ScreenFull.toggle();
		};

		// Вывод сообщений

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

		/** Доступна новая версия прошивки */
		const onNewVersion = (newVersion: IVersion): void =>
		{
			newVersionFirmware.value = newVersion.toString;
			const version = store.getters["config/version"] as IVersion;
			if (version.supported)
			{
				setTimeout(() =>
				{
					toast.warning(t("update.notify.newVersion", { version: newVersionFirmware.value }));
				}, 5000);
			}
			else visibleUpdate.value = true;
		};

		/** Доступна версия прошивки отката */
		const onRollback = (rollback: IDeviceFirmwareUrl): void =>
		{
			if (rollback.current?.length) rollbackFirmware.value = rollback.current;
		};

		/** Изменение размеров страницы */
		const windowSize = () =>
		{
			pageWidth.value = document.documentElement.clientWidth;
			pageHeight.value = document.documentElement.clientHeight;
		};

		onBeforeMount(() =>
		{
			window.addEventListener("beforeinstallprompt", (e: Event) =>
			{
				e.preventDefault();
				installPrompt.value = e;
			});
		});

		onMounted(() =>
		{
			canbus.addListener(API_NEW_VERSION_EVENT, onNewVersion);
			canbus.addListener(API_DEVICE_ROLLBACK_EVENT, onRollback);
			window.addEventListener("resize", windowSize);
			windowSize();
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_NEW_VERSION_EVENT, onNewVersion);
			canbus.removeListener(API_DEVICE_ROLLBACK_EVENT, onRollback);
			window.removeEventListener("resize", windowSize);
		});

		return {
			carModel,
			title,
			menu,
			newVersionFirmware,
			rollbackFirmware,
			visibleOnBoard,
			visibleAbout,
			visibleOnboardButtons,
			visibleUpdate,
			visibleLocale,
			pageWidth,
			pageHeight,
			visibleMessage,
			message,
			colorConfigSave,
			rollback,
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
