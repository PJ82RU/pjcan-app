import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IVolumeConfig } from "./IVolumeConfig";
import { IVersion } from "@/models/pjcan/version";
import { EngineValue } from "@/models/pjcan/variables/engine";

export const API_VARIABLE_VOLUME_CONFIG_EXEC = 201;
export const API_VARIABLE_VOLUME_CONFIG_EVENT = "VariableVolumeConfig";

/** Модель конфигурации уровня звука */
export class VolumeConfig extends BaseModel implements IVolumeConfig
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		EngineValue.update(version);

		if (!version || version.compareString("4.0.3") !== 1)
		{
			VolumeConfig.struct = {
				mute: BluetoothStruct.bit(),
				muteBose: BluetoothStruct.bit(),
				volume: BluetoothStruct.uint8(),
				volumeBose: BluetoothStruct.uint8()
			};
			VolumeConfig.size = 3;
		}
		else
		{
			VolumeConfig.struct = {
				mute: BluetoothStruct.bit(),
				volume: BluetoothStruct.uint8(),
				max: BluetoothStruct.uint8()
			};
			VolumeConfig.size = 3;
		}
	}

	mute = false;
	muteBose = false;
	volume = 0;
	volumeBose = 0;
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
