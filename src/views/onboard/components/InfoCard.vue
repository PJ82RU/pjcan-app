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
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="timeWork"
						:title="$t('onboard.info.timeWork.title')"
						:description="$t('onboard.info.timeWork.description')"
						type="time"
						:nodata="!acc"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
						type="temperature"
						:nodata="!acc"
						:disabled="!loadedTemperature"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
						:nodata="!acc"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
						:nodata="!acc"
						:disabled="!isLoadedView"
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
						:nodata="!acc"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[signalRight, signalLeft]"
						:title="$t('onboard.info.signal.title')"
						:description="$t('onboard.info.signal.description')"
						:icon-name="['arrow-right', 'arrow-left']"
						:colorsTrue="{ primary: 'success' }"
						:nodata="!acc"
						:disabled="!isLoadedView"
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
		:disabled="!isLoaded"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import i18n from "@/lang";

import canbus, {
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

import {
	ISensorsValue,
	ISensorsView,
	SensorsValue,
	SensorsView,
	TSensorsSignal
} from "@/models/pjcan/variables/sensors";
import {
	ITemperatureValue,
	ITemperatureView,
	TemperatureValue,
	TemperatureView
} from "@/models/pjcan/variables/temperature";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";

export default {
	name: "InfoCard",
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog },
	setup()
	{
		// ДАТЧИКИ

		const isLoadedView = ref(false);

		const sensorValue = ref(new SensorsValue());
		const sensorView = new SensorsView();

		// входящие значения датчиков
		const onReceiveSensorValue = (res: ISensorsValue): void =>
		{
			sensorValue.value.setModel(res);
		};
		// входящие значения отображения датчиков
		const onReceiveSensorView = (res: ISensorsView): void =>
		{
			isLoadedView.value = true;
			sensorView.setModel(res);
		};

		// ТЕМПЕРАТУРА

		const loadedTemperature = ref(false);
		const temperatureValue = ref(new TemperatureValue());
		const temperatureView = new TemperatureView();

		// входящие значения температуры
		const onReceiveTemperatureValue = (res: ITemperatureValue): void =>
		{
			temperatureValue.value.setModel(res);
		};
		// входящие значения отображения температуры
		const onReceiveTemperatureView = (res: ITemperatureView): void =>
		{
			loadedTemperature.value = true;
			temperatureView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			canbus.addListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			canbus.addListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			canbus.addListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_SENSORS, onReceiveSensorValue);
			canbus.removeListener(API_EVENT_VARIABLE_SENSORS_VIEW, onReceiveSensorView);
			canbus.removeListener(API_EVENT_VARIABLE_TEMPERATURE, onReceiveTemperatureValue);
			canbus.removeListener(API_EVENT_VARIABLE_TEMPERATURE_VIEW, onReceiveTemperatureView);
		});

		const acc = computed((): boolean => sensorValue.value.acc);
		const timeWork = computed((): number => 0);
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

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			i18n.global.t("onboard.info.timeWork.menu"),
			i18n.global.t("onboard.info.temperature.menu"),
			i18n.global.t("onboard.info.handbrake.menu"),
			i18n.global.t("onboard.info.reverse.menu"),
			i18n.global.t("onboard.info.safetyBelt.menu"),
			i18n.global.t("onboard.info.signal.menu")
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
			switch (data.index)
			{
				case 0:
					menuItem.value = { enabled: false, type: 0, time: 3 };
					isLoaded.value = false;
					return;

				case 1:
					menuItem.value = temperatureView.temperature;
					isLoaded.value = loadedTemperature.value;
					return;

				case 2:
					menuItem.value = sensorView.handbrake;
					break;

				case 3:
					menuItem.value = sensorView.reverse;
					break;

				case 4:
					menuItem.value = sensorView.seatbelt;
					break;

				case 5:
					menuItem.value = sensorView.signal;
					break;
			}
			isLoaded.value = isLoadedView.value;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			switch (menuSelected.index)
			{
				case 1:
					temperatureView.temperature = data;
					canbus.send(temperatureView);
					return;

				case 2:
					sensorView.handbrake = data;
					break;

				case 3:
					sensorView.reverse = data;
					break;

				case 4:
					sensorView.seatbelt = data;
					break;

				case 5:
					sensorView.signal = data;
					break;
			}
			canbus.send(sensorView);
		};

		return {
			isLoadedView,
			loadedTemperature,
			isLoaded,
			acc,
			timeWork,
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
