import { DeviceInfo } from "@/models/pjcan/device";
import { MazdaConfig } from "@/models/pjcan/mazda";
import { TeyesConfig } from "@/models/pjcan/teyes";
import { ButtonsConfig } from "@/models/pjcan/buttons";
import { BoseConfig } from "@/models/pjcan/bose";
import { DoorsConfig } from "@/models/pjcan/doors";
import { EngineConfig } from "@/models/pjcan/engine";
import { FuelConfig } from "@/models/pjcan/fuel";
import { VolumeConfig } from "@/models/pjcan/volume";
import { Version } from "@/models/pjcan/version";

const state = {
	version: new Version(),
	info: new DeviceInfo(),
	mazda: new MazdaConfig(),
	teyes: new TeyesConfig(),
	sw1: new ButtonsConfig(),
	bose: new BoseConfig(),
	doors: new DoorsConfig(),
	engine: new EngineConfig(),
	fuel: new FuelConfig(),
	volume: new VolumeConfig()
};

export default state;
