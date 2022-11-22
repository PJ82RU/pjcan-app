<!--suppress JSUnresolvedVariable -->
<template>
	<v-app class="base-layout">
		<v-app-bar flat class="base-layout__toolbar" color="primary" :height="50">
			<!--<v-app-bar-nav-icon />-->

			<v-toolbar-title>
				<span class="text-h5">
					{{ title }}
				</span>
			</v-toolbar-title>

			<v-spacer />

			<v-btn icon="mdi-fit-to-screen-outline" @click="toggleFullscreen" />

			<bluetooth-btn />
			<update-firmware-dialog />

			<menu-dots :menu="menu" @click:item="onMenuClick" />
			<about-dialog v-model="visibleAbout" />
		</v-app-bar>
		<v-main>
			<div class="base-layout__bg" />
			<div class="base-layout__main" :style="{ width: `${pageWidth}px`, height: `${pageHeight - 50}px` }">
				<router-view />
			</div>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import store from "@/store";
import router from "@/router";
import i18n from "@/lang";

import BluetoothBtn from "./components/BluetoothBtn.vue";
import UpdateFirmwareDialog from "./components/UpdateFirmwareDialog.vue";
import MenuDots, { IMenuItem } from "@/components/MenuDots.vue";
import AboutDialog from "./components/AboutDialog.vue";
import ScreenFull from "screenfull";

export default {
	name: "BaseLayout",
	components: { BluetoothBtn, UpdateFirmwareDialog, MenuDots, AboutDialog },
	setup()
	{
		const title = computed((): string => store.getters["app/title"]);
		const menu = computed((): IMenuItem[] =>
		{
			const lang = i18n.global;
			const result = [] as IMenuItem[];
			const { name } = router.currentRoute.value;

			if (name !== "Onboard") result.push({ id: 0, title: lang.t("menu.onboard") });
			if (name !== "Buttons") result.push({ id: 1, title: lang.t("menu.settings.buttons") });
			result.push(
				{ id: 2, title: lang.t("menu.language." + (lang.locale !== "ru" ? "english" : "russian")) },
				{} as IMenuItem,
				{ id: 3, title: lang.t("menu.about") }
			);

			return result;
		});
		const visibleAbout = ref(false);

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

				case 3:
					visibleAbout.value = true;
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

		return {
			title,
			menu,
			visibleAbout,
			pageWidth,
			pageHeight,
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
