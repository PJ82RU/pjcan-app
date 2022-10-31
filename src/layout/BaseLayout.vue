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

			<bluetooth-btn />
			<update-firmware />

			<menu-dots :menu="menu" @click:item="onMenuClick" />
			<about-modal v-model="visibleAbout" />
		</v-app-bar>
		<v-main>
			<div class="base-layout__bg" />
			<div class="base-layout__main" :style="{ width: `${pageWidth}px`, height: `${pageHeight - 50}px`}">
				<router-view />
			</div>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import store from "@/store";
import i18n from "@/lang";

import BluetoothBtn from "./components/BluetoothBtn.vue";
import UpdateFirmware from "./components/UpdateFirmware.vue";
import MenuDots from "@/components/MenuDots.vue";
import AboutModal from "./components/AboutModal.vue";

export default {
	name: "BaseLayout",
	components: { BluetoothBtn, UpdateFirmware, MenuDots, AboutModal },
	setup()
	{
		const title = computed((): string => store.getters["app/title"]);
		const menu = computed((): string[] => [
			i18n.global.t("menu.settings.buttons"),
			"",
			i18n.global.t("menu.language." + (i18n.global.locale !== "ru" ? "english" : "russian")),
			i18n.global.t("menu.about")
		]);
		const visibleAbout = ref(false);

		/** Событие выбора пункта меню */
		const onMenuClick = (data: any) =>
		{
			if (data.index === 3) visibleAbout.value = true;
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

		return {
			title,
			menu,
			visibleAbout,
			pageWidth,
			pageHeight,
			onMenuClick
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
