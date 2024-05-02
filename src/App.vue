<template>
	<base-layout />
</template>

<script lang="ts">
import store from "@/store";
import canbus from "@/api/canbus";

import BaseLayout from "./layout/BaseLayout.vue";

import { API_VERSION_EVENT } from "@/models/pjcan/version";
import {
	API_DEVICE_INFO_EVENT,
	API_DEVICE_VALUE_EVENT,
	API_DEVICE_VIEW_VOLTMETER_EVENT,
	API_DEVICE_VIEW_VOLTMETER_EXEC,
	API_DEVICE_VIEW_WORKTIME_EVENT,
	API_DEVICE_VIEW_WORKTIME_EXEC
} from "@/models/pjcan/device";
import {
	API_MAZDA_CONFIG_EVENT,
	API_MAZDA_CONFIG_EXEC,
	API_MAZDA_VIEW_EVENT,
	API_MAZDA_VIEW_EXEC
} from "@/models/pjcan/mazda";
import {
	API_TEYES_CONFIG_EVENT,
	API_TEYES_CONFIG_EXEC,
	API_TEYES_TEXT_VIEW_EVENT,
	API_TEYES_TEXT_VIEW_EXEC
} from "@/models/pjcan/teyes";
import { API_BUTTON_SW1_VALUE_EVENT, API_BUTTONS_SW1_CONFIG_EVENT } from "@/models/pjcan/buttons";
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
import {
	API_VOLUME_CONFIG_EVENT,
	API_VOLUME_CONFIG_EXEC,
	API_VOLUME_VIEW_EVENT,
	API_VOLUME_VIEW_EXEC
} from "@/models/pjcan/volume";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { API_CLIMATE_VALUE_EVENT, API_CLIMATE_VIEW_EVENT, API_CLIMATE_VIEW_EXEC } from "@/models/pjcan/climate";
import { API_DOORS_VALUE_EVENT, API_DOORS_VIEW_EVENT, API_DOORS_VIEW_EXEC } from "@/models/pjcan/doors";
import { API_MOVEMENT_VALUE_EVENT, API_MOVEMENT_VIEW_EVENT, API_MOVEMENT_VIEW_EXEC } from "@/models/pjcan/movement";
import { API_SENSORS_VALUE_EVENT, API_SENSORS_VIEW_EVENT, API_SENSORS_VIEW_EXEC } from "@/models/pjcan/sensors";
import {
	API_TEMPERATURE_VALUE_EVENT,
	API_TEMPERATURE_VIEW_EVENT,
	API_TEMPERATURE_VIEW_EXEC
} from "@/models/pjcan/temperature";
import { ChoiceValue } from "@/models/pjcan/choice";

export default {
	name: "App",
	components: { BaseLayout },
	setup()
	{
		// записываем входящую конфигурацию в store
		canbus.addListener(API_VERSION_EVENT, (data: DataView) => store.commit("config/setVersion", data));
		canbus.addListener(API_DEVICE_INFO_EVENT, (data: DataView) => store.commit("config/setInfo", data));
		canbus.addListener(API_MAZDA_CONFIG_EVENT, (data: DataView) => store.commit("config/setMazda", data));
		canbus.addListener(API_TEYES_CONFIG_EVENT, (data: DataView) => store.commit("config/setTeyes", data));
		canbus.addListener(API_BUTTONS_SW1_CONFIG_EVENT, (data: DataView) => store.commit("config/setSW1", data));
		canbus.addListener(API_BOSE_CONFIG_EVENT, (data: DataView) => store.commit("config/setBose", data));
		canbus.addListener(API_ENGINE_CONFIG_EVENT, (data: DataView) => store.commit("config/setEngine", data));
		canbus.addListener(API_FUEL_CONFIG_EVENT, (data: DataView) => store.commit("config/setFuel", data));
		canbus.addListener(API_VOLUME_CONFIG_EVENT, (data: DataView) => store.commit("config/setVolume", data));

		// записываем входящие значения в store
		canbus.addListener(API_BUTTON_SW1_VALUE_EVENT, (data: DataView) => store.commit("value/setSW1", data));
		canbus.addListener(API_CLIMATE_VALUE_EVENT, (data: DataView) => store.commit("value/setClimate", data));
		canbus.addListener(API_DEVICE_VALUE_EVENT, (data: DataView) => store.commit("value/setDevice", data));
		canbus.addListener(API_DOORS_VALUE_EVENT, (data: DataView) => store.commit("value/setDoors", data));
		canbus.addListener(API_ENGINE_VALUE_EVENT, (data: DataView) => store.commit("value/setEngine", data));
		canbus.addListener(API_FUEL_VALUE_EVENT, (data: DataView) => store.commit("value/setFuel", data));
		canbus.addListener(API_MOVEMENT_VALUE_EVENT, (data: DataView) => store.commit("value/setMovement", data));
		canbus.addListener(API_SENSORS_VALUE_EVENT, (data: DataView) => store.commit("value/setSensors", data));
		canbus.addListener(API_TEMPERATURE_VALUE_EVENT, (data: DataView) => store.commit("value/setTemperature", data));

		// записываем входящие значения отображения в store
		canbus.addListener(API_DEVICE_VIEW_WORKTIME_EVENT, (data: DataView) => store.commit("view/setWorktime", data));
		canbus.addListener(API_DEVICE_VIEW_VOLTMETER_EVENT, (data: DataView) =>
			store.commit("view/setVoltmeter", data)
		);
		canbus.addListener(API_MAZDA_VIEW_EVENT, (data: DataView) => store.commit("view/setMazda", data));
		canbus.addListener(API_TEYES_TEXT_VIEW_EVENT, (data: DataView) => store.commit("view/setTeyesText", data));
		canbus.addListener(API_BOSE_VIEW_EVENT, (data: DataView) => store.commit("view/setBose", data));
		canbus.addListener(API_CLIMATE_VIEW_EVENT, (data: DataView) => store.commit("view/setClimate", data));
		canbus.addListener(API_DOORS_VIEW_EVENT, (data: DataView) => store.commit("view/setDoors", data));
		canbus.addListener(API_ENGINE_VIEW_EVENT, (data: DataView) => store.commit("view/setEngine", data));
		canbus.addListener(API_FUEL_VIEW_EVENT, (data: DataView) => store.commit("view/setFuel", data));
		canbus.addListener(API_MOVEMENT_VIEW_EVENT, (data: DataView) => store.commit("view/setMovement", data));
		canbus.addListener(API_SENSORS_VIEW_EVENT, (data: DataView) => store.commit("view/setSensors", data));
		canbus.addListener(API_TEMPERATURE_VIEW_EVENT, (data: DataView) => store.commit("view/setTemperature", data));
		canbus.addListener(API_VOLUME_VIEW_EVENT, (data: DataView) => store.commit("view/setVolume", data));

		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				if (!store.getters["config/mazda"].isData) choice.listID.push(API_MAZDA_CONFIG_EXEC);
				if (!store.getters["config/teyes"].isData) choice.listID.push(API_TEYES_CONFIG_EXEC);
				if (!store.getters["config/engine"].isData) choice.listID.push(API_ENGINE_CONFIG_EXEC);
				if (!store.getters["config/fuel"].isData) choice.listID.push(API_FUEL_CONFIG_EXEC);
				if (!store.getters["config/volume"].isData) choice.listID.push(API_VOLUME_CONFIG_EXEC);
				if (!store.getters["config/bose"].isData) choice.listID.push(API_BOSE_CONFIG_EXEC);
				if (choice.listID.length) canbus.query(choice, true);

				if (!store.getters["config/sw1"].isData) canbus.query(store.getters["config/sw1"], true);

				choice.listID = [];
				if (!store.getters["view/worktime"].isData) choice.listID.push(API_DEVICE_VIEW_WORKTIME_EXEC);
				if (!store.getters["view/voltmeter"].isData) choice.listID.push(API_DEVICE_VIEW_VOLTMETER_EXEC);
				if (!store.getters["view/mazda"].isData) choice.listID.push(API_MAZDA_VIEW_EXEC);
				if (!store.getters["view/teyesText"].isData) choice.listID.push(API_TEYES_TEXT_VIEW_EXEC);
				if (!store.getters["view/bose"].isData) choice.listID.push(API_BOSE_VIEW_EXEC);
				if (!store.getters["view/climate"].isData) choice.listID.push(API_CLIMATE_VIEW_EXEC);
				if (!store.getters["view/doors"].isData) choice.listID.push(API_DOORS_VIEW_EXEC);
				if (!store.getters["view/engine"].isData) choice.listID.push(API_ENGINE_VIEW_EXEC);
				if (!store.getters["view/fuel"].isData) choice.listID.push(API_FUEL_VIEW_EXEC);
				if (!store.getters["view/movement"].isData) choice.listID.push(API_MOVEMENT_VIEW_EXEC);
				if (!store.getters["view/sensors"].isData) choice.listID.push(API_SENSORS_VIEW_EXEC);
				if (!store.getters["view/temperature"].isData) choice.listID.push(API_TEMPERATURE_VIEW_EXEC);
				if (!store.getters["view/volume"].isData) choice.listID.push(API_VOLUME_VIEW_EXEC);
				if (choice.listID.length) canbus.query(choice, true);
			}
		};
		canbus.addListener(API_CANBUS_EVENT, onBegin);
	}
};
</script>
