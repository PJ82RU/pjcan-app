import canbus from "@/api/canbus";
import { TCarModel } from "@/models/pjcan/mazda";
import { TCenterPoint } from "@/models/pjcan/bose";

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
 * Включить/выключить Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseEnabled = (state: any, value: boolean) =>
{
	state.bose.on = value;
	canbus.query(state.bose);
};
/**
 * Bose: AudioPilot
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseAudioPlt = (state: any, value: boolean) =>
{
	state.bose.audioPlt = value;
	canbus.query(state.bose);
};
/**
 * Bose: RadioFM
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseRadioFM = (state: any, value: boolean) =>
{
	state.bose.radioFM = value;
	canbus.query(state.bose);
};
/**
 * Bose: Звук wow
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseWow = (state: any, value: boolean) =>
{
	state.bose.wow = value;
	canbus.query(state.bose);
};
/**
 * Bose: Balance
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseBalance = (state: any, value: number) =>
{
	state.bose.balance = value;
	canbus.query(state.bose);
};
/**
 * Bose: Bass
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseBass = (state: any, value: number) =>
{
	state.bose.bass = value;
	canbus.query(state.bose);
};
/**
 * Bose: Fade
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseFade = (state: any, value: number) =>
{
	state.bose.fade = value;
	canbus.query(state.bose);
};
/**
 * Bose: Treble
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseTreble = (state: any, value: number) =>
{
	state.bose.treble = value;
	canbus.query(state.bose);
};
/**
 * Bose: CenterPoint
 * @param {any} state
 * @param {TCenterPoint} value Значение
 */
export const setBoseCenterPoint = (state: any, value: TCenterPoint) =>
{
	state.bose.centerPoint = value;
	canbus.query(state.bose);
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
/**
 * Volume: Mute Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setVolumeMuteBose = (state: any, value: boolean) =>
{
	state.volume.muteBose = value;
	canbus.query(state.volume);
};
/**
 * Volume: Volume Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setVolumeValueBose = (state: any, value: number) =>
{
	state.volume.volumeBose = value;
	canbus.query(state.volume);
};
