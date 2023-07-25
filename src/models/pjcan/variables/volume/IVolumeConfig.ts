import { IBaseModel } from "../../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	/** Выкл. звук */
	mute: boolean;
	/** Выкл. звук Bose */
	muteBose: boolean;
	/** Уровень звука */
	volume: number;
	/** Уровень звука Bose */
	volumeBose: number;
	/** Максимальный уровень звука */
	max: number;
}
