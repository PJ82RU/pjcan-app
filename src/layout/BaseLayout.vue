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

			<menu-dots />
		</v-app-bar>
		<v-main>
			<div class="base-layout__main">
				<router-view />
			</div>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed } from "vue";
import store from "@/store";

import BluetoothBtn from "./components/BluetoothBtn.vue";
import UpdateFirmware from "./components/UpdateFirmware.vue";
import MenuDots from "./components/MenuDots.vue";

export default {
	name: "BaseLayout",
	components: { BluetoothBtn, UpdateFirmware, MenuDots },
	setup()
	{
		const title = computed((): string => store.getters["app/title"]);

		return {
			title
		};
	}
};
</script>

<style lang="scss" scoped>
.base-layout {
	&__main {
		width: 100%;
		height: 100%;
		background: center url("~@/assets/images/tire-track.svg");
		opacity: 10%
	}
}
</style>
