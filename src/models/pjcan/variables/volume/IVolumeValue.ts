import { IBaseModel } from "../../base";

/** Интерфейс значения уровня звука */
export interface IVolumeValue extends IBaseModel {
	/** Выкл. звук */
	mute: boolean;
	/** Уровень звука */
	volume: number;
}
