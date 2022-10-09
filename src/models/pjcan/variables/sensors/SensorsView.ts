import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig, IViewConfig, StructViewConfig } from "../../view/index";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_SENSORS_VIEW = 171; // команда API
const STRUCT_LENGTH = 17; // длина данных API

/** Интерфейс параметров отображения данных датчиков */
export interface ISensorsView extends IBaseModel {
	handbrake: IViewConfig;
	reverse: IViewConfig;
	seatbelt: IViewConfig;
	signal: IViewConfig;
}

/** Структура данных */
export const StructSensorsView = {
	handbrake: BluetoothStruct.struct(StructViewConfig),
	reverse: BluetoothStruct.struct(StructViewConfig),
	seatbelt: BluetoothStruct.struct(StructViewConfig),
	signal: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructSensorsView);

/** Модель параметров отображения данных датчиков */
export class SensorsView extends BaseModel implements ISensorsView
{
	handbrake = new ViewConfig();
	reverse = new ViewConfig();
	seatbelt = new ViewConfig();
	signal = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_SENSORS_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_SENSORS_VIEW, STRUCT_LENGTH, struct);
	}
}
