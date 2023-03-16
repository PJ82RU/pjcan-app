import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";
import { API_VARIABLE_BOSE_VIEW_SIZE, StructBoseView } from "../bose";
import { API_VARIABLE_CLIMATE_VIEW_SIZE, StructClimateView } from "../climate";
import { API_VARIABLE_DOORS_VIEW_SIZE, StructDoorsView } from "../doors";
import { API_VARIABLE_ENGINE_VIEW_SIZE, StructEngineView } from "../engine";
import { API_VARIABLE_FUEL_VIEW_SIZE, StructFuelView } from "../fuel";
import { API_VARIABLE_MOVEMENT_VIEW_SIZE, StructMovementView } from "../movement";
import { API_VARIABLE_SENSORS_VIEW_SIZE, StructSensorsView } from "../sensors";
import { API_VARIABLE_TEMPERATURE_VIEW_SIZE, StructTemperatureView } from "../temperature";
import { API_VARIABLE_VOLUME_VIEW_SIZE, StructVolumeView } from "../volume";
import { API_VARIABLE_CLOCK_VIEW_SIZE } from "@/models/pjcan/variables/clock";

export const API_VARIABLE_VIEWS_SIZE =
	API_VARIABLE_BOSE_VIEW_SIZE +
	API_VARIABLE_CLIMATE_VIEW_SIZE +
	API_VARIABLE_CLOCK_VIEW_SIZE +
	API_VARIABLE_DOORS_VIEW_SIZE +
	API_VARIABLE_ENGINE_VIEW_SIZE +
	API_VARIABLE_FUEL_VIEW_SIZE +
	API_VARIABLE_MOVEMENT_VIEW_SIZE +
	API_VARIABLE_SENSORS_VIEW_SIZE +
	API_VARIABLE_TEMPERATURE_VIEW_SIZE +
	API_VARIABLE_VOLUME_VIEW_SIZE;

/** Структура данных */
export const StructVariableViews = {
	bose: BluetoothStruct.struct(StructBoseView),
	climate: BluetoothStruct.struct(StructClimateView),
	clock: BluetoothStruct.struct(StructViewConfig),
	doors: BluetoothStruct.struct(StructDoorsView),
	engine: BluetoothStruct.struct(StructEngineView),
	fuel: BluetoothStruct.struct(StructFuelView),
	movement: BluetoothStruct.struct(StructMovementView),
	sensors: BluetoothStruct.struct(StructSensorsView),
	temperature: BluetoothStruct.struct(StructTemperatureView),
	volume: BluetoothStruct.struct(StructVolumeView)
};
