<template>
	<q-card class="CardSection">
		<q-card-section horizontal>
			<q-card-section :horizontal="false" class="CardSection-container">
				<q-card-section class="CardSection-title">
					<IconCustom
						class="CardSection-title-icon"
						v-if="iconName.length > 0"
						:name="iconName"
						:color="iconColor"
						:color-secondary="iconColorSecondary"
						:size="iconSize"
					/>
					<div class="text-h6">{{ title }}</div>
				</q-card-section>
				<q-separator />

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
import IconCustom from '@/components/common/IconCustom';

export default {
	name: 'CardSection',
	components: { CardSectionMenu, IconCustom },
	props: {
		title: {
			type: String,
			require: true
		},
		bookmark: {
			type: Boolean,
			default: false
		},
		iconName: {
			type: String,
			default: ''
		},
		iconColor: {
			type: String,
			default: 'primary'
		},
		iconColorSecondary: {
			type: String,
			default: 'secondary'
		},
		iconSize: {
			type: String,
			default: '26px'
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
	max-width: 420px
	margin-bottom: 10px

	.q-card__actions
		justify-content: flex-start

	&-container
		width: 100%
		padding: 0
		background-color: #f5f5f5

	&-title
		padding-top: 10px
		padding-bottom: 10px
		display: flex
		flex-direction: row
		align-items: center

		&-icon
			margin-right: 10px

		.text-h6
			font-size: 22px

	&-body
		padding-bottom: 0
		font-size: 17px

		.q-card__section
			align-items: center
			margin-bottom: 10px
			padding: 0
</style>
