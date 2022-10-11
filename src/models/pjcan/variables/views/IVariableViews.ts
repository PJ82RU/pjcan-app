import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";
import { IBoseView } from "../bose";
import { IClimateView } from "../climate";
import { IDoorsView } from "../doors";
import { IEngineView } from "../engine";
import { IFuelView } from "../fuel";
import { IMovementView } from "../movement";
import { ISensorsView } from "../sensors";
import { ITemperatureView } from "../temperature";
import { IVolumeView } from "../volume";

/** Интерфейс параметров отображения данных переменных */
export interface IVariableViews extends IBaseModel {
	bose: IBoseView;
	climate: IClimateView;
	clock: IViewConfig;
	doors: IDoorsView;
	engine: IEngineView;
	fuel: IFuelView;
	movement: IMovementView;
	sensors: ISensorsView;
	temperature: ITemperatureView;
	volume: IVolumeView;
}
