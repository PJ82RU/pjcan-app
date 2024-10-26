import canbus from "@/api/canbus";
import { TViewType, ViewConfig } from "@/models/pjcan/view";

/**
 * Записать значения отображения
 * @param {any} state
 * @param {IViewConfig} value
 */
export const setView = (
	state: any,
	{
		exec,
		enabled,
		type,
		time,
		delay
	}: { exec: number; enabled: boolean; type: TViewType; time: number; delay: number }
) =>
{
	const res = new ViewConfig(exec);
	res.enabled = enabled;
	res.type = type;
	res.time = time;
	res.delay = delay;
	canbus.query(res);
};

/**
 * Записать значения отображения времени работы устройства
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setWorktime = (state: any, data: DataView) =>
{
	state.worktime.set(data);
};

/**
 * Записать значения отображения напряжения бортовой сети
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setVoltmeter = (state: any, data: DataView) =>
{
	state.voltmeter.set(data);
};

/**
 * Записать значения отображения автомобиля
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setOnboard = (state: any, data: DataView) =>
{
	state.onboard.set(data);
};

/**
 * Записать значения отображения текста ГУ
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setHeadText = (state: any, data: DataView) =>
{
	state.headText.set(data);
};

/**
 * Записать значения отображения Bose
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setBose = (state: any, data: DataView) =>
{
	state.bose.set(data);
};

/**
 * Записать значения отображения климата
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setClimate = (state: any, data: DataView) =>
{
	state.climate.set(data);
};

/**
 * Записать значения отображения дверей
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDoors = (state: any, data: DataView) =>
{
	state.doors.set(data);
};

/**
 * Записать значения отображения ДВС
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setEngine = (state: any, data: DataView) =>
{
	state.engine.set(data);
};

/**
 * Записать значения отображения расхода
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setFuel = (state: any, data: DataView) =>
{
	state.fuel.set(data);
};

/**
 * Записать значения отображения движения
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setMovement = (state: any, data: DataView) =>
{
	state.movement.set(data);
};

/**
 * Записать значения отображения датчиков
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setSensors = (state: any, data: DataView) =>
{
	state.sensors.set(data);
};

/**
 * Записать значения отображения температуры
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setTemperature = (state: any, data: DataView) =>
{
	state.temperature.set(data);
};

/**
 * Записать значения отображения даты и времени
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDatetime = (state: any, data: DataView) =>
{
	state.datetime.set(data);
};
