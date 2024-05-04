import { IBaseModel } from "../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	mute: boolean; // Выкл. звук
	muteBose: boolean; // Выкл. звук Bose
	start: boolean; // Изменять уровень звука при включении адаптера
	startBose: boolean; // Изменять уровень звука Bose при включении адаптера
	volume: number; // Уровень звука
	volumeBose: number; // Уровень звука Bose
	startLevel: number; // Уровень звука при включении адаптера
	startLevelBose: number; // Уровень звука Bose при включении адаптера
}
