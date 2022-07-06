import { BluetoothStruct } from '@/components/bluetooth';
import { CarView, ICarView, StructCarView } from './car';
import { VariableView, IVariableView, StructVariableView } from './variables/VariablesView';
import { TeyesView, ITeyesView, StructTeyesView } from './teyes';
import { BaseModel, IBaseModel } from './BaseModel';

export const API_EXEC_VIEW = 2;
const STRUCT_LENGTH = 110;

export interface IView extends IBaseModel {
	car: ICarView;
	teyes: ITeyesView;
	variable: IVariableView;
}

export const StructView = {
	car: BluetoothStruct.struct(StructCarView),
	teyes: BluetoothStruct.struct(StructTeyesView),
	variable: BluetoothStruct.struct(StructVariableView)
};

const struct = new BluetoothStruct(StructView);

export class View extends BaseModel implements IView {
	car = new CarView();
	teyes = new TeyesView();
	variable = new VariableView();

	constructor(data?: DataView) {
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VIEW, 1);
	}
}
