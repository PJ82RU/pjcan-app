<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('InfoCard_Title')" icon-name="info" @click-options="onClickOptions">
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
import { computed } from 'vue';
import store from '@/store';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import { TSensorsSignal } from '@/models/pjcan';

export default {
	name: 'InfoCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	setup() {
		const acc = computed((): boolean => store.sensorValue.acc);
		const timeWork = computed((): string => '');
		const temperature = computed((): number => store.temperatureValue.out);
		const handbrake = computed((): boolean => store.sensorValue.handbrake);
		const reverse = computed((): boolean => store.sensorValue.reverse);
		const seatbeltDriver = computed((): boolean => store.sensorValue.seatbeltDriver);
		const seatbeltPassenger = computed((): boolean => store.sensorValue.seatbeltPassenger);
		const signalLeft = computed(
			(): boolean =>
				store.sensorValue.signal === TSensorsSignal.SIGNAL_LEFT ||
				store.sensorValue.signal === TSensorsSignal.SIGNAL_EMERGENCY
		);
		const signalRight = computed(
			(): boolean =>
				store.sensorValue.signal === TSensorsSignal.SIGNAL_RIGHT ||
				store.sensorValue.signal === TSensorsSignal.SIGNAL_EMERGENCY
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
