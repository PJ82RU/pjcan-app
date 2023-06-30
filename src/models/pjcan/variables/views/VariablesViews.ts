import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { BoseView } from "../bose";
import { ClimateView } from "../climate";
import { DoorsView } from "../doors";
import { EngineView } from "../engine";
import { FuelView } from "../fuel";
import { MovementView } from "../movement";
import { SensorsView } from "../sensors";
import { TemperatureView } from "../temperature";
import { VolumeView } from "../volume";
import { IVariableViews } from "./IVariableViews";
import { IVersion } from "../../version";

export const API_VARIABLE_VIEWS_EXEC = 101;
export const API_VARIABLE_VIEWS_EVENT = "VariableViews";

/** Модель параметров отображения данных переменных */
export class VariableViews extends BaseModel implements IVariableViews
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		VariableViews.struct = {
			bose: BluetoothStruct.struct(BoseView.struct),
			climate: BluetoothStruct.struct(ClimateView.struct),
			clock: BluetoothStruct.struct(ViewConfig.struct),
			doors: BluetoothStruct.struct(DoorsView.struct),
			engine: BluetoothStruct.struct(EngineView.struct),
			fuel: BluetoothStruct.struct(FuelView.struct),
			movement: BluetoothStruct.struct(MovementView.struct),
			sensors: BluetoothStruct.struct(SensorsView.struct),
			temperature: BluetoothStruct.struct(TemperatureView.struct),
			volume: BluetoothStruct.struct(VolumeView.struct)
		};
		VariableViews.size =
			BoseView.size +
			ClimateView.size +
			ViewConfig.size +
			DoorsView.size +
			EngineView.size +
			FuelView.size +
			MovementView.size +
			SensorsView.size +
			TemperatureView.size +
			VolumeView.size;
	}

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
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(
			this,
			API_VARIABLE_VIEWS_EXEC,
			VariableViews.size + 1,
			new BluetoothStruct(VariableViews.struct),
			buf
		);
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
		return this._get(this, API_VARIABLE_VIEWS_EXEC, 1);
	}
}
