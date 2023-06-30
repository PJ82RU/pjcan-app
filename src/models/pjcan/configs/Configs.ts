import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IVersion, Version } from "../version";
import { DeviceConfig } from "../device";
import { ButtonsConfig } from "../button";
import { CarConfig } from "../car";
import { TeyesConfig } from "../teyes";
import { VariableConfig } from "../variables/configs";
import { IConfigs } from "./IConfigs";

export const API_CONFIG_EXEC = 1;
export const API_CONFIGS_EVENT = "Configs";

export class Configs extends BaseModel implements IConfigs
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		TeyesConfig.update(version);
		VariableConfig.update(version);

		Configs.struct = {
			version: BluetoothStruct.struct(Version.struct),
			device: BluetoothStruct.struct(DeviceConfig.struct),
			buttons: BluetoothStruct.struct(ButtonsConfig.struct),
			car: BluetoothStruct.struct(CarConfig.struct),
			teyes: BluetoothStruct.struct(TeyesConfig.struct),
			variable: BluetoothStruct.struct(VariableConfig.struct)
		};
		Configs.size =
			Version.size +
			DeviceConfig.size +
			ButtonsConfig.size +
			CarConfig.size +
			TeyesConfig.size +
			VariableConfig.size;
	}

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(this, API_CONFIG_EXEC, Configs.size + 1, new BluetoothStruct(Configs.struct), buf);
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

Configs.update();
