// noinspection DuplicatedCode

import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { CarView } from "../car";
import { VariableView } from "../variables/views";
import { TeyesView } from "../teyes";
import { StructViews } from "./StructViews";
import { IViews } from "./IViews";

export const API_EXEC_VIEW = 2;
const STRUCT_LENGTH = 109;

const struct = new BluetoothStruct(StructViews);

export class Views extends BaseModel implements IViews
{
	car = new CarView();
	teyes = new TeyesView();
	variable = new VariableView();

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
		const result = this._set(this, API_EXEC_VIEW, STRUCT_LENGTH, struct, buf);
		if (result)
		{
			this.car.isData = true;
			this.teyes.isData = true;
			this.variable.bose.isData = true;
			this.variable.climate.isData = true;
			this.variable.doors.isData = true;
			this.variable.engine.isData = true;
			this.variable.fuel.isData = true;
			this.variable.movement.isData = true;
			this.variable.sensors.isData = true;
			this.variable.temperature.isData = true;
			this.variable.volume.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VIEW, 1);
	}
}
