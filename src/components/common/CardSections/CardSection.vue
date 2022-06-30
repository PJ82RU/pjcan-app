<template>
	<q-card class="CardSection">
		<q-card-section horizontal>
			<q-card-section :horizontal="false" class="CardSection-container">
				<q-card-section class="CardSection-title">
					<div class="text-h6">{{ title }}</div>
					<q-separator />
				</q-card-section>

				<q-card-section class="CardSection-body">
					<slot />
				</q-card-section>
			</q-card-section>

			<q-card-actions vertical class="CardSection-menu">
				<q-btn flat round color="secondary" icon="more_vert" @click="$emit('click-options')" />
				<q-btn flat round color="primary" :icon="bookmarkIcon" @click="$emit('click-bookmark')" />
				<q-btn flat round color="primary" icon="help_outline" @click="$emit('click-help')" />
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'CardSection',
	props: {
		title: {
			type: String,
			require: true
		},
		bookmark: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any) {
		const { bookmark } = toRefs(props);
		const bookmarkIcon = computed(() => (bookmark.value ? 'bookmark' : 'bookmark_outline'));

		return {
			bookmarkIcon
		};
	}
};
</script>

<style lang="sass">
.CardSection
	width: 100%
	max-width: 400px

	.q-card__actions
		justify-content: flex-start

	&-container
		width: 100%
		padding: 0
		background-color: #f5f5f5

	&-title
		padding-top: 10px
		padding-bottom: 0

		.text-h6
			padding-bottom: 6px

	&-body
		padding-bottom: 0

		.q-card__section
			align-items: center
			margin-bottom: 10px
</style>
