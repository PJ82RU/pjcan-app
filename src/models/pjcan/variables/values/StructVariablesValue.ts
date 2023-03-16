import { BluetoothStruct } from "@/components/bluetooth";
import { API_VARIABLE_CLIMATE_SIZE, StructClimateValue } from "../climate";
import { API_VARIABLE_CLOCK_SIZE, StructClockValue } from "../clock";
import { API_VARIABLE_DOORS_SIZE, StructDoorsValue } from "../doors";
import { API_VARIABLE_ENGINE_SIZE, StructEngineValue } from "../engine";
import { API_VARIABLE_FUEL_SIZE, StructFuelValue } from "../fuel";
import { API_VARIABLE_MOVEMENT_SIZE, StructMovementValue } from "../movement";
import { API_VARIABLE_SENSORS_SIZE, StructSensorsValue } from "../sensors";
import { API_VARIABLE_TEMPERATURE_SIZE, StructTemperatureValue } from "../temperature";
import { API_VARIABLE_VOLUME_SIZE, StructVolumeValue } from "../volume";

export const API_VARIABLE_VALUES_SIZE =
	API_VARIABLE_CLIMATE_SIZE +
	API_VARIABLE_CLOCK_SIZE +
	API_VARIABLE_DOORS_SIZE +
	API_VARIABLE_ENGINE_SIZE +
	API_VARIABLE_FUEL_SIZE +
	API_VARIABLE_MOVEMENT_SIZE +
	API_VARIABLE_SENSORS_SIZE +
	API_VARIABLE_TEMPERATURE_SIZE +
	API_VARIABLE_VOLUME_SIZE;

export const StructVariablesValue = {
	climate: BluetoothStruct.struct(StructClimateValue),
	clock: BluetoothStruct.struct(StructClockValue),
	doors: BluetoothStruct.struct(StructDoorsValue),
	engine: BluetoothStruct.struct(StructEngineValue),
	fuel: BluetoothStruct.struct(StructFuelValue),
	movement: BluetoothStruct.struct(StructMovementValue),
	sensors: BluetoothStruct.struct(StructSensorsValue),
	temperature: BluetoothStruct.struct(StructTemperatureValue),
	volume: BluetoothStruct.struct(StructVolumeValue)
};
