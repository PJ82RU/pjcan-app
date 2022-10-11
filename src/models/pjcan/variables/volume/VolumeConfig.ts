import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IVolumeConfig, StructVolumeConfig } from "./index";

export const API_EXEC_VARIABLE_VOLUME = 200; // команда API
const STRUCT_LENGTH = 4; // длина данных API

const struct = new BluetoothStruct(StructVolumeConfig);

/** Модель конфигурации уровня звука */
export class VolumeConfig extends BaseModel implements IVolumeConfig
{
	mute = false;
	volume = 0;
	max = 63;

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
		return this._set(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_VOLUME, STRUCT_LENGTH, struct);
	}
}
