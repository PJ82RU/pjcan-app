import { IBaseModel } from "../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeValue extends IBaseModel {
	mute: boolean; // Выкл. звук
	volume: number; // Уровень звука
}
