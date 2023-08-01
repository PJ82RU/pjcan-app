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
						type="mtime"
						:nodata="!isLoadedDeviceValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
						type="temperature"
						:nodata="!isLoadedTemperatureValue"
						:disabled="!isLoadedTemperatureView"
					/>
				</v-col>
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
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
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
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
		:enabled="menuViewConfig.enabled"
		:type="menuViewConfig.type"
		:time="menuViewConfig.time"
		:disabled="!isLoadedSensorView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_VARIABLE_SENSORS_EVENT,
	API_VARIABLE_SENSORS_VIEW_EVENT,
	API_VARIABLE_SENSORS_VIEW_EXEC,
	ISensorsValue,
	ISensorsView,
	TSensorsSignal
} from "@/models/pjcan/variables/sensors";
import {
	API_VARIABLE_TEMPERATURE_EVENT,
	API_VARIABLE_TEMPERATURE_VIEW_EVENT,
	API_VARIABLE_TEMPERATURE_VIEW_EXEC,
	ITemperatureValue,
	ITemperatureView
} from "@/models/pjcan/variables/temperature";
import { IViewConfig } from "@/models/pjcan/view";
import { API_DEVICE_EVENT, IDeviceValue } from "@/models/pjcan/device";

import canbus from "@/api/canbus";
import { ECarModel } from "@/models/pjcan/car";

export default {
	name: "InfoCard",
	computed: {
		ECarModel()
		{
			return ECarModel;
		}
	},
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog },
	props: {
		carModel: {
			type: Number,
			default: 0
		}
	},
	setup(props: any)
	{
		const { carModel } = toRefs(props);
		const { t } = useI18n();

		const isLoadedDeviceValue = ref(false);
		const isLoadedSensorValue = ref(false);
		const isLoadedSensorView = ref(false);
		const isLoadedTemperatureValue = ref(false);
		const isLoadedTemperatureView = ref(false);

		const acc = ref(false);
		const worktime = ref(BigInt(0));
		const temperature = ref(0);
		const handbrake = ref(false);
		const reverse = ref(false);
		const seatbeltDriver = ref(false);
		const seatbeltPassenger = ref(false);
		const signalLeft = ref(false);
		const signalRight = ref(false);

		/**
		 * Входящие значения устройства
		 * @param {IDeviceValue} res
		 */
		const onReceiveDeviceValue = (res: IDeviceValue): void =>
		{
			isLoadedDeviceValue.value = res.isData;
			if (res.isData)
			{
				// @ts-ignore
				worktime.value = res.worktime;
			}
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
				acc.value = res.acc;
				handbrake.value = res.handbrake;
				reverse.value = res.reverse;
				seatbeltDriver.value = res.seatbeltDriver;
				seatbeltPassenger.value = res.seatbeltPassenger;
				signalLeft.value =
					res.signal === TSensorsSignal.SIGNAL_LEFT || res.signal === TSensorsSignal.SIGNAL_EMERGENCY;
				signalRight.value =
					res.signal === TSensorsSignal.SIGNAL_RIGHT || res.signal === TSensorsSignal.SIGNAL_EMERGENCY;
			}
		};
		/**
		 * Входящие значения отображения датчиков
		 * @param {ISensorsView} res
		 */
		const onReceiveSensorView = (res: ISensorsView): void =>
		{
			isLoadedSensorView.value = res.isData;
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
		 * Входящие значения отображения температуры
		 * @param {ITemperatureView} res
		 */
		const onReceiveTemperatureView = (res: ITemperatureView): void =>
		{
			isLoadedTemperatureView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_DEVICE_EVENT, onReceiveDeviceValue);
			canbus.addListener(API_VARIABLE_SENSORS_EVENT, onReceiveSensorValue);
			canbus.addListener(API_VARIABLE_SENSORS_VIEW_EVENT, onReceiveSensorView);
			canbus.addListener(API_VARIABLE_TEMPERATURE_EVENT, onReceiveTemperatureValue);
			canbus.addListener(API_VARIABLE_TEMPERATURE_VIEW_EVENT, onReceiveTemperatureView);
			onReceiveDeviceValue(canbus.values.device);
			onReceiveSensorValue(canbus.values.variable.sensors);
			onReceiveSensorView(canbus.views.variable.sensors);
			onReceiveTemperatureValue(canbus.values.variable.temperature);
			onReceiveTemperatureView(canbus.views.variable.temperature);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_DEVICE_EVENT, onReceiveDeviceValue);
			canbus.removeListener(API_VARIABLE_SENSORS_EVENT, onReceiveSensorValue);
			canbus.removeListener(API_VARIABLE_SENSORS_VIEW_EVENT, onReceiveSensorView);
			canbus.removeListener(API_VARIABLE_TEMPERATURE_EVENT, onReceiveTemperatureValue);
			canbus.removeListener(API_VARIABLE_TEMPERATURE_VIEW_EVENT, onReceiveTemperatureView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => carModel.value === ECarModel.CAR_MODEL_MAZDA3 ? [
			{ id: 0, title: t("onboard.info.temperature.menu") },
			{ id: 1, title: t("onboard.info.handbrake.menu") },
			{ id: 2, title: t("onboard.info.reverse.menu") },
			{ id: 3, title: t("onboard.info.safetyBelt.menu") },
			{ id: 4, title: t("onboard.info.signal.menu") }
		] : []);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);
		const isLoaded = ref(false);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;

			const { temperature, sensors } = canbus.views.variable;
			switch (item.id)
			{
				case 0:
					menuViewConfig.value = temperature.view;
					isLoaded.value = isLoadedTemperatureView.value;
					return;

				case 1:
					menuViewConfig.value = sensors.handbrake;
					break;

				case 2:
					menuViewConfig.value = sensors.reverse;
					break;

				case 3:
					menuViewConfig.value = sensors.seatbelt;
					break;

				case 4:
					menuViewConfig.value = sensors.signal;
					break;
			}
			isLoaded.value = isLoadedSensorView.value;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { temperature, sensors } = canbus.views.variable;
			switch (menuSelected.value.id)
			{
				case 0:
					temperature.view = data;
					canbus.queryView(API_VARIABLE_TEMPERATURE_VIEW_EXEC);
					return;

				case 1:
					sensors.handbrake = data;
					break;

				case 2:
					sensors.reverse = data;
					break;

				case 3:
					sensors.seatbelt = data;
					break;

				case 4:
					sensors.signal = data;
					break;
			}
			canbus.queryView(API_VARIABLE_SENSORS_VIEW_EXEC);
		};

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
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
