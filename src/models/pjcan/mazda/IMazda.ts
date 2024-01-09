import { IMazdaConfig } from "./IMazdaConfig";
import { IViewConfig } from "../view";

export interface IMazda {
	config: IMazdaConfig;
	viewHello: IViewConfig;
}
