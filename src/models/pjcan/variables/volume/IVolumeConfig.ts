import { IBaseModel } from "../../base";

/** Интерфейс конфигурации уровня звука */
export interface IVolumeConfig extends IBaseModel {
	mute: boolean; // Выкл. звук
	volume: number; // Уровень звука
	max: number; // Максимальный уровень звука
}
