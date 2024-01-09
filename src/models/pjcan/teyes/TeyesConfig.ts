import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITeyesConfig } from "./ITeyesConfig";
import { TProtocol } from "@/models/pjcan/teyes/TProtocol";

export const API_TEYES_CONFIG_EXEC = 0x50;
export const API_TEYES_CONFIG_EVENT = "TeyesConfig";

/** Модель параметров Teyes */
export class TeyesConfig extends BaseModel implements ITeyesConfig
{
	static struct: any = {
		receiveClock: BluetoothStruct.bit(),
		receiveButtons: BluetoothStruct.bit(),
		receiveText: BluetoothStruct.bit(),
		sendButton: BluetoothStruct.bit(),
		sendClimate: BluetoothStruct.bit(),
		sendDoors: BluetoothStruct.bit(),
		parseVolume: BluetoothStruct.bit(),
		lcdShow: BluetoothStruct.bit(),
		reverseUart: BluetoothStruct.bit(),
		protocol: BluetoothStruct.uint8()
	};
	static size: number = 3;

	receiveClock = false;
	receiveButtons = false;
	receiveText = false;
	sendButton = false;
	sendClimate = false;
	sendDoors = false;
	parseVolume = false;
	lcdShow = false;
	reverseUart = false;
	protocol = TProtocol.PROTOCOL_RAISE_HM_ND01;

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
		return this._set(this, API_TEYES_CONFIG_EXEC, TeyesConfig.size, new BluetoothStruct(TeyesConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request ? this._get(this, API_TEYES_CONFIG_EXEC) : this._get(this, API_TEYES_CONFIG_EXEC, TeyesConfig.size, new BluetoothStruct(TeyesConfig.struct));
	}
}
