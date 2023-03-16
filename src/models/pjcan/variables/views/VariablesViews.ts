import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "@/models/pjcan/view";
import { BoseView } from "../bose";
import { ClimateView } from "../climate";
import { DoorsView } from "../doors";
import { EngineView } from "../engine";
import { FuelView } from "../fuel";
import { MovementView } from "../movement";
import { SensorsView } from "../sensors";
import { TemperatureView } from "../temperature";
import { VolumeView } from "../volume";
import { API_VARIABLE_VIEW_SIZE, StructVariableViews } from "./StructVariableViews";
import { IVariableViews } from "./IVariableViews";

export const API_VARIABLE_VIEW_EXEC = 101;

const struct = new BluetoothStruct(StructVariableViews);

/** Модель параметров отображения данных переменных */
export class VariableView extends BaseModel implements IVariableViews
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
		const result = this._set(this, API_VARIABLE_VIEW_EXEC, API_VARIABLE_VIEW_SIZE + 1, struct, buf);
		if (result)
		{
			this.bose.isData = true;
			this.climate.isData = true;
			this.doors.isData = true;
			this.engine.isData = true;
			this.fuel.isData = true;
			this.movement.isData = true;
			this.sensors.isData = true;
			this.temperature.isData = true;
			this.volume.isData = true;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VIEW_EXEC, 1);
	}
}
