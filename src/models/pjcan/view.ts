import { Struct } from '@/components/bluetooth/struct';
import { CarView, ICarView, StructCarView } from '@/models/pjcan/car/view';
import { VariableView, IVariableView, StructVariableView } from '@/models/pjcan/variables/view';
import { TeyesView, ITeyesView, StructTeyesView } from '@/models/pjcan/teyes/view';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_VIEW = 2;
const STRUCT_LENGTH = 109;

export interface IPJCANView extends IBaseModel {
	car: ICarView;
	teyes: ITeyesView;
	variable: IVariableView;
}

export const StructPJCANView = {
	car: Struct.struct(StructCarView),
	teyes: Struct.struct(StructTeyesView),
	variable: Struct.struct(StructVariableView)
};

const struct = new Struct(StructPJCANView);

export class PJCANView extends BaseModel implements IPJCANView {
	car = new CarView();
	teyes = new TeyesView();
	variable = new VariableView();

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VIEW, STRUCT_LENGTH, struct);
	}
}
