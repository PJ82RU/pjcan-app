import { IBaseModel } from "../../base";
import { TCenterPoint } from "./TCenterPoint";

/** Интерфейс параметров Bose */
export interface IBoseConfig extends IBaseModel {
	enabled: boolean;
	audioPLT: boolean;
	radioFM: boolean;
	wow: boolean;
	balance: number;
	bass: number;
	fade: number;
	treble: number;
	centerPoint: TCenterPoint;
}
