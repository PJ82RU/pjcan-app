<!--suppress TypeScriptValidateJSTypes -->
<template>
	<q-card class="card-section">
		<q-card-section horizontal>
			<q-card-section :horizontal="false" class="card-section__container">
				<q-card-section class="card-section__title">
					<icon-custom
						class="card-section__title__icon"
						v-if="iconName?.length > 0"
						:name="iconName"
						:colors="{ primary: iconColor, secondary: iconColorSecondary }"
						:size="iconSize"
					/>
					<div class="text-h6">{{ title }}</div>
				</q-card-section>
				<q-separator />

				<q-card-section class="card-section__body">
					<slot />
				</q-card-section>
			</q-card-section>

			<q-card-actions vertical class="card-section__menu">
				<q-btn v-if="showOptions" flat round color="secondary" icon="more_vert">
					<card-sectionMenu :menu-card-section="menuCardSection" @click="onOptionsClick" />
					<!--<q-tooltip class="card-section__menu__tooltip" anchor="bottom middle" self="top middle">{{-->
					<!--	$t('SettingLCD')-->
					<!--}}</q-tooltip>-->
				</q-btn>
				<q-btn v-if="showBookmark" flat round color="primary" :icon="bookmarkIcon" @click="onBookmarkClick" />
				<q-btn v-if="showApply" flat round color="primary" icon="done" @click="onApplyClick" />
				<q-btn v-if="showCancel" flat round color="secondary" icon="clear" @click="onCancelClick" />
				<q-btn v-if="showHelp" flat round color="secondary" icon="help_outline" @click="onHelpClick" />
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
		iconName: String,
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
		},
		showOptions: Boolean,
		showBookmark: Boolean,
		showApply: Boolean,
		showCancel: Boolean,
		showHelp: Boolean
	},
	emits: ['click:options', 'click:bookmark', 'click:apply', 'click:cancel', 'click:help'],
	setup(props: any, context: any) {
		const { type } = toRefs(props);
		const { emit } = context;
		const onboard: Ref | undefined = inject('onboard');

		// bookmark
		const bookmarkIcon = computed(() => (onboard?.value.isCard(type.value) ? 'bookmark' : 'bookmark_outline'));
		const onBookmarkClick = (e: any) => {
			if (onboard?.value.isCard(type.value)) onboard?.value.removeCard(type.value);
			else onboard?.value.addCard(type.value);

			emit('click:bookmark', e);
		};

		const onOptionsClick = (e: any) => emit('click:options', e);
		const onApplyClick = (e: any) => emit('click:apply', e);
		const onCancelClick = (e: any) => emit('click:cancel', e);
		const onHelpClick = (e: any) => emit('click:help', e);

		return {
			bookmarkIcon,
			onOptionsClick,
			onBookmarkClick,
			onApplyClick,
			onCancelClick,
			onHelpClick
		};
	}
};
</script>

<style lang="sass">
.card-section
	width: 100%
	margin-bottom: 10px
	box-shadow: none
	border: 1px solid rgba(0, 0, 0, 0.12)

	.q-card__actions
		justify-content: flex-start

	&__container
		width: 100%
		padding: 0
		background-color: #f5f5f5

	&__title
		padding-top: 10px
		padding-bottom: 10px
		display: flex
		flex-direction: row
		align-items: center

		&__icon
			margin-right: 10px

		.text-h6
			font-size: 22px

	&__body
		padding-bottom: 0
		font-size: 17px

		.q-card__section
			align-items: center
			margin-bottom: 10px
			padding: 0

	&__menu
		&__tooltip
			font-size: 14px
</style>
