import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_SIZE_DEVICE_CONFIG, DeviceConfig } from "@/models/pjcan/device";
import { API_SIZE_BUTTONS_CONFIG, ButtonsConfig } from "../button";
import { API_SIZE_CAR_CONFIG, CarConfig } from "../car";
import { API_SIZE_TEYES_CONFIG, TeyesConfig } from "../teyes";
import { API_SIZE_VARIABLE_CONFIG, VariableConfig } from "../variables/configs";
import { IConfigs } from "./IConfigs";
import { StructConfigs } from "./StructConfigs";

export const API_EXEC_CONFIG = 1;
export const API_SIZE_CONFIG =
	API_SIZE_DEVICE_CONFIG + API_SIZE_BUTTONS_CONFIG + API_SIZE_CAR_CONFIG + API_SIZE_TEYES_CONFIG + API_SIZE_VARIABLE_CONFIG;

const struct = new BluetoothStruct(StructConfigs);

export class Configs extends BaseModel implements IConfigs
{
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
		const result = this._set(this, API_EXEC_CONFIG, API_SIZE_CONFIG + 1, struct, buf);
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
		return this._get(this, API_EXEC_CONFIG, 1);
	}
}
