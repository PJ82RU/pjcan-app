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
				<q-btn flat round color="secondary" icon="more_vert">
					<CardSectionMenu @click="onClickOptions" />
				</q-btn>
				<q-btn flat round color="primary" :icon="bookmarkIcon" @click="onClickBookmark" />
				<q-btn flat round color="primary" icon="help_outline" @click="onClickHelp" />
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import CardSectionMenu from '@/components/menu/CardSectionMenu.vue';

export default {
	name: 'CardSection',
	components: { CardSectionMenu },
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
	emits: ['click-options', 'click-bookmark', 'click-help'],
	setup(props: any, context: any) {
		const { bookmark } = toRefs(props);
		const { emit } = context;

		const bookmarkIcon = computed(() => (bookmark.value ? 'bookmark' : 'bookmark_outline'));

		const onClickOptions = (e: any) => emit('click-options', e);
		const onClickBookmark = (e: any) => emit('click-bookmark', e);
		const onClickHelp = (e: any) => emit('click-help', e);

		return {
			bookmarkIcon,
			onClickOptions,
			onClickBookmark,
			onClickHelp
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
