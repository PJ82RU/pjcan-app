<template>
	<base-layout />
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import moment from "moment/moment";
import store from "@/store";
import canbus from "@/api/canbus";

import BaseLayout from "./layout/BaseLayout.vue";

import { API_VERSION_EVENT } from "@/models/pjcan/version";
import {
	API_DEVICE_CONFIG_EVENT,
	API_DEVICE_CONFIG_EXEC,
	API_DEVICE_INFO_EVENT,
	API_DEVICE_SCANNER_VALUE_EVENT,
	API_DEVICE_VALUE_EVENT,
	API_DEVICE_VIEW_VOLTMETER_EVENT,
	API_DEVICE_VIEW_VOLTMETER_EXEC,
	API_DEVICE_VIEW_WORKTIME_EVENT,
	API_DEVICE_VIEW_WORKTIME_EXEC
} from "@/models/pjcan/device";
import {
	API_ONBOARD_CONFIG_EVENT,
	API_ONBOARD_CONFIG_EXEC,
	API_ONBOARD_VIEW_EVENT,
	API_ONBOARD_VIEW_EXEC
} from "@/models/pjcan/onboard";
import {
	API_HEAD_UNIT_CONFIG_EVENT,
	API_HEAD_UNIT_CONFIG_EXEC,
	API_HEAD_UNIT_VIEW_EVENT,
	API_HEAD_UNIT_VIEW_EXEC
} from "@/models/pjcan/head-unit";
import { API_SW1_VALUE_EVENT, API_SW1_CONFIG_EVENT } from "@/models/pjcan/buttons";
import {
	API_BOSE_CONFIG_EVENT,
	API_BOSE_CONFIG_EXEC,
	API_BOSE_VIEW_EVENT,
	API_BOSE_VIEW_EXEC
} from "@/models/pjcan/bose";
import {
	API_ENGINE_CONFIG_EVENT,
	API_ENGINE_CONFIG_EXEC,
	API_ENGINE_VALUE_EVENT,
	API_ENGINE_VIEW_EVENT,
	API_ENGINE_VIEW_EXEC
} from "@/models/pjcan/engine";
import {
	API_FUEL_CONFIG_EVENT,
	API_FUEL_CONFIG_EXEC,
	API_FUEL_VALUE_EVENT,
	API_FUEL_VIEW_EVENT,
	API_FUEL_VIEW_EXEC
} from "@/models/pjcan/fuel";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { API_CLIMATE_VALUE_EVENT, API_CLIMATE_VIEW_EVENT, API_CLIMATE_VIEW_EXEC } from "@/models/pjcan/climate";
import {
	API_DOORS_CONFIG_EVENT,
	API_DOORS_CONFIG_EXEC,
	API_DOORS_VALUE_EVENT,
	API_DOORS_VIEW_EVENT,
	API_DOORS_VIEW_EXEC
} from "@/models/pjcan/doors";
import { API_MOVEMENT_VALUE_EVENT, API_MOVEMENT_VIEW_EVENT, API_MOVEMENT_VIEW_EXEC } from "@/models/pjcan/movement";
import { API_SENSORS_VALUE_EVENT, API_SENSORS_VIEW_EVENT, API_SENSORS_VIEW_EXEC } from "@/models/pjcan/sensors";
import {
	API_TEMPERATURE_VALUE_EVENT,
	API_TEMPERATURE_VIEW_EVENT,
	API_TEMPERATURE_VIEW_EXEC
} from "@/models/pjcan/temperature";
import { ChoiceValue } from "@/models/pjcan/choice";
import {
	API_DATETIME_CONFIG_EVENT,
	API_DATETIME_CONFIG_EXEC,
	API_DATETIME_VIEW_EVENT,
	API_DATETIME_VIEW_EXEC
} from "@/models/pjcan/datetime";

export default {
	name: "App",
	components: { BaseLayout },
	setup()
	{
		const { locale } = useI18n();

		// загружаем и применяем язык интерфейса
		store.dispatch("app/readLanguage");
		locale.value = store.getters["app/language"];
		moment.locale(locale.value);

		// записываем входящую конфигурацию в store
		canbus.addListener(API_VERSION_EVENT, (data: DataView): void => store.commit("config/setVersion", data));
		canbus.addListener(API_DEVICE_INFO_EVENT, (data: DataView): void => store.commit("config/setInfo", data));
		canbus.addListener(API_DEVICE_CONFIG_EVENT, (data: DataView): void => store.commit("config/setDevice", data));
		canbus.addListener(API_ONBOARD_CONFIG_EVENT, (data: DataView): void =>
		{
			store.commit("config/setOnboard", data);
		});
		canbus.addListener(API_HEAD_UNIT_CONFIG_EVENT, (data: DataView): void => store.commit("config/setHead", data));
		canbus.addListener(API_SW1_CONFIG_EVENT, (data: DataView): void => store.commit("config/setSW1", data));
		canbus.addListener(API_BOSE_CONFIG_EVENT, (data: DataView): void => store.commit("config/setBose", data));
		canbus.addListener(API_DOORS_CONFIG_EVENT, (data: DataView): void => store.commit("config/setDoors", data));
		canbus.addListener(API_ENGINE_CONFIG_EVENT, (data: DataView): void => store.commit("config/setEngine", data));
		canbus.addListener(API_FUEL_CONFIG_EVENT, (data: DataView): void => store.commit("config/setFuel", data));
		// canbus.addListener(API_VOLUME_VALUE_EVENT, (data: DataView): void => store.commit("config/setVolume", data));
		canbus.addListener(API_DATETIME_CONFIG_EVENT, (data: DataView): void =>
		{
			store.commit("config/setDatetime", data);
			// синхронизация времени
			if (store.getters["config/datetime"].unixtime === 0) store.commit("config/synchDatetime");
		});

		// записываем входящие значения в store
		canbus.addListener(API_SW1_VALUE_EVENT, (data: DataView): void => store.commit("value/setSW1", data));
		canbus.addListener(API_CLIMATE_VALUE_EVENT, (data: DataView): void => store.commit("value/setClimate", data));
		canbus.addListener(API_DEVICE_VALUE_EVENT, (data: DataView): void => store.commit("value/setDevice", data));
		canbus.addListener(API_DOORS_VALUE_EVENT, (data: DataView): void => store.commit("value/setDoors", data));
		canbus.addListener(API_ENGINE_VALUE_EVENT, (data: DataView): void => store.commit("value/setEngine", data));
		canbus.addListener(API_FUEL_VALUE_EVENT, (data: DataView): void => store.commit("value/setFuel", data));
		canbus.addListener(API_MOVEMENT_VALUE_EVENT, (data: DataView): void => store.commit("value/setMovement", data));
		canbus.addListener(API_SENSORS_VALUE_EVENT, (data: DataView): void => store.commit("value/setSensors", data));
		canbus.addListener(API_TEMPERATURE_VALUE_EVENT, (data: DataView): void =>
			store.commit("value/setTemperature", data)
		);
		canbus.addListener(API_DEVICE_SCANNER_VALUE_EVENT, (data: DataView): void =>
			store.commit("value/setScanner", data)
		);

		// записываем входящие значения отображения в store
		canbus.addListener(API_DEVICE_VIEW_WORKTIME_EVENT, (data: DataView): void =>
			store.commit("view/setWorktime", data)
		);
		canbus.addListener(API_DEVICE_VIEW_VOLTMETER_EVENT, (data: DataView): void =>
			store.commit("view/setVoltmeter", data)
		);
		canbus.addListener(API_ONBOARD_VIEW_EVENT, (data: DataView): void => store.commit("view/setOnboard", data));
		canbus.addListener(API_HEAD_UNIT_VIEW_EVENT, (data: DataView): void => store.commit("view/setHeadText", data));
		canbus.addListener(API_BOSE_VIEW_EVENT, (data: DataView): void => store.commit("view/setBose", data));
		canbus.addListener(API_CLIMATE_VIEW_EVENT, (data: DataView): void => store.commit("view/setClimate", data));
		canbus.addListener(API_DOORS_VIEW_EVENT, (data: DataView): void => store.commit("view/setDoors", data));
		canbus.addListener(API_ENGINE_VIEW_EVENT, (data: DataView): void => store.commit("view/setEngine", data));
		canbus.addListener(API_FUEL_VIEW_EVENT, (data: DataView): void => store.commit("view/setFuel", data));
		canbus.addListener(API_MOVEMENT_VIEW_EVENT, (data: DataView): void => store.commit("view/setMovement", data));
		canbus.addListener(API_SENSORS_VIEW_EVENT, (data: DataView): void => store.commit("view/setSensors", data));
		canbus.addListener(API_TEMPERATURE_VIEW_EVENT, (data: DataView): void =>
			store.commit("view/setTemperature", data)
		);
		// canbus.addListener(API_VOLUME_VIEW_EVENT, (data: DataView): void => store.commit("view/setVolume", data));
		canbus.addListener(API_DATETIME_VIEW_EVENT, (data: DataView): void => store.commit("view/setDatetime", data));

		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.listID.push(API_DEVICE_CONFIG_EXEC);
				choice.listID.push(API_ONBOARD_CONFIG_EXEC);
				choice.listID.push(API_HEAD_UNIT_CONFIG_EXEC);
				choice.listID.push(API_DOORS_CONFIG_EXEC);
				choice.listID.push(API_ENGINE_CONFIG_EXEC);
				choice.listID.push(API_FUEL_CONFIG_EXEC);
				// choice.listID.push(API_VOLUME_VALUE_EXEC);
				choice.listID.push(API_BOSE_CONFIG_EXEC);
				choice.listID.push(API_DATETIME_CONFIG_EXEC);
				canbus.query(choice, true);

				canbus.query(store.getters["config/sw1"], true);

				choice.listID = [];
				choice.listID.push(API_DEVICE_VIEW_WORKTIME_EXEC);
				choice.listID.push(API_DEVICE_VIEW_VOLTMETER_EXEC);
				choice.listID.push(API_ONBOARD_VIEW_EXEC);
				choice.listID.push(API_HEAD_UNIT_VIEW_EXEC);
				choice.listID.push(API_BOSE_VIEW_EXEC);
				choice.listID.push(API_CLIMATE_VIEW_EXEC);
				choice.listID.push(API_DOORS_VIEW_EXEC);
				choice.listID.push(API_ENGINE_VIEW_EXEC);
				choice.listID.push(API_FUEL_VIEW_EXEC);
				choice.listID.push(API_MOVEMENT_VIEW_EXEC);
				choice.listID.push(API_SENSORS_VIEW_EXEC);
				choice.listID.push(API_TEMPERATURE_VIEW_EXEC);
				choice.listID.push(API_DATETIME_VIEW_EXEC);
				canbus.query(choice, true);
			}
		};
		canbus.addListener(API_CANBUS_EVENT, onBegin);

		// Отключаемся от адаптера, перед тем как обновиться страница
		window.onbeforeunload = (ev: BeforeUnloadEvent): void => canbus.bluetooth.disconnect();
	}
};
</script>
