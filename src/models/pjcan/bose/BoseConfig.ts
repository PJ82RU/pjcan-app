import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IBoseConfig } from "./IBoseConfig";
import { TCenterPoint } from "./TCenterPoint";

export const API_BOSE_CONFIG_EXEC = 0x60;
export const API_BOSE_CONFIG_EVENT = "BoseConfig";

export const API_BOSE_VIEW_EXEC = 0x63;
export const API_BOSE_VIEW_EVENT = "BoseView";

/** Модель параметров Bose */
export class BoseConfig extends BaseModel implements IBoseConfig
{
	static struct: any = {
		on: BluetoothStruct.bit(),
		audioPlt: BluetoothStruct.bit(),
		radioFM: BluetoothStruct.bit(),
		wow: BluetoothStruct.bit(),
		press: BluetoothStruct.bit(),
		mute: BluetoothStruct.bit(),
		start: BluetoothStruct.bit(),
		volume: BluetoothStruct.uint8(),
		start_volume: BluetoothStruct.uint8(),
		balance: BluetoothStruct.int8(),
		bass: BluetoothStruct.int8(),
		fade: BluetoothStruct.int8(),
		treble: BluetoothStruct.int8(),
		centerPoint: BluetoothStruct.uint8()
	};
	static size: number = 8;

	on = false;
	audioPlt = false;
	radioFM = false;
	wow = false;
	press = false;
	mute = false;
	start = false;
	volume = 0;
	start_volume = 0;
	balance = 0;
	bass = 0;
	fade = 0;
	treble = 0;
	centerPoint = TCenterPoint.CENTERPOINT_OFF;

	constructor(data?: DataView)
	{
		super(API_BOSE_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, BoseConfig.size, new BluetoothStruct(BoseConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, BoseConfig.size, new BluetoothStruct(BoseConfig.struct));
	}
}
