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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import { ISensorsValue, ITemperatureValue, SensorsValue, TemperatureValue, TSensorsSignal } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_SENSORS, API_EVENT_VARIABLE_TEMPERATURE } from '@/store/api';

export default {
	name: 'InfoCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	setup() {
		const sensorValue = ref(new SensorsValue());
		const temperatureValue = ref(new TemperatureValue());
		const onReceiveSensor = (res: ISensorsValue): void => {
			sensorValue.value.setModel(res);
		};
		const onReceiveTemperature = (res: ITemperatureValue): void => {
			temperatureValue.value.setModel(res);
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensor);
			api.addListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperature);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensor);
			api.removeListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperature);
		});

		const acc = computed((): boolean => sensorValue.value.acc);
		const timeWork = computed((): string => '');
		const temperature = computed((): number => temperatureValue.value.out);
		const handbrake = computed((): boolean => sensorValue.value.handbrake);
		const reverse = computed((): boolean => sensorValue.value.reverse);
		const seatbeltDriver = computed((): boolean => sensorValue.value.seatbeltDriver);
		const seatbeltPassenger = computed((): boolean => sensorValue.value.seatbeltPassenger);
		const signalLeft = computed(
			(): boolean =>
				sensorValue.value.signal === TSensorsSignal.SIGNAL_LEFT ||
				sensorValue.value.signal === TSensorsSignal.SIGNAL_EMERGENCY
		);
		const signalRight = computed(
			(): boolean =>
				sensorValue.value.signal === TSensorsSignal.SIGNAL_RIGHT ||
				sensorValue.value.signal === TSensorsSignal.SIGNAL_EMERGENCY
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
