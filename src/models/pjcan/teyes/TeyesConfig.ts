import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base/BaseModel";
import { StructTeyesConfig } from "./StructTeyesConfig";
import { ITeyesConfig } from "./ITeyesConfig";

export const API_EXEC_TEYES_CONFIG = 30; // команда API
const STRUCT_LENGTH = 2; // длина данных API

const struct = new BluetoothStruct(StructTeyesConfig);

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
		return this._set(this, API_EXEC_TEYES_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_TEYES_CONFIG, STRUCT_LENGTH, struct);
	}
}
