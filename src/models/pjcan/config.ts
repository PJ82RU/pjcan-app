import Struct from '@/components/bluetooth/struct';
import ButtonsConfig, { IButtonsConfig, StructButtonsConfig } from '@/models/pjcan/button/config';
import CarConfig, { ICarConfig, StructCarConfig } from '@/models/pjcan/car/config';
import TeyesConfig, { ITeyesConfig, StructTeyesConfig } from '@/models/pjcan/teyes/config';
import VariableConfig, { IVariableConfig, StructVariableConfig } from '@/models/pjcan/variables/config';
import BaseModel, { IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_CONFIG = 1;
const STRUCT_LENGTH = 133;

export interface IPJCANConfig extends IBaseModel {
	buttons: IButtonsConfig;
	car: ICarConfig;
	teyes: ITeyesConfig;
	variable: IVariableConfig;
}

export const StructConfig = {
	buttons: Struct.struct(StructButtonsConfig),
	car: Struct.struct(StructCarConfig),
	teyes: Struct.struct(StructTeyesConfig),
	variable: Struct.struct(StructVariableConfig)
};

const struct = new Struct(StructConfig);

export default class PJCANConfig extends BaseModel implements IPJCANConfig {
	buttons = new ButtonsConfig();
	car = new CarConfig();
	teyes = new TeyesConfig();
	variable = new VariableConfig();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	public set(buf: DataView): boolean {
		return this._set(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	public get(): DataView | undefined {
		return this._get(this, API_EXEC_CONFIG, STRUCT_LENGTH, struct);
	}
}
