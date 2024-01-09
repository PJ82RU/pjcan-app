import { IBaseModel } from "../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	mute: boolean; // Выкл. звук
	muteBose: boolean; // Выкл. звук Bose
	volume: number; // Уровень звука
	volumeBose: number; // Уровень звука Bose
}
