import canbus from "@/api/canbus";
import { TCarModel } from "@/models/pjcan/onboard";
import { TCenterPoint } from "@/models/pjcan/bose";
import { TProtocol } from "@/models/pjcan/head-unit";
import { ISW1ConfigButton } from "@/models/pjcan/buttons";

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
export const setOnboard = (state: any, data: DataView) =>
{
	state.onboard.set(data);
};

/**
 * Onboard: CarModel
 * @param {any} state
 * @param {TCarModel} value Новое значение
 */
export const setOnboardCarModel = (state: any, value: TCarModel) =>
{
	if (state.onboard.isData)
	{
		state.onboard.carModel = value;
		canbus.query(state.onboard);
		canbus.query(state.sw1, true);
	}
};
/**
 * Onboard: LCD
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setOnboardLcd = (state: any, value: boolean) =>
{
	if (state.onboard.isData)
	{
		state.onboard.lcd = value;
		canbus.query(state.onboard);
	}
};
/**
 * Onboard: Logo
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setOnboardLogo = (state: any, value: string) =>
{
	if (state.onboard.isData)
	{
		state.onboard.logo = value;
		canbus.query(state.onboard);
	}
};
/**
 * Onboard: Hello
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setOnboardHello = (state: any, value: string) =>
{
	if (state.onboard.isData)
	{
		state.onboard.hello = value;
		canbus.query(state.onboard);
	}
};

/**
 * Изменить конфигурацию Head Unit
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setHead = (state: any, data: DataView) =>
{
	state.head.set(data);
};
/**
 * Head Unit: Protocol
 * @param {any} state
 * @param {TProtocol} value Новое значение
 */
export const setHeadProtocol = (state: any, value: TProtocol) =>
{
	if (state.head.isData)
	{
		state.head.protocol = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: ReverseUart
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadReverseUart = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.reverseUart = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: SendButton
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadSendButton = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.sendButton = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: SendClimate
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadSendClimate = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.sendClimate = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: SendDoors
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadSendDoors = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.sendDoors = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: SendOnboard
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadSendOnboard = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.sendOnboard = value;
		canbus.query(state.head);
	}
};
/**
 * Head Unit: ShowTextOfLogo
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setHeadShowTextOfLogo = (state: any, value: boolean) =>
{
	if (state.head.isData)
	{
		state.head.showTextOfLogo = value;
		canbus.query(state.head);
	}
};

/**
 * Изменить конфигурацию кнопок sw1
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setSW1 = (state: any, data: DataView) =>
{
	state.sw1.set(data);
};
/**
 * SW1: SetButton
 * @param {any} state
 * @param {ISW1ConfigButton} value Новое значение
 */
export const setSW1Button = (state: any, value: ISW1ConfigButton): void =>
{
	if (state.sw1.isData && state.sw1.setButton(value)) canbus.query(state.sw1);
};
/**
 * SW1: Изменить список сопротивлений кнопок
 * @param {any} state
 * @param {number[]} list Новое значение
 */
export const setSW1ListOfResistance = (state: any, list: number[]): void =>
{
	if (state.sw1.isData && state.sw1.buttons.length === list.length)
	{
		for (let i: number = 0; i < list.length; i++) state.sw1.buttons[i].resistanceTo = list[i];
		canbus.query(state.sw1);
	}
};
/**
 * SW1: Изменить расширенный режим кнопки
 * @param {any} state
 * @param {any} value Новое значение
 */
export const setSW1Extended = (state: any, { id, value }: { id: number, value: boolean }): void =>
{
	if (state.sw1.isData)
	{
		const button: ISW1ConfigButton | undefined = state.sw1.buttons.find((x: ISW1ConfigButton) => x.id === id);
		if (button)
		{
			button.extended = value;
			canbus.query(state.sw1);
		}
	}
};
/**
 * SW1: Изменить функцию кнопки
 * @param {any} state
 * @param {any} value Новое значение
 */
export const setSW1Exec = (state: any, { id, value }: { id: number, value: number[] }): void =>
{
	if (state.sw1.isData)
	{
		const button: ISW1ConfigButton | undefined = state.sw1.buttons.find((x: ISW1ConfigButton) => x.id === id);
		if (button)
		{
			button.exec = value;
			canbus.query(state.sw1);
		}
	}
};
/**
 * SW1: Изменить функцию кнопки расширенного режима
 * @param {any} state
 * @param {any} value Новое значение
 */
export const setSW1ExecMode = (state: any, { id, value }: { id: number, value: number[] }): void =>
{
	if (state.sw1.isData)
	{
		const button: ISW1ConfigButton | undefined = state.sw1.buttons.find((x: ISW1ConfigButton) => x.id === id);
		if (button)
		{
			button.execMode = value;
			canbus.query(state.sw1);
		}
	}
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
	if (state.bose.isData)
	{
		state.bose.on = value;
		canbus.query(state.bose);
	}
};
/**
 * Выкл/вкл звук Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseMute = (state: any, value: boolean) =>
{
	if (state.bose.isData)
	{
		state.bose.mute = value;
		canbus.query(state.bose);
	}
};
/**
 * Уровень звука Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseVolume = (state: any, value: number) =>
{
	if (state.bose.isData)
	{
		state.bose.volume = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: AudioPilot
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseAudioPlt = (state: any, value: boolean) =>
{
	if (state.bose.isData)
	{
		state.bose.audioPlt = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: RadioFM
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseRadioFM = (state: any, value: boolean) =>
{
	if (state.bose.isData)
	{
		state.bose.radioFM = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Звук wow
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseWow = (state: any, value: boolean) =>
{
	if (state.bose.isData)
	{
		state.bose.wow = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Balance
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseBalance = (state: any, value: number) =>
{
	if (state.bose.isData)
	{
		state.bose.balance = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Bass
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseBass = (state: any, value: number) =>
{
	if (state.bose.isData)
	{
		state.bose.bass = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Fade
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseFade = (state: any, value: number) =>
{
	if (state.bose.isData)
	{
		state.bose.fade = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Treble
 * @param {any} state
 * @param {number} value Значение
 */
export const setBoseTreble = (state: any, value: number) =>
{
	if (state.bose.isData)
	{
		state.bose.treble = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: CenterPoint
 * @param {any} state
 * @param {TCenterPoint} value Значение
 */
export const setBoseCenterPoint = (state: any, value: TCenterPoint) =>
{
	if (state.bose.isData)
	{
		state.bose.centerPoint = value;
		canbus.query(state.bose);
	}
};
/**
 * Bose: Volume Start
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setBoseVolumeStart = (state: any, { enabled, level }: { enabled: boolean; level: number }) =>
{
	if (state.bose.isData)
	{
		state.bose.start = enabled;
		state.bose.start_volume = level;
		canbus.query(state.bose);
	}
};

/**
 * Изменить конфигурацию дверей
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDoors = (state: any, data: DataView) =>
{
	state.doors.set(data);
};
/**
 * Doors: FrontReverse, BackReverse, FrontBackReverse
 * @param {any} state
 * @param {any} value Значение
 */
export const setDoorsConfig = (
	state: any,
	{
		frontReverse,
		backReverse,
		frontBackReverse
	}: { frontReverse: boolean; backReverse: boolean; frontBackReverse: boolean }
) =>
{
	if (state.doors.isData)
	{
		state.doors.frontReverse = frontReverse;
		state.doors.backReverse = backReverse;
		state.doors.frontBackReverse = frontBackReverse;
		canbus.query(state.doors);
	}
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
 * Изменить значения конфигурации ДВС
 * @param {any} state
 * @param {IEngineConfig} value Новые значения
 */
export const setEngineConfig = (
	state: any,
	{ showDays, totalWorktime, totalCountRPM }: { showDays: boolean; totalWorktime: BigInt; totalCountRPM: BigInt }
) =>
{
	if (state.engine.isData)
	{
		state.engine.showDays = showDays;
		state.engine.totalWorktime = totalWorktime;
		state.engine.totalCountRPM = totalCountRPM;
		canbus.query(state.engine);
	}
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
 * Fuel: Ratio
 * @param {any} state
 * @param {number} value Новое значение
 */
export const setFuelRatio = (state: any, value: number) =>
{
	if (state.fuel.isData)
	{
		state.fuel.ratio = value;
		canbus.query(state.fuel);
	}
};

/**
 * Изменить конфигурацию даты и времени
 * @param {any} state
 * @param {DataView} data Данные
 */
export const setDatetime = (state: any, data: DataView) =>
{
	state.datetime.set(data);
};
/**
 * Синхронизация даты и времени
 * @param {any} state
 */
export const synchDatetime = (state: any) =>
{
	state.datetime.updateUnixtime();
	canbus.query(state.datetime);
};
/**
 * Datetime: ShowDate
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowDate = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showDate = value;
		synchDatetime(state);
	}
};
/**
 * Datetime: ShowTime
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowTime = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showTime = value;
		synchDatetime(state);
	}
};
/**
 * Datetime: ShowDayWeek
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowDayWeek = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showDayWeek = value;
		synchDatetime(state);
	}
};
/**
 * Datetime: ShowDateAndDayWeek
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowDateAndDayWeek = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showDateAndDayWeek = value;
		synchDatetime(state);
	}
};
/**
 * Datetime: ShowTimeAndDayWeek
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowTimeAndDayWeek = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showTimeAndDayWeek = value;
		synchDatetime(state);
	}
};
/**
 * Datetime: ShowFullDatetime
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setDatetimeShowFullDatetime = (state: any, value: boolean) =>
{
	if (state.datetime.isData)
	{
		state.datetime.showFullDatetime = value;
		synchDatetime(state);
	}
};
