import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDoorsConfig } from "./IDoorsConfig";

export const API_DOORS_CONFIG_EXEC = 0x80;
export const API_DOORS_CONFIG_EVENT = "DoorsConfig";

export const API_DOORS_VIEW_EXEC = 0x83;
export const API_DOORS_VIEW_EVENT = "DoorsView";

export class DoorsConfig extends BaseModel implements IDoorsConfig
{
	static struct: any = {
		frontReverse: BluetoothStruct.bit(),
		backReverse: BluetoothStruct.bit(),
		frontBackReverse: BluetoothStruct.bit()
	};
	static size: number = 1;

	frontReverse = false;
	backReverse = false;
	frontBackReverse = false;

	constructor(data?: DataView)
	{
		super(API_DOORS_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DoorsConfig.size, new BluetoothStruct(DoorsConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, DoorsConfig.size, new BluetoothStruct(DoorsConfig.struct));
	}
}
