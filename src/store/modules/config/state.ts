import { DeviceInfo } from "@/models/pjcan/device";
import { OnboardConfig } from "@/models/pjcan/onboard";
import { HeadUnitConfig } from "@/models/pjcan/head-unit";
import { SW1Config } from "@/models/pjcan/buttons";
import { BoseConfig } from "@/models/pjcan/bose";
import { DoorsConfig } from "@/models/pjcan/doors";
import { EngineConfig } from "@/models/pjcan/engine";
import { FuelConfig } from "@/models/pjcan/fuel";
import { VolumeValue } from "@/models/pjcan/volume";
import { Version } from "@/models/pjcan/version";
import { DatetimeConfig } from "@/models/pjcan/datetime";

const state = {
	version: new Version(),
	info: new DeviceInfo(),
	onboard: new OnboardConfig(),
	head: new HeadUnitConfig(),
	sw1: new SW1Config(),
	bose: new BoseConfig(),
	doors: new DoorsConfig(),
	engine: new EngineConfig(),
	fuel: new FuelConfig(),
	volume: new VolumeValue(),
	datetime: new DatetimeConfig()
};

export default state;
