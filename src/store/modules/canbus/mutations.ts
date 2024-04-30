import canbus from "@/api/canbus";
import { IDeviceInfo } from "@/models/pjcan/device";
import { IMazdaConfig, TCarModel } from "@/models/pjcan/mazda";
import { ITeyesConfig } from "@/models/pjcan/teyes";
import { IButtonsConfig } from "@/models/pjcan/buttons";
import { IBoseConfig } from "@/models/pjcan/bose";
import { IEngineConfig } from "@/models/pjcan/engine";
import { IFuelConfig } from "@/models/pjcan/fuel";
import { IVolumeConfig } from "@/models/pjcan/volume";

/**
 * Изменить информацию об устройстве
 * @param {any} state
 * @param {IDeviceInfo} value Новое значение
 */
export const setInfo = (state: any, value: IDeviceInfo) =>
{
	state.info = value;
};

/**
 * Изменить конфигурацию автомобиля
 * @param {any} state
 * @param {IMazdaConfig} value Новое значение
 */
export const setMazda = (state: any, value: IMazdaConfig) =>
{
	state.mazda = value;
};

/**
 * Изменить модель автомобиля
 * @param {any} state
 * @param {TCarModel} value Новое значение
 */
export const setMazdaCarModel = (state: any, value: TCarModel) =>
{
	if (state.mazda)
	{
		state.mazda.carModel = value;
		canbus.query(state.mazda);
	}
};

/**
 * Изменить конфигурацию Teyes
 * @param {any} state
 * @param {ITeyesConfig} value Новое значение
 */
export const setTeyes = (state: any, value: ITeyesConfig) =>
{
	state.teyes = value;
};

/**
 * Изменить конфигурацию кнопок
 * @param {any} state
 * @param {IButtonsConfig} value Новое значение
 */
export const setButtons = (state: any, value: IButtonsConfig) =>
{
	state.buttons = value;
};

/**
 * Изменить конфигурацию Bose
 * @param {any} state
 * @param {IBoseConfig} value Новое значение
 */
export const setBose = (state: any, value: IBoseConfig) =>
{
	state.bose = value;
};

/**
 * Изменить конфигурацию ДВС
 * @param {any} state
 * @param {IEngineConfig} value Новое значение
 */
export const setEngine = (state: any, value: IEngineConfig) =>
{
	state.engine = value;
};

/**
 * Изменить конфигурацию расхода
 * @param {any} state
 * @param {IFuelConfig} value Новое значение
 */
export const setFuel = (state: any, value: IFuelConfig) =>
{
	state.fuel = value;
};

/**
 * Изменить конфигурацию уровня звука
 * @param {any} state
 * @param {IVolumeConfig} value Новое значение
 */
export const setVolume = (state: any, value: IVolumeConfig) =>
{
	state.volume = value;
};
