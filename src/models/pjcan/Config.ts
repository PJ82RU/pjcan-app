import { BluetoothStruct } from '@/components/bluetooth';
import { ButtonsConfig, IButtonsConfig, StructButtonsConfig } from './button';
import { CarConfig, ICarConfig, StructCarConfig } from './car';
import { TeyesConfig, ITeyesConfig, StructTeyesConfig } from './teyes';
import { VariableConfig, IVariableConfig, StructVariableConfig } from './variables/VariablesConfig';
import { BaseModel, IBaseModel } from './BaseModel';

export const API_EXEC_CONFIG = 1;
const STRUCT_LENGTH = 133;

export interface IConfig extends IBaseModel {
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfig;
}

export const StructConfig = {
	buttons: BluetoothStruct.struct(StructButtonsConfig),
	car: BluetoothStruct.struct(StructCarConfig),
	teyes: BluetoothStruct.struct(StructTeyesConfig),
	variable: BluetoothStruct.struct(StructVariableConfig)
};

const struct = new BluetoothStruct(StructConfig);

export class Config extends BaseModel implements IConfig {
	buttons = new ButtonsConfig();
	car = new CarConfig();
	teyes = new TeyesConfig();
	variable = new VariableConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct);
	}
}
