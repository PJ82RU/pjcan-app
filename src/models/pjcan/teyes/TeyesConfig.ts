import { BluetoothStruct, IBluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVersion } from "../version";
import { API_TEYES_CONFIG_SIZE, StructTeyesConfig } from "./StructTeyesConfig";
import { API_TEYES_CONFIG_SIZE_401, StructTeyesConfig_401 } from "./StructTeyesConfig_401";
import { ITeyesConfig } from "./ITeyesConfig";

export const API_TEYES_CONFIG_EXEC = 30;
export const API_TEYES_CONFIG_EVENT = "TeyesConfig";

/** Модель параметров Teyes */
export class TeyesConfig extends BaseModel implements ITeyesConfig
{
	receiveClock = false;
	receiveButtons = false;
	receiveText = false;
	sendButton = false;
	sendClimate = false;
	sendDoors = false;
	parseVolume = false;
	lcdShow = false;

	static struct: any;
	static bleStruct: IBluetoothStruct;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (!version || version.compareString("4.0.2") !== 1)
		{
			if (TeyesConfig.struct !== StructTeyesConfig)
			{
				TeyesConfig.struct = StructTeyesConfig;
				TeyesConfig.bleStruct = new BluetoothStruct(StructTeyesConfig);
				TeyesConfig.size = API_TEYES_CONFIG_SIZE;
			}
		}
		else
		{
			if (TeyesConfig.struct !== StructTeyesConfig_401)
			{
				TeyesConfig.struct = StructTeyesConfig_401;
				TeyesConfig.bleStruct = new BluetoothStruct(StructTeyesConfig_401);
				TeyesConfig.size = API_TEYES_CONFIG_SIZE_401;
			}
		}
	}

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
		return this._set(this, API_TEYES_CONFIG_EXEC, TeyesConfig.size + 1, TeyesConfig.bleStruct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_TEYES_CONFIG_EXEC, TeyesConfig.size + 1, TeyesConfig.bleStruct);
	}
}
