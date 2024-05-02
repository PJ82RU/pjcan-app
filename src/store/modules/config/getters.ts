import { TCarModel } from "@/models/pjcan/mazda";

/**
 * Версия прошивки
 * @param {any} state
 */
export const version = (state: any) => state.version;

/**
 * Информация об устройстве
 * @param {any} state
 */
export const info = (state: any) => state.info;

/**
 * Конфигурация автомобиля
 * @param {any} state
 */
export const mazda = (state: any) => state.mazda;

/**
 * Модель автомобиля
 * @param {any} state
 */
export const carModel = (state: any) => state.mazda.isData ? state.mazda.carModel : TCarModel.CAR_MODEL_UNKNOWN;

/**
 * Конфигурация Teyes
 * @param {any} state
 */
export const teyes = (state: any) => state.teyes;

/**
 * Конфигурация кнопок sw1
 * @param {any} state
 */
export const sw1 = (state: any) => state.sw1;

/**
 * Конфигурация Bose
 * @param {any} state
 */
export const bose = (state: any) => state.bose;

/**
 * Конфигурация ДВС
 * @param {any} state
 */
export const engine = (state: any) => state.engine;

/**
 * Конфигурация расхода
 * @param {any} state
 */
export const fuel = (state: any) => state.fuel;

/**
 * Конфигурация уровня звука
 * @param {any} state
 */
export const volume = (state: any) => state.volume;
