<!--suppress TypeScriptValidateJSTypes -->
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
					<CardSectionMenu :menu-card-section="menuCardSection" @click="onClickOptions" />
					<!--<q-tooltip class="CardSection-menu-tooltip" anchor="bottom middle" self="top middle">{{-->
					<!--	$t('SettingLCD')-->
					<!--}}</q-tooltip>-->
				</q-btn>
				<q-btn flat round color="primary" :icon="bookmarkIcon" @click="onClickBookmark" />
				<q-btn flat round color="primary" icon="help_outline" @click="onClickHelp" />
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { computed, inject, Ref, toRefs } from 'vue';
import CardSectionMenu from '@/components/menu/CardSectionMenu.vue';
import IconCustom from '@/components/common/iconCustom';

export default {
	name: 'CardSection',
	components: { CardSectionMenu, IconCustom },
	props: {
		title: {
			type: String,
			require: true
		},
		type: {
			type: String,
			require: true
		},
		menuCardSection: {
			type: Array,
			require: true
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
		const { type } = toRefs(props);
		const { emit } = context;
		const onboard: Ref | undefined = inject('onboard');

		// bookmark
		const bookmarkIcon = computed(() => (onboard?.value.isCard(type.value) ? 'bookmark' : 'bookmark_outline'));
		const onClickBookmark = (e: any) => {
			if (onboard?.value.isCard(type.value)) onboard?.value.removeCard(type.value);
			else onboard?.value.addCard(type.value);

			emit('click-bookmark', e);
		};

		const onClickOptions = (e: any) => emit('click-options', e);
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
	margin-bottom: 10px
	box-shadow: none
	border: 1px solid rgba(0, 0, 0, 0.12)

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

	&-menu
		&-tooltip
			font-size: 14px
</style>
