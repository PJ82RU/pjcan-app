import { IFuelConfig } from "./IFuelConfig";
import { IFuelValue } from "./IFuelValue";
import { IFuelView } from "./IFuelView";

export interface IFuel {
	config: IFuelConfig;
	value: IFuelValue;
	views: IFuelView;
}
