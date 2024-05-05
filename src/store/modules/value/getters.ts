/**
 * Значения кнопки sw1
 * @param {any} state
 */
export const sw1 = (state: any) => state.sw1;

/**
 * Значения климата
 * @param {any} state
 */
export const climate = (state: any) => state.climate;

/**
 * Значения устройства
 * @param {any} state
 */
export const device = (state: any) => state.device;

/**
 * Значения дверей
 * @param {any} state
 */
export const doors = (state: any) => state.doors;

/**
 * Значения ДВС
 * @param {any} state
 */
export const engine = (state: any) => state.engine;

/**
 * Значения расхода
 * @param {any} state
 */
export const fuel = (state: any) => state.fuel;

/**
 * Значения движения
 * @param {any} state
 */
export const movement = (state: any) => state.movement;

/**
 * Значения датчиков
 * @param {any} state
 */
export const sensors = (state: any) => state.sensors;

/**
 * Значения температуры
 * @param {any} state
 */
export const temperature = (state: any) => state.temperature;

/**
 * Значения сканера
 * @param {any} state
 */
export const scanner = (state: any) => state.scanner;

/**
 * Значения буфера сканера
 * @param {any} state
 */
export const scannerBuffer = (state: any) => state.scannerBuffer;

/**
 * Чтение 30-ти элементов буфера сканера
 * @param {any} state
 */
export const scannerBufferRead = (state: any) => state.scannerBuffer.splice(0, state.scannerBufferReadNumber);

/**
 * Значение теста
 * @param {any} state
 */
export const test = (state: any) => state.test;
