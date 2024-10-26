import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IHeadUnitConfig } from "./IHeadUnitConfig";
import { TProtocol } from "./TProtocol";

export const API_HEAD_UNIT_CONFIG_EXEC = 0x50;
export const API_HEAD_UNIT_CONFIG_EVENT = "HeadUnitConfig";

/** Модель параметров Head Unit */
export class HeadUnitConfig extends BaseModel implements IHeadUnitConfig
{
	static struct: any = {
		showTextOfLogo: BluetoothStruct.bit(),
		sendButton: BluetoothStruct.bit(),
		sendClimate: BluetoothStruct.bit(),
		sendDoors: BluetoothStruct.bit(),
		sendOnboard: BluetoothStruct.bit(),
		reverseUart: BluetoothStruct.bit(),
		protocol: BluetoothStruct.uint8()
	};
	static size: number = 2;

	showTextOfLogo = false;
	sendButton = false;
	sendClimate = false;
	sendDoors = false;
	sendOnboard = false;
	reverseUart = false;
	protocol = TProtocol.PROTOCOL_RAISE_HM_ND03;

	constructor(data?: DataView)
	{
		super(API_HEAD_UNIT_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, HeadUnitConfig.size, new BluetoothStruct(HeadUnitConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, HeadUnitConfig.size, new BluetoothStruct(HeadUnitConfig.struct));
	}
}
