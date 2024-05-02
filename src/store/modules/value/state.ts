import { ButtonValue } from "@/models/pjcan/buttons";
import { ClimateValue } from "@/models/pjcan/climate";
import { DeviceValue } from "@/models/pjcan/device";
import { DoorsValue } from "@/models/pjcan/doors";
import { EngineValue } from "@/models/pjcan/engine";
import { FuelValue } from "@/models/pjcan/fuel";
import { MovementValue } from "@/models/pjcan/movement";
import { SensorsValue } from "@/models/pjcan/sensors";
import { TemperatureValue } from "@/models/pjcan/temperature";

const state = {
	sw1: new ButtonValue(),
	climate: new ClimateValue(),
	device: new DeviceValue(),
	doors: new DoorsValue(),
	engine: new EngineValue(),
	fuel: new FuelValue(),
	movement: new MovementValue(),
	sensors: new SensorsValue(),
	temperature: new TemperatureValue()
};

export default state;
