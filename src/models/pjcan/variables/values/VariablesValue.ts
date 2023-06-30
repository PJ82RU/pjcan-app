import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { IVariablesValue } from "./IVariablesValue";
import { ClimateValue } from "../climate";
import { ClockValue } from "../clock";
import { DoorsValue } from "../doors";
import { EngineValue } from "../engine";
import { FuelValue } from "../fuel";
import { MovementValue } from "../movement";
import { SensorsValue } from "../sensors";
import { TemperatureValue } from "../temperature";
import { VolumeValue } from "../volume";
import { IVersion } from "../../version";

export const API_VARIABLE_VALUES_EXEC = 102;
export const API_VARIABLE_VALUES_EVENT = "VariableValues";

/** Модель значений температуры */
export class VariablesValue extends BaseModel implements IVariablesValue
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		EngineValue.update(version);

		VariablesValue.struct = {
			climate: BluetoothStruct.struct(ClimateValue.struct),
			clock: BluetoothStruct.struct(ClockValue.struct),
			doors: BluetoothStruct.struct(DoorsValue.struct),
			engine: BluetoothStruct.struct(EngineValue.struct),
			fuel: BluetoothStruct.struct(FuelValue.struct),
			movement: BluetoothStruct.struct(MovementValue.struct),
			sensors: BluetoothStruct.struct(SensorsValue.struct),
			temperature: BluetoothStruct.struct(TemperatureValue.struct),
			volume: BluetoothStruct.struct(VolumeValue.struct)
		};
		VariablesValue.size =
			ClimateValue.size +
			ClockValue.size +
			DoorsValue.size +
			EngineValue.size +
			FuelValue.size +
			MovementValue.size +
			SensorsValue.size +
			TemperatureValue.size +
			VolumeValue.size;
	}

	climate = new ClimateValue();
	clock = new ClockValue();
	doors = new DoorsValue();
	engine = new EngineValue();
	fuel = new FuelValue();
	movement = new MovementValue();
	sensors = new SensorsValue();
	temperature = new TemperatureValue();
	volume = new VolumeValue();

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
			API_VARIABLE_VALUES_EXEC,
			VariablesValue.size + 1,
			new BluetoothStruct(VariablesValue.struct),
			buf
		);
		if (result)
		{
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
		return this._get(
			this,
			API_VARIABLE_VALUES_EXEC,
			VariablesValue.size + 1,
			new BluetoothStruct(VariablesValue.struct)
		);
	}
}
