import { BluetoothStruct } from "@/components/bluetooth";
import { ViewConfig, IViewConfig, StructViewConfig } from "../../view/index";
import { BaseModel, IBaseModel } from "../../base/BaseModel";

export const API_EXEC_VARIABLE_BOSE_VIEW = 111; // команда API
const STRUCT_LENGTH = 5; // длина данных API

/** Интерфейс параметров отображения данных Bose */
export interface IBoseView extends IBaseModel {
	bose: IViewConfig;
}

/** Структура данных */
export const StructBoseView = {
	bose: BluetoothStruct.struct(StructViewConfig)
};

const struct = new BluetoothStruct(StructBoseView);

/** Модель параметров отображения данных Bose */
export class BoseView extends BaseModel implements IBoseView
{
	bose = new ViewConfig();

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
		return this._set(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_BOSE_VIEW, STRUCT_LENGTH, struct);
	}
}
