import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { StructVolumeConfig } from "./StructVolumeConfig";
import { IVolumeConfig } from "./IVolumeConfig";

export const API_VARIABLE_VOLUME_CONFIG_EXEC = 201;
export const API_SIZE_VARIABLE_VOLUME_CONFIG = 3;

const struct = new BluetoothStruct(StructVolumeConfig);

/** Модель конфигурации уровня звука */
export class VolumeConfig extends BaseModel implements IVolumeConfig
{
	mute = false;
	volume = 0;
	max = 0;

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
		return this._set(this, API_VARIABLE_VOLUME_CONFIG_EXEC, API_SIZE_VARIABLE_VOLUME_CONFIG + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VOLUME_CONFIG_EXEC, API_SIZE_VARIABLE_VOLUME_CONFIG + 1, struct);
	}
}
