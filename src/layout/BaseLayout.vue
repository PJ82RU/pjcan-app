<!--suppress JSUnresolvedVariable -->
<template>
	<v-app class="base-layout">
		<v-app-bar flat class="base-layout__toolbar" color="primary" :height="50">
			<!--<v-app-bar-nav-icon />-->

			<v-toolbar-title>
				<span class="text-h4">
					{{ title }}
				</span>
			</v-toolbar-title>

			<v-spacer />

			<v-btn icon="mdi-fit-to-screen-outline" @click="toggleFullscreen" />

			<bluetooth-btn />
			<update-firmware-dialog />

			<menu-dots :menu="menu" @click:item="onMenuClick" />
			<about-dialog v-model="visibleAbout" />
			<onboard-buttons-dialog v-model="visibleOnboardButtons" />
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
			/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import router from "@/router";
import store from "@/store";
import { useI18n } from "vue-i18n";
import moment from "moment/moment";
import ScreenFull from "screenfull";

import BluetoothBtn from "./components/BluetoothBtn.vue";
import UpdateFirmwareDialog from "./components/UpdateFirmwareDialog.vue";
import MenuDots, { IMenuItem } from "@/components/MenuDots.vue";
import AboutDialog from "./components/AboutDialog.vue";
import OnboardButtonsDialog from "./components/OnboardButtonsDialog.vue";
import MessageDialog from "@/layout/components/MessageDialog.vue";

import { IMessage } from "@/models/interfaces/message/IMessage";

export default {
	name: "BaseLayout",
	components: { BluetoothBtn, UpdateFirmwareDialog, MenuDots, AboutDialog, OnboardButtonsDialog, MessageDialog },
	setup()
	{
		const { t, locale } = useI18n();

		const title = computed((): string =>
		{
			const result = router.currentRoute.value.meta?.title as string;
			return "PJ CAN: " + (result?.length > 0 ? t(result) : "");
		});
		const menu = computed((): IMenuItem[] =>
		{
			const result = [] as IMenuItem[];
			const { name } = router.currentRoute.value;

			result.push(
				{ id: 0, title: t("menu.onboard"), disabled: name === "Onboard" },
				{ id: 1, title: t("menu.settings.buttons"), disabled: name === "Buttons" },
				{ id: 4, title: t("menu.onboardButtons") },
				{} as IMenuItem,
				{ id: 2, title: t("menu.language." + (locale.value !== "ru" ? "russian" : "english")) },
				{ id: 3, title: t("menu.about") }
			);

			return result;
		});
		const visibleAbout = ref(false);
		const visibleOnboardButtons = ref(false);

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
		});
		onUnmounted(() =>
		{
			window.removeEventListener("resize", windowSize);
		});

		/** Переключение полноэкранного режима */
		const toggleFullscreen = () =>
		{
			if (ScreenFull.isEnabled) ScreenFull.toggle();
		};

		// Вывод сообщений //

		const visibleMessage = computed({
			get: (): boolean => (store.getters["app/visibleMessage"]),
			set: (val: boolean): void => (store.commit("app/setVisibleMessage", val))
		});
		const message = computed((): IMessage => store.getters["app/message"]);

		return {
			title,
			menu,
			visibleAbout,
			visibleOnboardButtons,
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
}
</style>
