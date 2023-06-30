import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { CarView } from "../car";
import { VariableViews } from "../variables/views";
import { TeyesView } from "../teyes";
import { IViews } from "./IViews";
import { IVersion } from "../version";

export const API_VIEWS_EXEC = 2;
export const API_VIEWS_EVENT = "Views";

export class Views extends BaseModel implements IViews
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		VariableViews.update(version);

		Views.struct = {
			car: BluetoothStruct.struct(CarView.struct),
			teyes: BluetoothStruct.struct(TeyesView.struct),
			variable: BluetoothStruct.struct(VariableViews.struct)
		};
		Views.size = CarView.size + TeyesView.size + VariableViews.size;
	}

	car = new CarView();
	teyes = new TeyesView();
	variable = new VariableViews();

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
		const result = this._set(this, API_VIEWS_EXEC, Views.size + 1, new BluetoothStruct(Views.struct), buf);
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
		return this._get(this, API_VIEWS_EXEC, 1);
	}
}

Views.update();
