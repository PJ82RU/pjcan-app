import { IBaseModel } from "../../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	/** Выкл. звук */
	mute: boolean;
	/** Управлять только Bose */
	boseOnly: boolean
	/** Уровень звука */
	volume: number;
	/** Максимальный уровень звука */
	max: number;
}
