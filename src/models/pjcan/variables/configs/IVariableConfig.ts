import { IBaseModel } from "@/models/pjcan/base/BaseModel";
import { IBoseConfig } from "@/models/pjcan/variables/bose";

/** Интерфейс конфигурации переменных */
export interface IVariableConfig extends IBaseModel {
	bose: IBoseConfig;
	engine: IEngineConfig;
	fuel: IFuelConfig;
	volume: IVolumeConfig;
}
