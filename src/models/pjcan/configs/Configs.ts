import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "@/models/pjcan/base";
import { ButtonsConfig } from "../button";
import { CarConfig } from "../car";
import { TeyesConfig } from "../teyes";
import { VariableConfig } from "../variables/VariablesConfig";
import { IConfigs, StructConfigs } from "./index";

export const API_EXEC_CONFIG = 1;
const STRUCT_LENGTH = 133; // временно!!! должно быть 134, нужно исправить в прошивке устройства!

const struct = new BluetoothStruct(StructConfigs);

export class Configs extends BaseModel implements IConfigs
{
	buttons = new ButtonsConfig();
	car = new CarConfig();
	teyes = new TeyesConfig();
	variable = new VariableConfig();

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
		return this._set(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_CONFIG, 1);
	}
}
