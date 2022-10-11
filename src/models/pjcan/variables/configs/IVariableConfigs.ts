import { IBaseModel } from "../../base";
import { IBoseConfig } from "../bose";
import { IEngineConfig } from "../engine";
import { IFuelConfig } from "../fuel";
import { IVolumeConfig } from "../volume";

/** Интерфейс конфигурации переменных */
export interface IVariableConfigs extends IBaseModel {
	bose: IBoseConfig;
	engine: IEngineConfig;
	fuel: IFuelConfig;
	volume: IVolumeConfig;
}
