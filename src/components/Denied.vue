<template>
	<v-container class="loading fill-height d-flex align-center justify-center" fluid>
		<icon-custom name="ass" size="100" color="white" />
		<span class="ml-4">
			{{ $t("error.title") }}
		</span>
	</v-container>
</template>

<script lang="ts">
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "Denied",
	components: { IconCustom }
};
</script>

<style lang="scss" scoped>
.loading {
	white-space: pre-line;
}
</style>
