import canbus from "@/api/canbus";
import { TCarModel } from "@/models/pjcan/mazda";

/**
 * Записать версию прошивки
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setVersion = (state: any, data: DataView) =>
{
	state.version.set(data);
};

/**
 * Изменить информацию об устройстве
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setInfo = (state: any, data: DataView) =>
{
	state.info.set(data);
};

/**
 * Изменить конфигурацию автомобиля
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setMazda = (state: any, data: DataView) =>
{
	state.mazda.set(data);
};

/**
 * Изменить модель автомобиля
 * @param {any} state
 * @param {TCarModel} value Новое значение
 */
export const setMazdaCarModel = (state: any, value: TCarModel) =>
{
	if (state.mazda.isData)
	{
		state.mazda.carModel = value;
		canbus.query(state.mazda);
	}
};

/**
 * Изменить конфигурацию Teyes
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setTeyes = (state: any, data: DataView) =>
{
	state.teyes.set(data);
};

/**
 * Изменить конфигурацию кнопок
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setButtons = (state: any, data: DataView) =>
{
	state.buttons.set(data);
};

/**
 * Изменить конфигурацию Bose
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setBose = (state: any, data: DataView) =>
{
	state.bose.set(data);
};

/**
 * Изменить конфигурацию ДВС
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setEngine = (state: any, data: DataView) =>
{
	state.engine.set(data);
};

/**
 * Изменить конфигурацию расхода
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setFuel = (state: any, data: DataView) =>
{
	state.fuel.set(data);
};

/**
 * Изменить конфигурацию уровня звука
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setVolume = (state: any, data: DataView) =>
{
	state.volume.set(data);
};
