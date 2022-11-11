<template>
	<v-card class="card">
		<v-card-text class="card__text">
			<slot name="body" />
		</v-card-text>
		<v-card-actions class="justify-space-between">
			<div class="pl-4 pr-4 text-h5 text-uppercase">
				{{ title }}
			</div>
			<v-btn-group class="border-dialog-btns">
				<v-btn v-if="custom !== undefined" :icon="custom" color="primary" @click="$emit('click:custom')" />
				<v-btn v-if="like !== undefined" icon="mdi-heart" color="primary" @click="$emit('click:like')" />
				<menu-dots
					v-if="menu && menu.length > 0"
					:menu="menu"
					color="primary"
					@click:item="$emit('click:menu', $event)"
				/>
			</v-btn-group>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import MenuDots from "@/components/MenuDots.vue";

export default {
	name: "Card",
	components: { MenuDots },
	props: {
		title: String,
		menu: Array as () => string[],
		like: {
			type: Boolean,
			default: undefined
		},
		custom: {
			type: String,
			default: undefined
		}
	},
	emits: ["click:custom", "click:like", "click:menu"]
};
</script>

<style lang="scss" scoped>
.card {
	width: 100%;
	height: 100%;
	background: rgba(120, 144, 156, 0.1);
	box-shadow: 0 4px 16px rgba(27, 44, 61, 0.18);
	border-radius: 6px;

	&__text {
		overflow-y: auto;
	}

	::v-deep(.v-card-text) {
		height: calc(100% - 48px);
		padding: 16px !important;
	}
	::v-deep(.v-btn .v-icon) {
		color: white;
	}
}
</style>
