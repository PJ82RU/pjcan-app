import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVersion } from "../version";
import { ITeyesConfig } from "./ITeyesConfig";

export const API_TEYES_CONFIG_EXEC = 30;
export const API_TEYES_CONFIG_EVENT = "TeyesConfig";

/** Модель параметров Teyes */
export class TeyesConfig extends BaseModel implements ITeyesConfig
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (!version || version.compareString("4.1") !== 1)
		{
			TeyesConfig.struct = {
				receiveClock: BluetoothStruct.bit(),
				receiveButtons: BluetoothStruct.bit(),
				receiveText: BluetoothStruct.bit(),
				sendButton: BluetoothStruct.bit(),
				sendClimate: BluetoothStruct.bit(),
				sendDoors: BluetoothStruct.bit(),
				parseVolume: BluetoothStruct.bit(),
				lcdShow: BluetoothStruct.bit(),
				reverseUart: BluetoothStruct.bit(),
				uartBaud: BluetoothStruct.uint8()
			};
			TeyesConfig.size = 3;
		}
		else if (version.compareString("4.0.2") !== 1)
		{
			TeyesConfig.struct = {
				receiveClock: BluetoothStruct.bit(),
				receiveButtons: BluetoothStruct.bit(),
				receiveText: BluetoothStruct.bit(),
				sendButton: BluetoothStruct.bit(),
				sendClimate: BluetoothStruct.bit(),
				sendDoors: BluetoothStruct.bit(),
				parseVolume: BluetoothStruct.bit(),
				lcdShow: BluetoothStruct.bit(),
				uartBaud: BluetoothStruct.uint8()
			};
			TeyesConfig.size = 2;
		}
		else
		{
			TeyesConfig.struct = {
				receiveClock: BluetoothStruct.bit(),
				receiveButtons: BluetoothStruct.bit(),
				receiveText: BluetoothStruct.bit(),
				sendButton: BluetoothStruct.bit(),
				sendClimate: BluetoothStruct.bit(),
				sendDoors: BluetoothStruct.bit(),
				parseVolume: BluetoothStruct.bit(),
				lcdShow: BluetoothStruct.bit()
			};
			TeyesConfig.size = 1;
		}
	}

	receiveClock = false;
	receiveButtons = false;
	receiveText = false;
	sendButton = false;
	sendClimate = false;
	sendDoors = false;
	parseVolume = false;
	lcdShow = false;
	reverseUart = false;

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_TEYES_CONFIG_EXEC,
			TeyesConfig.size + 1,
			new BluetoothStruct(TeyesConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_CONFIG_EXEC, TeyesConfig.size + 1, new BluetoothStruct(TeyesConfig.struct));
	}
}
