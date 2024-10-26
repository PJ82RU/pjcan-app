import { SWValue } from "@/models/pjcan/buttons";
import { ClimateValue } from "@/models/pjcan/climate";
import { DeviceScannerValue, DeviceValue } from "@/models/pjcan/device";
import { DoorsValue } from "@/models/pjcan/doors";
import { EngineValue } from "@/models/pjcan/engine";
import { FuelValue } from "@/models/pjcan/fuel";
import { MovementValue } from "@/models/pjcan/movement";
import { SensorsValue } from "@/models/pjcan/sensors";
import { TemperatureValue } from "@/models/pjcan/temperature";
import { IScanCanRow } from "@/models/interfaces/IScanCanRow";
import { TestValue } from "@/models/pjcan/test";

const state = {
	sw1: new SWValue(),
	climate: new ClimateValue(),
	device: new DeviceValue(),
	doors: new DoorsValue(),
	engine: new EngineValue(),
	fuel: new FuelValue(),
	movement: new MovementValue(),
	sensors: new SensorsValue(),
	temperature: new TemperatureValue(),
	scanner: new DeviceScannerValue(),
	scannerBuffer: [] as IScanCanRow[],
	scannerBufferReadNumber: 30,
	test: new TestValue()
};

export default state;
