import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';
import { ViewConfig, IViewConfig, StructViewConfig } from '../view/index';
import { EngineView, IEngineView, StructEngineView } from './engine';
import { MovementView, IMovementView, StructMovementView } from './movement';
import { SensorsView, ISensorsView, StructSensorsView } from './sensors';
import { FuelView, IFuelView, StructFuelView } from './fuel';
import { BoseView, IBoseView, StructBoseView } from './bose';
import { ClimateView, IClimateView, StructClimateView } from './climate';
import { DoorsView, IDoorsView, StructDoorsView } from './doors';
import { TemperatureView, ITemperatureView, StructTemperatureView } from './temperature';
import { VolumeView, IVolumeView, StructVolumeView } from './volume';

export const API_EXEC_VARIABLE_VIEW = 101; // команда API
const STRUCT_LENGTH = 97; // длина данных API

/** Интерфейс параметров отображения данных переменных */
export interface IVariableView extends IBaseModel {
	bose: IBoseView;
	climate: IClimateView;
	clock: IViewConfig;
	doors: IDoorsView;
	engine: IEngineView;
	fuel: IFuelView;
	movement: IMovementView;
	sensors: ISensorsView;
	temperature: ITemperatureView;
	volume: IVolumeView;
}

/** Структура данных */
export const StructVariableView = {
	bose: BluetoothStruct.struct(StructBoseView),
	climate: BluetoothStruct.struct(StructClimateView),
	clock: BluetoothStruct.struct(StructViewConfig),
	doors: BluetoothStruct.struct(StructDoorsView),
	engine: BluetoothStruct.struct(StructEngineView),
	fuel: BluetoothStruct.struct(StructFuelView),
	movement: BluetoothStruct.struct(StructMovementView),
	sensors: BluetoothStruct.struct(StructSensorsView),
	temperature: BluetoothStruct.struct(StructTemperatureView),
	volume: BluetoothStruct.struct(StructVolumeView)
};

const struct = new BluetoothStruct(StructVariableView);

/** Модель параметров отображения данных переменных */
export class VariableView extends BaseModel implements IVariableView {
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

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_VARIABLE_VIEW, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_VARIABLE_VIEW, STRUCT_LENGTH, struct);
	}
}
