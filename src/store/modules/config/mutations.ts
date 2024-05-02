import canbus from "@/api/canbus";
import { TCarModel } from "@/models/pjcan/mazda";
import { TCenterPoint } from "@/models/pjcan/bose";
import { TProtocol } from "@/models/pjcan/teyes";
import { IButtonConfigItem } from "@/models/pjcan/buttons";

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
 * Mazda: CarModel
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
 * Mazda: LCD
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setMazdaLcd = (state: any, value: boolean) =>
{
	if (state.mazda.isData)
	{
		state.mazda.lcd = value;
		canbus.query(state.mazda);
	}
};
/**
 * Mazda: Logo
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setMazdaLogo = (state: any, value: string) =>
{
	if (state.mazda.isData)
	{
		state.mazda.logo = value;
		canbus.query(state.mazda);
	}
};
/**
 * Mazda: Hello
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setMazdaHello = (state: any, value: string) =>
{
	if (state.mazda.isData)
	{
		state.mazda.hello = value;
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
 * Teyes: Protocol
 * @param {any} state
 * @param {TProtocol} value Новое значение
 */
export const setTeyesProtocol = (state: any, value: TProtocol) =>
{
	if (state.teyes.isData)
	{
		state.teyes.protocol = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: ReverseUart
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesReverseUart = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.reverseUart = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: LcdShow
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesLcdShow = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.lcdShow = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: SendButton
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesSendButton = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.sendButton = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: SendClimate
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesSendClimate = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.sendClimate = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: SendDoors
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesSendDoors = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.sendDoors = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: ParseVolume
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesParseVolume = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.parseVolume = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: ReceiveClock
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesReceiveClock = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.receiveClock = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: ReceiveText
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesReceiveText = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.receiveText = value;
		canbus.query(state.teyes);
	}
};
/**
 * Teyes: ReceiveButtons
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setTeyesReceiveButtons = (state: any, value: boolean) =>
{
	if (state.teyes.isData)
	{
		state.teyes.receiveButtons = value;
		canbus.query(state.teyes);
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
 * SW1: Programming
 * @param {any} state
 * @param {boolean} value Новое значение
 */
export const setSW1Programming = (state: any, value: boolean) =>
{
	if (state.sw1.isData)
	{
		state.sw1.programming = value;
		canbus.query(state.sw1);
	}
};
/**
 * SW1: Programming
 * @param {any} state
 * @param {IButtonConfigItem} value Новое значение
 */
export const setSW1Item = (state: any, value: IButtonConfigItem) =>
{
	if (state.sw1.isData && state.sw1.setItem(value)) canbus.query(state.sw1);
};
/**
 * SW1: Resistance
 * @param {any} state
 * @param {any} value Новое значение
 */
export const setSW1Resistance = (state: any, { id, min, max }: { id: number, min: number, max: number }) =>
{
	if (state.sw1.isData)
	{
		const item: IButtonConfigItem | undefined = state.sw1.items.find((x: IButtonConfigItem) => x.id === id);
		if (item)
		{
			item.resistanceMin = min;
			item.resistanceMax = max;
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
	if (state.volume.isData)
	{
		state.volume.muteBose = value;
		canbus.query(state.volume);
	}
};
/**
 * Volume: Volume Bose
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setVolumeValueBose = (state: any, value: number) =>
{
	if (state.volume.isData)
	{
		state.volume.volumeBose = value;
		canbus.query(state.volume);
	}
};
