import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { Version } from "../version";
import { ButtonsConfig } from "../button";
import { CarConfig } from "../car";
import { TeyesConfig } from "../teyes";
import { VariableConfig } from "../variables/configs";
import { IConfigs } from "./IConfigs";
import { StructConfigs } from "./StructConfigs";

export const API_EXEC_CONFIG = 1;
const STRUCT_LENGTH = 138;

const struct = new BluetoothStruct(StructConfigs);

export class Configs extends BaseModel implements IConfigs
{
	version = new Version();
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
		const result = this._set(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct, buf);
		if (result)
		{
			this.buttons.isData = true;
			this.car.isData = true;
			this.teyes.isData = true;
			this.variable.bose.isData = true;
			this.variable.engine.isData = true;
			this.variable.fuel.isData = true;
			this.variable.volume.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_CONFIG, 1);
	}
}
