import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructVolumeValue } from "./StructVolumeValue";
import { IVolumeValue } from "./IVolumeValue";

export const API_VARIABLE_VOLUME_EXEC = 200;
export const API_SIZE_VARIABLE_VOLUME = 2;

const struct = new BluetoothStruct(StructVolumeValue);

/** Модель конфигурации уровня звука */
export class VolumeValue extends BaseModel implements IVolumeValue
{
	mute = false;
	volume = 0;

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_VOLUME_EXEC, API_SIZE_VARIABLE_VOLUME + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VOLUME_EXEC, API_SIZE_VARIABLE_VOLUME + 1, struct);
	}
}
