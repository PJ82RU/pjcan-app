<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="ManualControlCard"
		type="ManualControlCard"
		:title="$t('ManualControlCard')"
		icon-name="steering"
		:menu-card-section="menuCard"
		@click-options="onClickOptions"
	>
		<q-card-section class="ManualControlCard-btns">
			<q-btn-group push class="ManualControlCard-btns-primary">
				<q-btn
					color="primary"
					push
					label="Info"
					icon="info_outline"
					@mousedown="onClickDownInfo"
					@mouseup="onClickUpInfo"
				/>
				<q-btn
					color="primary"
					push
					label="Clock"
					icon="schedule"
					@mousedown="onClickDownClock"
					@mouseup="onClickUpClock"
				/>
			</q-btn-group>
		</q-card-section>
		<q-card-section class="ManualControlCard-btns" v-if="restyle">
			<q-btn-group push class="ManualControlCard-btns-secondary">
				<q-btn color="secondary" push label="H" />
				<q-btn color="secondary" push label="M" />
				<q-btn color="secondary" push label="RM" />
				<q-btn color="secondary" push label="F12" />
				<q-btn color="secondary" push label="F24" />
			</q-btn-group>
		</q-card-section>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, onMounted, onUnmounted, Ref, ref } from 'vue';
import api, { API_EVENT_LCD_VALUE } from '@/store/api';

import CardSection from '@/components/cardSections/CardSection.vue';
import { menuManualControlCard } from '@/store/menu/MenuManualControlCard';
import { TItemMenu } from '@/models/menu';
import { Onboard } from '@/store/onboard';
import { Timeout } from '@/models/types';
import { ILCDValue, LCDValue } from '@/models/pjcan';

export default {
	name: 'ManualControlCard',
	components: { CardSection },
	setup() {
		const onboard = inject('onboard') as Ref<Onboard>;
		// данные LCD
		const lcdValue = ref(new LCDValue());
		// входящие значения об устройстве
		const onReceiveValue = (res: ILCDValue): void => {
			lcdValue.value.setModel(res);
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

		const onClickOptions = (e: any): void => {
			//console.log('ManualControlCard -> onClickOptions', e);
			if (e.type !== TItemMenu.MANUAL_CONTROL_RESTYLE) return;

			onboard.value.restyle = !onboard.value.restyle;
			menuCard.value[0].lang = onboard.value.restyle
				? 'ManualControlCard_BeforeRestyling'
				: 'ManualControlCard_Restyling';
		};

		let timeoutInfo: Timeout = undefined;
		const onClickDownInfo = (): void => {
			console.log('onClickDownInfo');
			timeoutInfo = setTimeout(onClickUpInfo, 3000);
		};
		const onClickUpInfo = (): void => {
			console.log('onClickUpInfo');
			clearTimeout(timeoutInfo);
		};

		let timeoutClock: Timeout = undefined;
		const onClickDownClock = (): void => {
			console.log('onClickDownClock');
			timeoutClock = setTimeout(onClickUpClock, 3000);
		};
		const onClickUpClock = (): void => {
			console.log('onClickUpClock');
			clearTimeout(timeoutClock);
		};

		return {
			restyle,
			menuCard,
			onClickOptions,
			onClickDownInfo,
			onClickUpInfo,
			onClickDownClock,
			onClickUpClock
		};
	}
};
</script>

<style lang="sass">
.ManualControlCard
	&-btns
		text-align: center

		.q-btn__content
			flex-wrap: nowrap

		&-primary
			width: 100%
			max-width: 600px
			button
				width: 50%
				max-width: 300px
				font-size: 20px

		&-secondary
			width: 100%
			max-width: 600px
			button
				width: 20%
				max-width: 120px
				font-size: 17px
</style>
