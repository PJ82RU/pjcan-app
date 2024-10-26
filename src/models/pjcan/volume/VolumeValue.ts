import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVolumeValue } from "./IVolumeValue";

export const API_VOLUME_VALUE_EXEC = 0xe1;
export const API_VOLUME_VALUE_EVENT = "VolumeConfig";

export const API_VOLUME_VIEW_EXEC = 0xe3;
export const API_VOLUME_VIEW_EVENT = "VolumeView";

/** Модель конфигурации уровня звука */
export class VolumeValue extends BaseModel implements IVolumeValue
{
	static struct: any = {
		mute: BluetoothStruct.bit(),
		volume: BluetoothStruct.uint8()
	};
	static size: number = 2;

	mute = false;
	volume = 0;

	constructor(data?: DataView)
	{
		super(API_VOLUME_VALUE_EXEC, true);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, VolumeValue.size, new BluetoothStruct(VolumeValue.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, VolumeValue.size, new BluetoothStruct(VolumeValue.struct));
	}
}
