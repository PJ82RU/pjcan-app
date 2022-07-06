<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="InfoCard"
		type="InfoCard"
		:title="$t('InfoCard_Title')"
		icon-name="info"
		:menu-card-section="menuInfoCard"
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
	<ViewSettingModal v-model="viewSettingModel" :title="viewSettingTitle" :view-config="viewConfig" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuInfoCard } from '@/store/menu/MenuInfoCard';
import {
	ISensorsValue,
	ISensorsView,
	ITemperatureValue,
	ITemperatureView,
	IViewConfig,
	SensorsValue,
	SensorsView,
	TemperatureValue,
	TemperatureView,
	TSensorsSignal,
	TViewType
} from '@/models/pjcan';
import api, {
	API_EVENT_VARIABLE_SENSORS,
	API_EVENT_VARIABLE_SENSORS_VIEW,
	API_EVENT_VARIABLE_TEMPERATURE,
	API_EVENT_VARIABLE_TEMPERATURE_VIEW
} from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'InfoCard',
	components: {
		CardSection,
		CardSectionTime,
		CardSectionToggle,
		CardSectionInput,
		CardSection2Icons,
		ViewSettingModal
	},
	setup() {
		const sensorValue = ref(new SensorsValue());
		const sensorView = new SensorsView();
		const temperatureValue = ref(new TemperatureValue());
		const temperatureView = new TemperatureView();
		const onReceiveSensorValue = (res: ISensorsValue): void => {
			sensorValue.value.setModel(res);
		};
		const onReceiveSensorView = (res: ISensorsView): void => {
			sensorView.setModel(res);
		};
		const onReceiveTemperatureValue = (res: ITemperatureValue): void => {
			temperatureValue.value.setModel(res);
		};
		const onReceiveTemperatureView = (res: ITemperatureView): void => {
			temperatureView.setModel(res);
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			api.addListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			api.addListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			api.addListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			api.removeListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			api.removeListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			api.removeListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
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

		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);
		const onClickOptions = (e: any): void => {
			console.log('InfoCard -> onClickOptions', e);

			switch (e.type) {
				case TItemMenu.VIEW_TIME_WORK:
					viewConfig.value = { enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig;
					break;

				case TItemMenu.VIEW_TEMPERATURE:
					viewConfig.value = temperatureView.temperature;
					break;

				case TItemMenu.VIEW_HANDBRAKE:
					viewConfig.value = sensorView.handbrake;
					break;

				case TItemMenu.VIEW_REVERSE:
					viewConfig.value = sensorView.reverse;
					break;

				case TItemMenu.VIEW_SAFETY_BELT:
					viewConfig.value = sensorView.seatbelt;
					break;

				case TItemMenu.VIEW_SIGNAL:
					viewConfig.value = sensorView.signal;
					break;
			}

			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		return {
			menuInfoCard,
			acc,
			timeWork,
			temperature,
			handbrake,
			reverse,
			seatbeltDriver,
			seatbeltPassenger,
			signalLeft,
			signalRight,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions
		};
	}
};
</script>
