import { TCarModel } from "@/models/pjcan/onboard";

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
 * Конфигурация устройства
 * @param {any} state
 */
export const device = (state: any) => state.device;

/**
 * Конфигурация автомобиля
 * @param {any} state
 */
export const onboard = (state: any) => state.onboard;

/**
 * Модель автомобиля
 * @param {any} state
 */
export const carModel = (state: any) => (state.onboard.isData ? state.onboard.carModel : TCarModel.CAR_MODEL_UNKNOWN);

/**
 * Конфигурация Head Unit
 * @param {any} state
 */
export const head = (state: any) => state.head;

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
 * Конфигурация дверей
 * @param {any} state
 */
export const doors = (state: any) => state.doors;

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

/**
 * Конфигурация даты и времени
 * @param {any} state
 */
export const datetime = (state: any) => state.datetime;
