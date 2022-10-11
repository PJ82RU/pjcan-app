import { BluetoothStruct } from "@/components/bluetooth";
import { StructViewConfig } from "../../view";
import { StructBoseView } from "../bose";
import { StructClimateView } from "../climate";
import { StructDoorsView } from "../doors";
import { StructEngineView } from "../engine";
import { StructFuelView } from "../fuel";
import { StructMovementView } from "../movement";
import { StructSensorsView } from "../sensors";
import { StructTemperatureView } from "../temperature";
import { StructVolumeView } from "../volume";

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
