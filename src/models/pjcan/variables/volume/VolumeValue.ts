import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IVolumeValue } from "./IVolumeValue";

export const API_VARIABLE_VOLUME_EXEC = 200;
export const API_VARIABLE_VOLUME_EVENT = "VariableVolumeValue";

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
			API_VARIABLE_VOLUME_EXEC,
			VolumeValue.size + 1,
			new BluetoothStruct(VolumeValue.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VOLUME_EXEC, VolumeValue.size + 1, new BluetoothStruct(VolumeValue.struct));
	}
}
