<!--suppress JSUnresolvedVariable -->
<template>
	<v-app class="base-layout">
		<v-app-bar flat class="base-layout__toolbar" color="#0b677b" :height="50">
			<v-app-bar-nav-icon />

			<v-toolbar-title>
				<span class="text-h5">
					{{ $route?.meta?.title ?? "" }}
				</span>
			</v-toolbar-title>

			<v-spacer />

			<bluetooth-btn />
			<update-firmware />

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<router-view class="base-layout__view" />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import BluetoothBtn from "./components/BluetoothBtn.vue";
import UpdateFirmware from "./components/UpdateFirmware.vue";

export default {
	name: "BaseLayout",
	components: { BluetoothBtn, UpdateFirmware }
};
</script>

<style lang="scss" scoped>
.base-layout {
	&__toolbar {
		color: white;
	}

	&__view {
		height: 100%;
	}
}
</style>
