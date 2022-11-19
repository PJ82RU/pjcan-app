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
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
						type="temperature"
						:nodata="!isLoadedTemperatureValue"
						:disabled="!isLoadedTemperatureView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
						:nodata="!isLoadedSensorValue"
						:disabled="!isLoadedSensorView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
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
				<v-col cols="12" class="pt-0 pb-0">
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
		:title="menuTitle"
		:enabled="menuItem.enabled"
		:type="menuItem.type"
		:time="menuItem.time"
		:disabled="!isLoadedSensorView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { $t } from "@/lang";

import canbus, {
	API_EVENT_DEVICE,
	API_EVENT_VARIABLE_SENSORS,
	API_EVENT_VARIABLE_SENSORS_VIEW,
	API_EVENT_VARIABLE_TEMPERATURE,
	API_EVENT_VARIABLE_TEMPERATURE_VIEW
} from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { ISensorsValue, ISensorsView, TSensorsSignal } from "@/models/pjcan/variables/sensors";
import { ITemperatureValue, ITemperatureView } from "@/models/pjcan/variables/temperature";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IDeviceValue } from "@/models/pjcan/device";

export default {
	name: "InfoCard",
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog },
	setup()
	{
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
				temperature.value = res.out;
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
			canbus.addListener(API_EVENT_DEVICE, onReceiveDeviceValue);
			canbus.addListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			canbus.addListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			canbus.addListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			canbus.addListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
			onReceiveDeviceValue(canbus.values.device);
			onReceiveSensorValue(canbus.values.variable.sensors);
			onReceiveSensorView(canbus.views.variable.sensors);
			onReceiveTemperatureValue(canbus.values.variable.temperature);
			onReceiveTemperatureView(canbus.views.variable.temperature);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_DEVICE, onReceiveDeviceValue);
			canbus.removeListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			canbus.removeListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			canbus.removeListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			canbus.removeListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			$t("onboard.info.temperature.menu"),
			$t("onboard.info.handbrake.menu"),
			$t("onboard.info.reverse.menu"),
			$t("onboard.info.safetyBelt.menu"),
			$t("onboard.info.signal.menu")
		]);
		const menuVisible = ref(false);
		const menuTitle = ref("");
		const menuItem = ref({} as IViewConfig);
		const isLoaded = ref(false);

		let menuSelected = {} as IMenuItem;

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} data Выбранный пункт меню
		 */
		const onMenuClick = (data: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuTitle.value = data.item;
			menuSelected = data;

			const { temperature, sensors } = canbus.views.variable;
			switch (data.index)
			{
				case 0:
					menuItem.value = temperature.view;
					isLoaded.value = isLoadedTemperatureView.value;
					return;

				case 1:
					menuItem.value = sensors.handbrake;
					break;

				case 2:
					menuItem.value = sensors.reverse;
					break;

				case 3:
					menuItem.value = sensors.seatbelt;
					break;

				case 4:
					menuItem.value = sensors.signal;
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
			switch (menuSelected.index)
			{
				case 0:
					temperature.view = data;
					canbus.queryViewsTemperature();
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
			canbus.queryViewsSensors();
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
			menuTitle,
			menuItem,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
