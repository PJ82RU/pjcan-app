/**
 * Записать значения кнопки sw1
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setSW1 = (state: any, data: DataView) =>
{
	state.sw1.set(data);
};

/**
 * Записать значения климата
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setClimate = (state: any, data: DataView) =>
{
	state.climate.set(data);
};

/**
 * Записать значения устройства
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDevice = (state: any, data: DataView) =>
{
	state.device.set(data);
};

/**
 * Записать значения дверей
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDoors = (state: any, data: DataView) =>
{
	state.doors.set(data);
};

/**
 * Записать значения ДВС
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setEngine = (state: any, data: DataView) =>
{
	state.engine.set(data);
};

/**
 * Записать значения расхода
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setFuel = (state: any, data: DataView) =>
{
	state.fuel.set(data);
};

/**
 * Записать значения движения
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setMovement = (state: any, data: DataView) =>
{
	state.movement.set(data);
};

/**
 * Записать значения датчиков
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setSensors = (state: any, data: DataView) =>
{
	state.sensors.set(data);
};

/**
 * Записать значения температуры
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setTemperature = (state: any, data: DataView) =>
{
	state.temperature.set(data);
};
