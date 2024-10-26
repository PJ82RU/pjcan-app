import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IHeadUnitValue } from "./IHeadUnitValue";
import { IHeadUnitClock } from "@/models/pjcan/head-unit/IHeadUnitClock";

export const API_HEAD_UNIT_VALUE_EXEC = 0x51;
export const API_HEAD_UNIT_VALUE_EVENT = "HeadUnitValue";

export const API_HEAD_UNIT_VIEW_EXEC = 0x53;
export const API_HEAD_UNIT_VIEW_EVENT = "HeadUnitView";

/** Модель значения текста Head Unit */
export class HeadUnitValue extends BaseModel implements IHeadUnitValue
{
	static struct: any = {
		clock: BluetoothStruct.struct(
			{
				hour: BluetoothStruct.uint8(),
				minutes: BluetoothStruct.uint8(),
				seconds: BluetoothStruct.uint8()
			}),
		button: BluetoothStruct.uint8(),
		text: BluetoothStruct.char(13)
	};
	static size: number = 17;

	clock = { hour: 0, minutes: 0, seconds: 0 } as IHeadUnitClock;
	button = 0;
	text = "";

	constructor(data?: DataView)
	{
		super(API_HEAD_UNIT_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, HeadUnitValue.size, new BluetoothStruct(HeadUnitValue.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, HeadUnitValue.size, new BluetoothStruct(HeadUnitValue.struct));
	}
}
