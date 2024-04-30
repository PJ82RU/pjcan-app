import { IDeviceInfo } from "@/models/pjcan/device";
import { IMazdaConfig } from "@/models/pjcan/mazda";
import { ITeyesConfig } from "@/models/pjcan/teyes";
import { IButtonsConfig } from "@/models/pjcan/buttons";
import { IBoseConfig } from "@/models/pjcan/bose";
import { IEngineConfig } from "@/models/pjcan/engine";
import { IFuelConfig } from "@/models/pjcan/fuel";
import { IVolumeConfig } from "@/models/pjcan/volume";

const state = {
	info: null as IDeviceInfo | null,
	mazda: null as IMazdaConfig | null,
	teyes: null as ITeyesConfig | null,
	buttons: null as IButtonsConfig | null,
	bose: null as IBoseConfig | null,
	engine: null as IEngineConfig | null,
	fuel: null as IFuelConfig | null,
	volume: null as IVolumeConfig | null
};

export default state;
