import moment from "moment/moment";
import canbus from "@/api/canbus";
import { toHex } from "@/utils/conversion";
import { IDeviceScannerFrame } from "@/models/pjcan/device/IDeviceScannerFrame";
import { IScanCanRow } from "@/models/interfaces/IScanCanRow";

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

/**
 * Записать значения сканера
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setScanner = (state: any, data: DataView) =>
{
	state.scanner.set(data);
	setScannerBuffer(state, false);
};

/**
 * Записать значения сканирования в буфер
 * @param {any} state
 * @param {boolean} free Очистить данные перед записью
 */
export const setScannerBuffer = (state: any, free: boolean) =>
{
	if (free) state.scannerBuffer = [] as IScanCanRow[];
	if (state.scanner.isData && state.scanner.count > 0)
	{
		state.scannerBuffer.push(
			...state.scanner.frames.slice(0, state.scanner.count).map((x: IDeviceScannerFrame) =>
			{
				const mm = moment.duration(Number(x.timestamp), "milliseconds");
				const mm_time = {
					hours: mm.hours(),
					minutes: mm.minutes(),
					seconds: mm.seconds(),
					milliseconds: mm.milliseconds()
				};
				return {
					datetime: moment().format("YYYY.MM.DD HH:mm:ss"),
					time:
							mm_time.hours + ":" +
							(mm_time.minutes < 10 ? "0" : "") + mm.minutes() + ":" +
							(mm_time.seconds < 10 ? "0" : "") + mm.seconds() + "." +
							(mm_time.milliseconds < 10 ? "00" : mm_time.milliseconds < 100 ? "0" : "") + mm.milliseconds(),
					hexId: "0x" + toHex(x.id),
					hexData: "0x" + x.data.map((x) => toHex(x)).join(":")
				} as IScanCanRow;
			})
		);
	}
};

/**
 * Записать заголовок в буфер
 * @param {any} state
 * @param {string} value Текст
 */
export const setScannerBufferTitle = (state: any, value: string) =>
{
	state.scannerBuffer.push({
		datetime: value,
		time: "",
		hexId: "",
		hexData: ""
	} as IScanCanRow);
};

/**
 * Записать значения теста
 * @param {any} state
 * @param {string} value Тест
 */
export const setTestText = (state: any, value: string) =>
{
	state.test.text = value;
	canbus.query(state.test);
};
