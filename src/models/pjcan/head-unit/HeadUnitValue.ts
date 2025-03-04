import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IHeadUnitValue } from "./IHeadUnitValue";
import { IHeadUnitClock } from "./IHeadUnitClock";
import { IVersion } from "@/models/pjcan/version";

export const API_HEAD_UNIT_VALUE_EXEC = 0x51;
export const API_HEAD_UNIT_VALUE_EVENT = "HeadUnitValue";

export const API_HEAD_UNIT_VIEW_EXEC = 0x53;
export const API_HEAD_UNIT_VIEW_EVENT = "HeadUnitView";

/** Модель значения текста Head Unit */
export class HeadUnitValue extends BaseModel implements IHeadUnitValue
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (version && version.major >= 4 && version.minor >= 1 && version.build >= 5)
		{
			HeadUnitValue.struct = {
				clock: BluetoothStruct.struct({
					hour: BluetoothStruct.uint8(),
					minutes: BluetoothStruct.uint8(),
					seconds: BluetoothStruct.uint8()
				}),
				button: BluetoothStruct.uint8(),
				text: BluetoothStruct.char(13),
				ico_af: BluetoothStruct.bit(),
				ico_rdm: BluetoothStruct.bit(),
				ico_rpt: BluetoothStruct.bit(),
				ico_cd_in: BluetoothStruct.bit(),
				char_s4: BluetoothStruct.bit(),
				char_s3: BluetoothStruct.bit(),
				char_s2: BluetoothStruct.bit(),
				char_s1: BluetoothStruct.bit()
			};
			HeadUnitValue.size = 18;
		}
		else
		{
			HeadUnitValue.struct = {
				clock: BluetoothStruct.struct({
					hour: BluetoothStruct.uint8(),
					minutes: BluetoothStruct.uint8(),
					seconds: BluetoothStruct.uint8()
				}),
				button: BluetoothStruct.uint8(),
				text: BluetoothStruct.char(13)
			};
			HeadUnitValue.size = 17;
		}
	}

	clock = { hour: 0, minutes: 0, seconds: 0 } as IHeadUnitClock;
	button = 0;
	text = "";
	ico_af = false;
	ico_rdm = false;
	ico_rpt = false;
	ico_cd_in = false;
	char_s4 = false;
	char_s3 = false;
	char_s2 = false;
	char_s1 = false;

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
