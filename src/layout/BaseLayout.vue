<template>
	<v-app class="base-layout">
		<v-app-bar
				class="base-layout__toolbar"
				app
				clipped-left
				flat
				color="#0B677B"
				:height="50"
		>
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
	&__view {
		height: 100%;
	}
}
</style>
