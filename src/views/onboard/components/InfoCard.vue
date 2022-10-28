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
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="timeWork"
						:title="$t('onboard.info.timeWork.title')"
						:description="$t('onboard.info.timeWork.description')"
						:nodata="!acc"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
						:nodata="!acc"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
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
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[signalRight, signalLeft]"
						:title="$t('onboard.info.signal.title')"
						:description="$t('onboard.info.signal.description')"
						:icon-name="['arrow-right', 'arrow-left']"
						:colorsTrue="{ primary: 'success' }"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog v-model="menuVisible" :title="menuTitle" @click:apply="onViewSettingApply" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import i18n from "@/lang";

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

import canbus, {
	API_EVENT_VARIABLE_SENSORS,
	API_EVENT_VARIABLE_SENSORS_VIEW,
	API_EVENT_VARIABLE_TEMPERATURE, API_EVENT_VARIABLE_TEMPERATURE_VIEW
} from "@/api/canbus";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewSetting } from "@/models/interfaces/IViewSetting";

export default {
	name: "InfoCard",
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog },
	setup()
	{
		// датчики
		const sensorValue = ref(new SensorsValue());
		const sensorView = new SensorsView();
		// температура
		const temperatureValue = ref(new TemperatureValue());
		const temperatureView = new TemperatureView();
		// входящие значения датчиков
		const onReceiveSensorValue = (res: ISensorsValue): void =>
		{
			sensorValue.value.setModel(res);
		};
		// входящие значения отображения датчиков
		const onReceiveSensorView = (res: ISensorsView): void =>
		{
			sensorView.setModel(res);
		};
		// входящие значения температуры
		const onReceiveTemperatureValue = (res: ITemperatureValue): void =>
		{
			temperatureValue.value.setModel(res);
		};
		// входящие значения отображения температуры
		const onReceiveTemperatureView = (res: ITemperatureView): void =>
		{
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
		const timeWork = computed((): string => "--:--:--");
		const temperature = computed((): string => (acc.value ? temperatureValue.value.out.toFixed(1) : "-.-") + "°C");
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

		// меню отображения
		const menu = computed((): string[] => [
			i18n.global.t("onboard.info.acc.menu"),
			i18n.global.t("onboard.info.timeWork.menu"),
			i18n.global.t("onboard.info.temperature.menu"),
			i18n.global.t("onboard.info.handbrake.menu"),
			i18n.global.t("onboard.info.reverse.menu"),
			i18n.global.t("onboard.info.safetyBelt.menu"),
			i18n.global.t("onboard.info.signal.menu")
		]);
		const menuVisible = ref(false);
		const menuTitle = ref("");
		const onMenuClick = (data: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuTitle.value = data.item;
		};
		const onViewSettingApply = (data: IViewSetting): void =>
		{
			console.log(data);
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
			menu,
			menuVisible,
			menuTitle,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>

<style lang="scss" scoped>
.info-card {
}
</style>
