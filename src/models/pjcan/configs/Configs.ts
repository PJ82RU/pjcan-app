import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { Version } from "@/models/pjcan/version";
import { DeviceConfig } from "@/models/pjcan/device";
import { ButtonsConfig } from "../button";
import { CarConfig } from "../car";
import { TeyesConfig } from "../teyes";
import { VariableConfig } from "../variables/configs";
import { IConfigs } from "./IConfigs";
import { API_CONFIG_SIZE, StructConfigs } from "./StructConfigs";

export const API_CONFIG_EXEC = 1;
export const API_CONFIGS_EVENT = "Configs";

const struct = new BluetoothStruct(StructConfigs);

export class Configs extends BaseModel implements IConfigs
{
	version = new Version();
	device = new DeviceConfig();
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
		const result = this._set(this, API_CONFIG_EXEC, API_CONFIG_SIZE + 1, struct, buf);
		if (result)
		{
			this.device.isData = true;
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
		return this._get(this, API_CONFIG_EXEC, 1);
	}
}
