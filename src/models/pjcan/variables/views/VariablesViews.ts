import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { API_SIZE_VARIABLE_BOSE_VIEW, BoseView } from "../bose";
import { API_SIZE_VARIABLE_CLIMATE_VIEW, ClimateView } from "../climate";
import { ViewConfig } from "@/models/pjcan/view";
import { API_SIZE_VARIABLE_DOORS_VIEW, DoorsView } from "../doors";
import { API_SIZE_VARIABLE_ENGINE_VIEW, EngineView } from "../engine";
import { API_SIZE_VARIABLE_FUEL_VIEW, FuelView } from "../fuel";
import { API_SIZE_VARIABLE_MOVEMENT_VIEW, MovementView } from "../movement";
import { API_SIZE_VARIABLE_SENSORS_VIEW, SensorsView } from "../sensors";
import { API_SIZE_VARIABLE_TEMPERATURE_VIEW, TemperatureView } from "../temperature";
import { API_SIZE_VARIABLE_VOLUME_VIEW, VolumeView } from "../volume";
import { StructVariableViews } from "./StructVariableViews";
import { IVariableViews } from "./IVariableViews";
import { API_SIZE_VARIABLE_CLOCK_VIEW } from "@/models/pjcan/variables/clock";

export const API_VARIABLE_VIEW_EXEC = 101;
export const API_SIZE_VARIABLE_VIEW =
	API_SIZE_VARIABLE_BOSE_VIEW +
	API_SIZE_VARIABLE_CLIMATE_VIEW +
	API_SIZE_VARIABLE_CLOCK_VIEW +
	API_SIZE_VARIABLE_DOORS_VIEW +
	API_SIZE_VARIABLE_ENGINE_VIEW +
	API_SIZE_VARIABLE_FUEL_VIEW +
	API_SIZE_VARIABLE_MOVEMENT_VIEW +
	API_SIZE_VARIABLE_SENSORS_VIEW +
	API_SIZE_VARIABLE_TEMPERATURE_VIEW +
	API_SIZE_VARIABLE_VOLUME_VIEW;

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
		const result = this._set(this, API_VARIABLE_VIEW_EXEC, API_SIZE_VARIABLE_VIEW + 1, struct, buf);
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
