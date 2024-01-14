<template>
	<card class="info-card" :title="$t('onboard.info.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[acc]"
						:title="$t('onboard.info.acc.title')"
						:description="$t('onboard.info.acc.description')"
						:icon-name="['key']"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="worktime"
						:title="$t('onboard.info.worktime.title')"
						:description="$t('onboard.info.worktime.description')"
						type="time"
						:nodata="!isLoadedDeviceValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
						type="temperature"
						:nodata="!isLoadedTemperatureValue"
						:disabled="!isLoadedTemperatureView"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[seatbeltPassenger, seatbeltDriver]"
						:title="$t('onboard.info.safetyBelt.title')"
						:description="$t('onboard.info.safetyBelt.description')"
						:icon-name="['passenger', 'passenger']"
						:colorsTrue="acc ? { primary: 'success' } : undefined"
						:colorsFalse="acc ? { primary: 'error' } : undefined"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[signalRight, signalLeft]"
						:title="$t('onboard.info.signal.title')"
						:description="$t('onboard.info.signal.description')"
						:icon-name="['arrow-right', 'arrow-left']"
						:colorsTrue="{ primary: 'success' }"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:enabled="menuSelected.view?.enabled"
		:type="menuSelected.view?.type"
		:time="menuSelected.view?.time"
		:disabled="menuSelected.disabled"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_SENSORS_VALUE_EVENT,
	API_SENSORS_VIEW_EVENT,
	API_SENSORS_VIEW_EXEC,
	ISensorsValue,
	ISensorsViews
} from "@/models/pjcan/sensors";
import {
	API_TEMPERATURE_VALUE_EVENT,
	API_TEMPERATURE_VIEW_EVENT,
	API_TEMPERATURE_VIEW_EXEC,
	ITemperatureValue
} from "@/models/pjcan/temperature";
import { API_DEVICE_VALUE_EVENT, IDeviceValue } from "@/models/pjcan/device";
import { IViewConfig } from "@/models/pjcan/view";
import { TCarModel } from "@/models/pjcan/mazda";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { ChoiceValue } from "@/models/pjcan/choice";

export default {
	name: "InfoCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const isLoadedDeviceValue = ref(false);
		const isLoadedSensorValue = ref(false);
		const isLoadedTemperatureValue = ref(false);

		const isLoadedSensorView = ref(false);
		const isLoadedTemperatureView = ref(false);

		const acc = ref(false);
		const worktime = ref(0);
		const temperature = ref(0);
		const handbrake = ref(false);
		const reverse = ref(false);
		const seatbeltDriver = ref(false);
		const seatbeltPassenger = ref(false);
		const signalLeft = ref(false);
		const signalRight = ref(false);
		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		let sensorsViews: ISensorsViews;
		let temperatureView: IViewConfig;

		const menu = computed((): IMenuItem[] =>
			carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BK
				? [
					{
						title: t("onboard.info.temperature.menu"),
						view: temperatureView,
						disabled: !isLoadedTemperatureView.value
					},
					{
						title: t("onboard.info.handbrake.menu"),
						view: sensorsViews?.handbrake,
						disabled: !isLoadedSensorView.value
					},
					{
						title: t("onboard.info.reverse.menu"),
						view: sensorsViews?.reverse,
						disabled: !isLoadedSensorView.value
					},
					{
						title: t("onboard.info.safetyBelt.menu"),
						view: sensorsViews?.seatbelt,
						disabled: !isLoadedSensorView.value
					},
					{
						title: t("onboard.info.signal.menu"),
						view: sensorsViews?.turnSignal,
						disabled: !isLoadedSensorView.value
					}
				]
				: []
		);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
		};
		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/**
		 * Входящие значения устройства
		 * @param {IDeviceValue} res
		 */
		const onReceiveDeviceValue = (res: IDeviceValue): void =>
		{
			isLoadedDeviceValue.value = res.isData;
			if (res.isData) worktime.value = res.worktime;
		};
		/**
		 * Входящие значения датчиков
		 * @param {ISensorsValue} res
		 */
		const onReceiveSensorValue = (res: ISensorsValue): void =>
		{
			isLoadedSensorValue.value = res.isData;
			if (res.isData)
			{
				acc.value = true;
				handbrake.value = res.handbrake;
				reverse.value = res.reverse;
				seatbeltDriver.value = res.seatbeltDriver;
				seatbeltPassenger.value = res.seatbeltPassenger;
				signalLeft.value = res.turnSignalLeft;
				signalRight.value = res.turnSignalRight;
			}
		};
		/**
		 * Входящие значения температуры
		 * @param {ITemperatureValue} res
		 */
		const onReceiveTemperatureValue = (res: ITemperatureValue): void =>
		{
			isLoadedTemperatureValue.value = res.isData;
			if (res.isData)
			{
				temperature.value = res.out / 10;
			}
		};

		/**
		 * Входящие значения отображения датчиков
		 * @param {ISensorsViews} res
		 */
		const onReceiveSensorView = (res: ISensorsViews): void =>
		{
			isLoadedSensorView.value = res.isData;
			sensorsViews = res;
		};
		/**
		 * Входящие значения отображения температуры
		 * @param {ITemperatureView} res
		 */
		const onReceiveTemperatureView = (res: IViewConfig): void =>
		{
			isLoadedTemperatureView.value = res.isData;
			temperatureView = res;
		};

		const choiceId = Math.round(Math.random() * 1000000);
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.id = choiceId;
				choice.listID = [API_SENSORS_VIEW_EXEC, API_TEMPERATURE_VIEW_EXEC];
				canbus.query(choice, true);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_DEVICE_VALUE_EVENT, onReceiveDeviceValue);
			canbus.addListener(API_SENSORS_VALUE_EVENT, onReceiveSensorValue);
			canbus.addListener(API_TEMPERATURE_VALUE_EVENT, onReceiveTemperatureValue);
			canbus.addListener(API_SENSORS_VIEW_EVENT, onReceiveSensorView);
			canbus.addListener(API_TEMPERATURE_VIEW_EVENT, onReceiveTemperatureView);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_DEVICE_VALUE_EVENT, onReceiveDeviceValue);
			canbus.removeListener(API_SENSORS_VALUE_EVENT, onReceiveSensorValue);
			canbus.removeListener(API_TEMPERATURE_VALUE_EVENT, onReceiveTemperatureValue);
			canbus.removeListener(API_SENSORS_VIEW_EVENT, onReceiveSensorView);
			canbus.removeListener(API_TEMPERATURE_VIEW_EVENT, onReceiveTemperatureView);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			isLoadedDeviceValue,
			isLoadedSensorValue,
			isLoadedSensorView,
			isLoadedTemperatureValue,
			isLoadedTemperatureView,
			acc,
			worktime,
			temperature,
			handbrake,
			reverse,
			seatbeltDriver,
			seatbeltPassenger,
			signalLeft,
			signalRight,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
