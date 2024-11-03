<template>
	<card
		class="info-card"
		:title="$t('onboard.info.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[acc]"
						:title="$t('onboard.info.acc.title')"
						:description="$t('onboard.info.acc.description')"
						:icon-name="['key']"
						:nodata="!sensorValueLoaded"
						:disabled="!sensorViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="worktime"
						:title="$t('onboard.info.worktime.title')"
						:description="$t('onboard.info.worktime.description')"
						type="time"
						:nodata="!deviceValueLoaded"
						:disabled="!worktimeViewLoaded"
					/>
				</v-col>
				<v-col v-if="isVoltmeter && !disableVoltmeter" cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="voltmeter"
						:title="$t('onboard.info.voltmeter.title')"
						:description="$t('onboard.info.voltmeter.description')"
						type="volts"
						:nodata="!deviceValueLoaded"
						:disabled="!voltmeterViewLoaded"
					/>
				</v-col>
				<template
					v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK || carModel === TCarModel.CAR_MODEL_MAZDA_3_BL"
				>
					<v-col cols="12" class="pt-0 pb-0">
						<input-card-item
							:value="temperatureOut"
							:title="$t('onboard.info.temperatureOut.title')"
							:description="$t('onboard.info.temperatureOut.description')"
							type="temperature"
							:nodata="!temperatureValueLoaded || temperatureOut === 0"
							:disabled="!temperatureViewLoaded"
						/>
					</v-col>
					<v-col cols="12" class="pt-0 pb-0">
						<switch-card-item
							:model-value="handbrake"
							:title="$t('onboard.info.handbrake.title')"
							:description="$t('onboard.info.handbrake.description')"
							color="error"
							:nodata="!sensorValueLoaded"
							:disabled="!sensorViewLoaded"
						/>
					</v-col>
				</template>
				<v-col v-if="isReverse" cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
						:nodata="!sensorValueLoaded"
						:disabled="!sensorViewLoaded"
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
						:nodata="!sensorValueLoaded"
						:disabled="!sensorViewLoaded"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[signalRight, signalLeft]"
						:title="$t('onboard.info.signal.title')"
						:description="$t('onboard.info.signal.description')"
						:icon-name="['arrow-right', 'arrow-left']"
						:colorsTrue="{ primary: 'success' }"
						:nodata="!sensorValueLoaded"
						:disabled="!sensorViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onViewApply"
	/>
	<device-config-dialog
		v-model="deviceConfigVisible"
		:disable-led-work="deviceConfig.disableLedWork"
		:disable-reverse="deviceConfig.disableReverse"
		:disable-r-position="deviceConfig.disableRPosition"
		:disable-amp-illum="deviceConfig.disableAmpIllum"
		:disable-voltmeter="deviceConfig.disableVoltmeter"
		:calibration-of-voltmeter="deviceConfig.calibrationOfVoltmeter"
		:visible-r-position="isRPosition"
		:visible-voltmeter="isVoltmeter"
		@click:apply="onDeviceConfigApply"
	/>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";
import DeviceConfigDialog from "./DeviceConfigDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { TCarModel } from "@/models/pjcan/onboard";
import { IDeviceHardware } from "@/models/pjcan/device/IDeviceValue";
import { IDeviceConfig } from "@/models/pjcan/device";

export default {
	name: "InfoCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ViewSettingDialog, DeviceConfigDialog },
	setup()
	{
		const { t } = useI18n();

		const deviceValueLoaded = computed((): boolean => store.getters["value/device"].isData);
		const sensorValueLoaded = computed((): boolean => store.getters["value/sensors"].isData);
		const temperatureValueLoaded = computed((): boolean => store.getters["value/temperature"].isData);
		const worktimeViewLoaded = computed((): boolean => store.getters["view/worktime"].isData);
		const voltmeterViewLoaded = computed((): boolean => store.getters["view/voltmeter"].isData);
		const sensorViewLoaded = computed((): boolean => store.getters["view/sensors"].isData);
		const temperatureViewLoaded = computed((): boolean => store.getters["view/temperature"].isData);

		const isVoltmeter = computed((): boolean =>
		{
			const hardware: IDeviceHardware = store.getters["value/device"].hardware;
			return hardware.major === 4 && hardware.minor >= 1 && hardware.build <= 1;
		});
		const disableVoltmeter = computed((): boolean => store.getters["config/device"].disableVoltmeter);
		const isReverse = computed((): boolean =>
		{
			const carModel = store.getters["config/carModel"];
			return (
				carModel === TCarModel.CAR_MODEL_MAZDA_3_BK ||
				carModel === TCarModel.CAR_MODEL_MAZDA_3_BL ||
				carModel === TCarModel.CAR_MODEL_MAZDA_CX7 ||
				carModel === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
				carModel === TCarModel.CAR_MODEL_MAZDA_CX9 ||
				carModel === TCarModel.CAR_MODEL_MAZDA_CX9_REST
			);
		});
		const isRPosition = computed((): boolean =>
		{
			const hardware: IDeviceHardware = store.getters["value/device"].hardware;
			return hardware.major === 4 && hardware.minor >= 1 && hardware.build >= 1;
		});

		const acc = computed((): boolean => store.getters["value/sensors"].acc);
		const worktime = computed((): number => store.getters["value/device"].worktime);
		const voltmeter = computed((): number => store.getters["value/device"].voltmeter / 100);
		const temperatureOut = computed((): number => store.getters["value/temperature"].out / 10);
		const handbrake = computed((): boolean => store.getters["value/sensors"].handbrake);
		const reverse = computed((): boolean => store.getters["value/sensors"].reverse);
		const seatbeltDriver = computed((): boolean => store.getters["value/sensors"].seatbeltDriver);
		const seatbeltPassenger = computed((): boolean => store.getters["value/sensors"].seatbeltPassenger);
		const signalLeft = computed((): boolean => store.getters["value/sensors"].turnSignalLeft);
		const signalRight = computed((): boolean => store.getters["value/sensors"].turnSignalRight);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const deviceConfigVisible = ref(false);
		const deviceConfig = computed((): IDeviceConfig => store.getters["config/device"]);

		const menu = computed((): IMenuItem[] =>
		{
			const result = [
				{ title: t("onboard.info.device.menu") },
				{
					title: t("onboard.info.worktime.menu"),
					view: store.getters["view/worktime"],
					disabled: !worktimeViewLoaded.value
				}
			];

			if (isVoltmeter.value)
			{
				result.push({
					title: t("onboard.info.voltmeter.menu"),
					view: store.getters["view/voltmeter"],
					disabled: !voltmeterViewLoaded.value
				});
			}

			if (
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BK ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BL
			)
			{
				result.push({
					title: t("onboard.info.temperatureOut.menu"),
					view: store.getters["view/temperature"],
					disabled: !temperatureViewLoaded.value
				});
				result.push({
					title: t("onboard.info.handbrake.menu"),
					view: store.getters["view/sensors"].handbrake,
					disabled: !sensorViewLoaded.value
				});
			}

			if (isReverse.value)
			{
				result.push({
					title: t("onboard.info.reverse.menu"),
					view: store.getters["view/sensors"].reverse,
					disabled: !sensorViewLoaded.value
				});
			}

			if (carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BK)
			{
				result.push({
					title: t("onboard.info.safetyBelt.menu"),
					view: store.getters["view/sensors"].seatbelt,
					disabled: !sensorViewLoaded.value
				});
				result.push({
					title: t("onboard.info.signal.menu"),
					view: store.getters["view/sensors"].turnSignal,
					disabled: !sensorViewLoaded.value
				});
			}
			return result;
		});
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			if (item.view)
			{
				menuVisible.value = true;
				menuSelected.value = item;
			}
			else deviceConfigVisible.value = true;
		};

		const onDeviceConfigApply = (
			disableLedWork: boolean,
			disableReverse: boolean,
			disableRPosition: boolean,
			disableAmpIllum: boolean,
			disableVoltmeter: boolean,
			calibrationOfVoltmeter: number
		): void =>
		{
			store.commit("config/setDeviceConfig", {
				disableLedWork,
				disableReverse,
				disableRPosition,
				disableAmpIllum,
				disableVoltmeter,
				calibrationOfVoltmeter
			});
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {any} value Новые параметры отображения
		 */
		const onViewApply = (value: any): void =>
		{
			store.commit("view/setView", value);
		};

		return {
			deviceValueLoaded,
			sensorValueLoaded,
			temperatureValueLoaded,
			worktimeViewLoaded,
			voltmeterViewLoaded,
			sensorViewLoaded,
			temperatureViewLoaded,
			deviceConfigVisible,
			deviceConfig,
			isVoltmeter,
			disableVoltmeter,
			isReverse,
			isRPosition,
			acc,
			worktime,
			voltmeter,
			temperatureOut,
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
			onDeviceConfigApply,
			onViewApply
		};
	}
};
</script>
