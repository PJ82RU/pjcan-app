import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IVolumeConfig } from "./IVolumeConfig";

export const API_VARIABLE_VOLUME_CONFIG_EXEC = 201;
export const API_VARIABLE_VOLUME_CONFIG_EVENT = "VariableVolumeConfig";

/** Модель конфигурации уровня звука */
export class VolumeConfig extends BaseModel implements IVolumeConfig
{
	static struct: any = {
		mute: BluetoothStruct.bit(),
		volume: BluetoothStruct.uint8(),
		max: BluetoothStruct.uint8()
	};
	static size: number = 3;

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_VOLUME_CONFIG_EXEC,
			VolumeConfig.size + 1,
			new BluetoothStruct(VolumeConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_VOLUME_CONFIG_EXEC,
			VolumeConfig.size + 1,
			new BluetoothStruct(VolumeConfig.struct)
		);
	}
}
