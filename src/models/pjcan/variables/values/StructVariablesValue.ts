import { BluetoothStruct } from "@/components/bluetooth";
import { StructClimateValue } from "../climate";
import { StructClockValue } from "../clock";
import { StructDoorsValue } from "../doors";
import { StructEngineValue } from "../engine";
import { StructFuelValue } from "../fuel";
import { StructMovementValue } from "../movement";
import { StructSensorsValue } from "../sensors";
import { StructTemperatureValue } from "../temperature";
import { StructVolumeValue } from "../volume";

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
