<template>
	<v-card class="card">
		<v-card-text>
			<slot name="body" />
		</v-card-text>
		<v-card-actions class="justify-space-between">
			<div class="pl-4 pr-4 text-h5 text-uppercase">
				{{ title }}
			</div>
			<v-btn-group class="border-dialog-btns">
				<v-btn icon="mdi-close" color="primary" @click="$emit('click:close')" />
			</v-btn-group>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
export default {
	name: "Card",
	props: {
		title: String
	},
	emits: ["click:close"]
};
</script>

<style lang="scss" scoped>
.card
{
	width: 100%;
	height: 100%;
	background: rgba(120, 144, 156, 0.1);
	box-shadow: 0 4px 16px rgba(27, 44, 61, 0.18);
	border-radius: 6px;

	::v-deep(.v-card-text) {
		height: calc(100% - 48px);
		padding: 16px !important;
	}
	::v-deep(.v-btn .v-icon) {
		color: white;
	}
}
</style>
