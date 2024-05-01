<template>
	<base-layout />
</template>

<script lang="ts">
import store from "@/store";
import canbus from "@/api/canbus";

import BaseLayout from "./layout/BaseLayout.vue";

import { API_VERSION_EVENT } from "@/models/pjcan/version";
import { API_DEVICE_INFO_EVENT, API_DEVICE_VALUE_EVENT } from "@/models/pjcan/device";
import { API_MAZDA_CONFIG_EVENT, API_MAZDA_CONFIG_EXEC } from "@/models/pjcan/mazda";
import { API_TEYES_CONFIG_EVENT, API_TEYES_CONFIG_EXEC } from "@/models/pjcan/teyes";
import { API_BUTTONS_SW1_CONFIG_EVENT } from "@/models/pjcan/buttons";
import { API_BOSE_CONFIG_EVENT } from "@/models/pjcan/bose";
import { API_ENGINE_CONFIG_EVENT, API_ENGINE_VALUE_EVENT } from "@/models/pjcan/engine";
import { API_FUEL_CONFIG_EVENT, API_FUEL_VALUE_EVENT } from "@/models/pjcan/fuel";
import { API_VOLUME_CONFIG_EVENT } from "@/models/pjcan/volume";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { API_CLIMATE_VALUE_EVENT } from "@/models/pjcan/climate";
import { API_DOORS_VALUE_EVENT } from "@/models/pjcan/doors";
import { API_MOVEMENT_VALUE_EVENT } from "@/models/pjcan/movement";
import { API_SENSORS_VALUE_EVENT } from "@/models/pjcan/sensors";
import { API_TEMPERATURE_VALUE_EVENT } from "@/models/pjcan/temperature";
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
		canbus.addListener(API_BUTTONS_SW1_CONFIG_EVENT, (data: DataView) => store.commit("config/setButtons", data));
		canbus.addListener(API_BOSE_CONFIG_EVENT, (data: DataView) => store.commit("config/setBose", data));
		canbus.addListener(API_ENGINE_CONFIG_EVENT, (data: DataView) => store.commit("config/setEngine", data));
		canbus.addListener(API_FUEL_CONFIG_EVENT, (data: DataView) => store.commit("config/setFuel", data));
		canbus.addListener(API_VOLUME_CONFIG_EVENT, (data: DataView) => store.commit("config/setVolume", data));

		// записываем входящие значения в store
		canbus.addListener(API_CLIMATE_VALUE_EVENT, (data: DataView) => store.commit("value/setClimate", data));
		canbus.addListener(API_DEVICE_VALUE_EVENT, (data: DataView) => store.commit("value/setDevice", data));
		canbus.addListener(API_DOORS_VALUE_EVENT, (data: DataView) => store.commit("value/setDoors", data));
		canbus.addListener(API_ENGINE_VALUE_EVENT, (data: DataView) => store.commit("value/setEngine", data));
		canbus.addListener(API_FUEL_VALUE_EVENT, (data: DataView) => store.commit("value/setFuel", data));
		canbus.addListener(API_MOVEMENT_VALUE_EVENT, (data: DataView) => store.commit("value/setMovement", data));
		canbus.addListener(API_SENSORS_VALUE_EVENT, (data: DataView) => store.commit("value/setSensors", data));
		canbus.addListener(API_TEMPERATURE_VALUE_EVENT, (data: DataView) => store.commit("value/setTemperature", data));

		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				if (!store.getters["config/mazda"].isData) choice.listID.push(API_MAZDA_CONFIG_EXEC);
				if (!store.getters["config/teyes"].isData) choice.listID.push(API_TEYES_CONFIG_EXEC);
				if (choice.listID.length) canbus.query(choice, true);
			}
		};
		canbus.addListener(API_CANBUS_EVENT, onBegin);
	}
};
</script>
