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
): void =>
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
export const setWorktime = (state: any, data: DataView): void =>
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
export const setEngineEnabled = (state: any, data: DataView) =>
{
	state.engine.enabled.set(data);
};
export const setEngineTotalWorktime = (state: any, data: DataView) =>
{
	state.engine.totalWorktime.set(data);
};
export const setEngineTotalCountRPM = (state: any, data: DataView) =>
{
	state.engine.totalCountRPM.set(data);
};
export const setEngineCoolant = (state: any, data: DataView) =>
{
	state.engine.coolant.set(data);
};
export const setEngineRPM = (state: any, data: DataView) =>
{
	state.engine.rpm.set(data);
};
export const setEngineLoad = (state: any, data: DataView) =>
{
	state.engine.load.set(data);
};
export const setEngineThrottle = (state: any, data: DataView) =>
{
	state.engine.throttle.set(data);
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
export const setFuelCurrent = (state: any, data: DataView) =>
{
	state.fuel.current.set(data);
};
export const setFuelAVG = (state: any, data: DataView) =>
{
	state.fuel.avg.set(data);
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
export const setMovementSpeed = (state: any, data: DataView) =>
{
	state.movement.speed.set(data);
};
export const setMovementSpeedAVG = (state: any, data: DataView) =>
{
	state.movement.speedAVG.set(data);
};
export const setMovementRestWay = (state: any, data: DataView) =>
{
	state.movement.restWay.set(data);
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
export const setSensorsHandbrake = (state: any, data: DataView) =>
{
	state.sensors.handbrake.set(data);
};
export const setSensorsReverse = (state: any, data: DataView) =>
{
	state.sensors.reverse.set(data);
};
export const setSensorsSeatbelt = (state: any, data: DataView) =>
{
	state.sensors.seatbelt.set(data);
};
export const setSensorsTurnSignal = (state: any, data: DataView) =>
{
	state.sensors.turnSignal.set(data);
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
