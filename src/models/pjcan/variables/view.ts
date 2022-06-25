import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';
import { ViewConfig, IViewConfig, StructViewConfig } from '@/models/pjcan/view/config';
import { EngineView, IEngineView, StructEngineView } from '@/models/pjcan/variables/engine/view';
import { MovementView, IMovementView, StructMovementView } from '@/models/pjcan/variables/movement/view';
import { SensorsView, ISensorsView, StructSensorsView } from '@/models/pjcan/variables/sensors/view';
import { FuelView, IFuelView, StructFuelView } from '@/models/pjcan/variables/fuel/view';
import { BoseView, IBoseView, StructBoseView } from '@/models/pjcan/variables/bose/view';
import { ClimateView, IClimateView, StructClimateView } from '@/models/pjcan/variables/climate/view';
import { DoorsView, IDoorsView, StructDoorsView } from '@/models/pjcan/variables/doors/view';
import { TemperatureView, ITemperatureView, StructTemperatureView } from '@/models/pjcan/variables/temperature/view';
import { VolumeView, IVolumeView, StructVolumeView } from '@/models/pjcan/variables/volume/view';

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
	bose: Struct.struct(StructBoseView),
	climate: Struct.struct(StructClimateView),
	clock: Struct.struct(StructViewConfig),
	doors: Struct.struct(StructDoorsView),
	engine: Struct.struct(StructEngineView),
	fuel: Struct.struct(StructFuelView),
	movement: Struct.struct(StructMovementView),
	sensors: Struct.struct(StructSensorsView),
	temperature: Struct.struct(StructTemperatureView),
	volume: Struct.struct(StructVolumeView)
};

const struct = new Struct(StructVariableView);

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
