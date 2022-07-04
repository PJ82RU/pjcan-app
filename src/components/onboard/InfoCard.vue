<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="InfoCard"
		type="InfoCard"
		:title="$t('InfoCard_Title')"
		icon-name="info"
		@click-options="onClickOptions"
	>
		<CardSectionTime
			:title="$t('InfoCard_TimeWork_Title')"
			:comment="$t('InfoCard_TimeWork_Comment')"
			v-model="timeWork"
			readonly
		/>
		<CardSectionInput
			temperature
			:title="$t('InfoCard_Temperature_Title')"
			:comment="$t('InfoCard_Temperature_Comment')"
			v-model="temperature"
			readonly
		/>
		<CardSection2Icons title="ACC" :comment="$t('InfoCard_ACC_Comment')" icon1-name="key" :icon1-value="acc" />
		<CardSectionToggle
			:title="$t('InfoCard_Handbrake_Title')"
			:comment="$t('InfoCard_Handbrake_Comment')"
			v-model="handbrake"
		/>
		<CardSectionToggle
			:title="$t('InfoCard_Reverse_Title')"
			:comment="$t('InfoCard_Reverse_Comment')"
			v-model="reverse"
		/>
		<CardSection2Icons
			:title="$t('InfoCard_SafetyBelt_Title')"
			:comment="$t('InfoCard_SafetyBelt_Comment')"
			icon1-name="safety-belt"
			icon2-name="safety-belt"
			icon-color-on="green"
			icon-color-off="red"
			:icon1-value="seatbeltDriver"
			:icon2-value="seatbeltPassenger"
		/>
		<CardSection2Icons
			:title="$t('InfoCard_Signal_Title')"
			:comment="$t('InfoCard_Signal_Comment')"
			icon1-name="arrow-left"
			icon2-name="arrow-right"
			icon-color-on="green"
			:icon1-value="signalLeft"
			:icon2-value="signalRight"
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionTime from '@/components/cardSections_/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections_/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections_/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections_/CardSection2Icons.vue';
import { TSensorsSignal } from '@/models/pjcan';

export default {
	name: 'InfoCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	setup() {
		const store: Ref | undefined = inject('store');
		const { sensorValue, temperatureValue } = store?.value;

		const acc = computed((): boolean => sensorValue.acc);
		const timeWork = computed((): string => '');
		const temperature = computed((): number => temperatureValue.out);
		const handbrake = computed((): boolean => sensorValue.handbrake);
		const reverse = computed((): boolean => sensorValue.reverse);
		const seatbeltDriver = computed((): boolean => sensorValue.seatbeltDriver);
		const seatbeltPassenger = computed((): boolean => sensorValue.seatbeltPassenger);
		const signalLeft = computed(
			(): boolean =>
				sensorValue.signal === TSensorsSignal.SIGNAL_LEFT ||
				sensorValue.signal === TSensorsSignal.SIGNAL_EMERGENCY
		);
		const signalRight = computed(
			(): boolean =>
				sensorValue.signal === TSensorsSignal.SIGNAL_RIGHT ||
				sensorValue.signal === TSensorsSignal.SIGNAL_EMERGENCY
		);

		const onClickOptions = (e: any): void => {
			console.log('InfoCard -> onClickOptions', e);
		};

		return {
			acc,
			timeWork,
			temperature,
			handbrake,
			reverse,
			seatbeltDriver,
			seatbeltPassenger,
			signalLeft,
			signalRight,
			onClickOptions
		};
	}
};
</script>
