import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { BoseView } from "../bose";
import { ClimateView } from "../climate";
import { ViewConfig } from "@/models/pjcan/view";
import { DoorsView } from "../doors";
import { EngineView } from "../engine";
import { FuelView } from "../fuel";
import { MovementView } from "../movement";
import { SensorsView } from "../sensors";
import { TemperatureView } from "../temperature";
import { VolumeView } from "../volume";
import { IVariableView, StructVariableView } from "./index";

export const API_EXEC_VARIABLE_VIEW = 101; // команда API
const STRUCT_LENGTH = 97; // длина данных API

const struct = new BluetoothStruct(StructVariableView);

/** Модель параметров отображения данных переменных */
export class VariableView extends BaseModel implements IVariableView
{
	bose = new BoseView();
	climate = new ClimateView();
	clock = new ViewConfig();
	doors = new DoorsView();
	engine = new EngineView();
	fuel = new FuelView();
	movement = new MovementView();
	sensors = new SensorsView();
	temperature = new TemperatureView();
	volume = new VolumeView();

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
		return this._set(this, API_EXEC_VARIABLE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_VIEW, 1);
	}
}
