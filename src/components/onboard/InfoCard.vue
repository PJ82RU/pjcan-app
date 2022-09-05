<!--suppress RequiredAttributes -->
<template>
	<card-section
		class="info-card"
		type="InfoCard"
		:title="$t('InfoCard_Title')"
		icon-name="info"
		:menu-card-section="menuInfoCard"
		@click:options="onClickOptions"
		show-options
		show-bookmark
	>
		<card-section-time
			:title="$t('InfoCard_TimeWork_Title')"
			:comment="$t('InfoCard_TimeWork_Comment')"
			v-model="timeWork"
			readonly
		/>
		<card-section-input
			temperature
			:title="$t('InfoCard_Temperature_Title')"
			:comment="$t('InfoCard_Temperature_Comment')"
			v-model="temperature"
			readonly
		/>
		<card-section2-icons title="ACC" :comment="$t('InfoCard_ACC_Comment')" icon1-name="key" :icon1-value="acc" />
		<card-section-toggle
			:title="$t('InfoCard_Handbrake_Title')"
			:comment="$t('InfoCard_Handbrake_Comment')"
			v-model="handbrake"
		/>
		<card-section-toggle
			:title="$t('InfoCard_Reverse_Title')"
			:comment="$t('InfoCard_Reverse_Comment')"
			v-model="reverse"
		/>
		<card-section2-icons
			:title="$t('InfoCard_SafetyBelt_Title')"
			:comment="$t('InfoCard_SafetyBelt_Comment')"
			icon1-name="safety-belt"
			icon2-name="safety-belt"
			icon-color-on="green"
			icon-color-off="red"
			:icon1-value="seatbeltDriver"
			:icon2-value="seatbeltPassenger"
		/>
		<card-section2-icons
			:title="$t('InfoCard_Signal_Title')"
			:comment="$t('InfoCard_Signal_Comment')"
			icon1-name="arrow-left"
			icon2-name="arrow-right"
			icon-color-on="green"
			:icon1-value="signalLeft"
			:icon2-value="signalRight"
		/>
	</card-section>
	<view-setting-modal
		v-model="viewSettingModel"
		:title="viewSettingTitle"
		:view-config="viewConfig"
		@apply="onApplyViewConfig"
	/>
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
		// датчики
		const sensorValue = ref(new SensorsValue());
		const sensorView = new SensorsView();
		// температура
		const temperatureValue = ref(new TemperatureValue());
		const temperatureView = new TemperatureView();
		// входящие значения датчиков
		const onReceiveSensorValue = (res: ISensorsValue): void => {
			sensorValue.value.setModel(res);
		};
		// входящие значения отображения датчиков
		const onReceiveSensorView = (res: ISensorsView): void => {
			sensorView.setModel(res);
		};
		// входящие значения температуры
		const onReceiveTemperatureValue = (res: ITemperatureValue): void => {
			temperatureValue.value.setModel(res);
		};
		// входящие значения отображения температуры
		const onReceiveTemperatureView = (res: ITemperatureView): void => {
			temperatureView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			api.addListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			api.addListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			api.addListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
		});
		// удаляем события
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

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);
		let selectItemMenu: TItemMenu;

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('InfoCard -> onClickOptions', e);

			selectItemMenu = e.type;
			switch (selectItemMenu) {
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

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			switch (selectItemMenu) {
				case TItemMenu.VIEW_TIME_WORK:
					break;

				case TItemMenu.VIEW_TEMPERATURE:
					temperatureView.temperature = res;
					api.send(temperatureView);
					return;

				case TItemMenu.VIEW_HANDBRAKE:
					sensorView.handbrake = res;
					break;

				case TItemMenu.VIEW_REVERSE:
					sensorView.reverse = res;
					break;

				case TItemMenu.VIEW_SAFETY_BELT:
					sensorView.seatbelt = res;
					break;

				case TItemMenu.VIEW_SIGNAL:
					sensorView.signal = res;
					break;
			}
			api.send(sensorView);
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
			menuInfoCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
