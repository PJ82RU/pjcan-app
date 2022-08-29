<!--suppress RequiredAttributes, JSVoidFunctionReturnValueUsed, HtmlUnknownAttribute -->
<template>
	<card-section
		class="manual-control-card"
		type="ManualControlCard"
		:title="$t('ManualControlCard')"
		icon-name="steering"
		:menu-card-section="menuCard"
		@click-options="onClickOptions"
	>
		<q-card-section class="manual-control-card__btns">
			<q-btn-group push class="manual-control-card__btns__primary">
				<q-btn
					color="primary"
					push
					label="Info"
					icon="info_outline"
					@mousedown="onClickDownInfo"
					@mouseup="onClickUpInfo"
					v-touch:press="onClickDownInfo"
					v-touch:release="onClickUpInfo"
				/>
				<q-btn
					color="primary"
					push
					label="Clock"
					icon="schedule"
					@mousedown="onClickDownClock"
					@mouseup="onClickUpClock"
					v-touch:press="onClickDownClock"
					v-touch:release="onClickUpClock"
				/>
			</q-btn-group>
		</q-card-section>
		<q-card-section class="manual-control-card__btns" v-if="restyle">
			<q-btn-group push class="manual-control-card__btns__secondary">
				<q-btn
					color="secondary"
					push
					label="H"
					@mousedown="onClickDownClockH"
					@mouseup="onClickUpClockH"
					v-touch:press="onClickDownClockH"
					v-touch:release="onClickUpClockH"
				/>
				<q-btn
					color="secondary"
					push
					label="M"
					@mousedown="onClickDownClockM"
					@mouseup="onClickUpClockM"
					v-touch:press="onClickDownClockM"
					v-touch:release="onClickUpClockM"
				/>
				<q-btn
					color="secondary"
					push
					label="RM"
					@mousedown="onClickDownClockRM"
					@mouseup="onClickUpClockRM"
					v-touch:press="onClickDownClockRM"
					v-touch:release="onClickUpClockRM"
				/>
				<q-btn
					color="secondary"
					push
					label="F12"
					@mousedown="onClickClockF12"
					v-touch:press="onClickClockF12"
				/>
				<q-btn
					color="secondary"
					push
					label="F24"
					@mousedown="onClickClockF24"
					v-touch:press="onClickClockF24"
				/>
			</q-btn-group>
		</q-card-section>
	</card-section>
</template>

<script lang="ts">
import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import { ManualControlButtons } from './ManualControlButtons';

import api, { API_EVENT_LCD_VALUE } from '@/store/api';
import { menuManualControlCard } from '@/store/menu/MenuManualControlCard';
import { Onboard } from '@/store/onboard';

import { TItemMenu } from '@/models/menu';
import { ILCDValue, LCDValue } from '@/models/pjcan';

export default {
	name: 'ManualControlCard',
	components: { CardSection },
	setup() {
		const onboard = inject('onboard') as Ref<Onboard>;
		// данные LCD
		const lcdValue = new LCDValue();
		const buttons = new ManualControlButtons(lcdValue);
		// входящие значения об устройстве
		const onReceiveValue = (res: ILCDValue): void => {
			lcdValue.setModel(res);
		};
		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_LCD_VALUE, onReceiveValue);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_LCD_VALUE, onReceiveValue);
		});

		const restyle = computed((): boolean => onboard.value.restyle);
		const menuCard = ref(menuManualControlCard);
		const setLangMenuCard = (): void => {
			menuCard.value[0].lang = onboard.value.restyle
				? 'ManualControlCard_BeforeRestyling'
				: 'ManualControlCard_Restyling';
		};
		setLangMenuCard();

		/** Изменение стиля (рестайлинг/до рестайлинг) автомобиля */
		const onClickOptions = (e: any): void => {
			// console.log('ManualControlCard -> onClickOptions', e);
			if (e.type !== TItemMenu.MANUAL_CONTROL_RESTYLE) return;

			onboard.value.restyle = !onboard.value.restyle;
			setTimeout(() => setLangMenuCard(), 250);
		};

		return {
			restyle,
			menuCard,
			onClickOptions,
			onClickDownInfo: () => buttons.onClickDownInfo(),
			onClickUpInfo: () => buttons.onClickUpInfo(),
			onClickDownClock: () => buttons.onClickDownClock(),
			onClickUpClock: () => buttons.onClickUpClock(),
			onClickDownClockH: () => buttons.onClickDownClockH(),
			onClickUpClockH: () => buttons.onClickUpClockH(),
			onClickDownClockM: () => buttons.onClickDownClockM(),
			onClickUpClockM: () => buttons.onClickUpClockM(),
			onClickDownClockRM: () => buttons.onClickDownClockRM(),
			onClickUpClockRM: () => buttons.onClickUpClockRM(),
			onClickClockF12: () => buttons.onClickClockF12(),
			onClickClockF24: () => buttons.onClickClockF24()
		};
	}
};
</script>

<style lang="sass">
.manual-control-card
	&__btns
		text-align: center

		.q-btn__content
			flex-wrap: nowrap

		&__primary
			width: 100%
			max-width: 600px
			button
				width: 50%
				max-width: 300px
				font-size: 20px

		&__secondary
			width: 100%
			max-width: 600px
			button
				width: 20%
				max-width: 120px
				font-size: 17px
</style>
