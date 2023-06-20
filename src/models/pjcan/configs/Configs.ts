import { BluetoothStruct, IBluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_VERSION_SIZE, StructVersion, Version } from "../version";
import { API_DEVICE_CONFIG_SIZE, DeviceConfig, StructDeviceConfig } from "../device";
import { API_BUTTONS_CONFIG_SIZE, ButtonsConfig, StructButtonsConfig } from "../button";
import { API_CAR_CONFIG_SIZE, CarConfig, StructCarConfig } from "../car";
import { TeyesConfig } from "../teyes";
import { API_VARIABLE_CONFIGS_SIZE, StructVariableConfigs, VariableConfig } from "../variables/configs";
import { IConfigs } from "./IConfigs";

export const API_CONFIG_EXEC = 1;
export const API_CONFIGS_EVENT = "Configs";

export class Configs extends BaseModel implements IConfigs
{
	version = new Version();
	device = new DeviceConfig();
	buttons = new ButtonsConfig();
	car = new CarConfig();
	teyes = new TeyesConfig();
	variable = new VariableConfig();

	static struct: any;
	static bleStruct: IBluetoothStruct;
	static size: number;

	static update(): void
	{
		Configs.struct = {
			version: BluetoothStruct.struct(StructVersion),
			device: BluetoothStruct.struct(StructDeviceConfig),
			buttons: BluetoothStruct.struct(StructButtonsConfig),
			car: BluetoothStruct.struct(StructCarConfig),
			teyes: BluetoothStruct.struct(TeyesConfig.struct),
			variable: BluetoothStruct.struct(StructVariableConfigs)
		};
		Configs.bleStruct = new BluetoothStruct(Configs.struct);
		Configs.size = API_VERSION_SIZE +
			API_DEVICE_CONFIG_SIZE +
			API_BUTTONS_CONFIG_SIZE +
			API_CAR_CONFIG_SIZE +
			TeyesConfig.size +
			API_VARIABLE_CONFIGS_SIZE;
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
		const result = this._set(this, API_CONFIG_EXEC, Configs.size + 1, Configs.bleStruct, buf);
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
