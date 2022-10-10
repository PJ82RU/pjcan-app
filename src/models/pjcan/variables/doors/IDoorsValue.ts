import { IBaseModel } from "../../base";

/** Интерфейс значений дверей */
export interface IDoorsValue extends IBaseModel {
	frontLeft: boolean;
	frontRight: boolean;
	backLeft: boolean;
	backRight: boolean;
	trunk: boolean;
}
