<!--suppress JSUnresolvedVariable -->
<template>
	<v-app class="base-layout">
		<v-app-bar flat class="base-layout__toolbar" color="#0b677b" :height="50">
			<v-app-bar-nav-icon />

			<v-toolbar-title>
				{{ $route?.meta?.title ?? "" }}
			</v-toolbar-title>

			<v-spacer />

			<v-btn icon>
				<v-icon>mdi-bluetooth</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<router-view class="base-layout__view" />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: "BaseLayout"
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
