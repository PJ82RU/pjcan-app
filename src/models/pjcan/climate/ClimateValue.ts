import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IClimateValue, IClimateZone } from "./IClimateValue";
import { IVersion } from "@/models/pjcan/version";

export const API_CLIMATE_VALUE_EXEC = 0x71;
export const API_CLIMATE_VALUE_EVENT = "ClimateValue";

export const API_CLIMATE_VIEW_EXEC = 0x73;
export const API_CLIMATE_VIEW_EVENT = "ClimateView";

/** Модель значений климата */
export class ClimateValue extends BaseModel implements IClimateValue
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		if (version?.major === 4 && ((version.minor === 1 && version.build >= 6) || version.minor > 1))
		{
			const structZone = {
				airFlowLegs: BluetoothStruct.bit(),
				airFlowBody: BluetoothStruct.bit(),
				airFlowUp: BluetoothStruct.bit(),
				heatedSeat: BluetoothStruct.uint8(),
				airRate: BluetoothStruct.uint8(),
				temperature: BluetoothStruct.uint8()
			};

			ClimateValue.struct = {
				power: BluetoothStruct.bit(),
				automode: BluetoothStruct.bit(),
				dual: BluetoothStruct.bit(),
				ac: BluetoothStruct.bit(),
				eco: BluetoothStruct.bit(),
				airAuto: BluetoothStruct.bit(),
				airIntake: BluetoothStruct.bit(),
				heatedFrontWindow: BluetoothStruct.bit(),
				heatedRearWindow: BluetoothStruct.bit(),
				temperatureCelsius: BluetoothStruct.bit(),
				driver: BluetoothStruct.struct(structZone),
				passenger: BluetoothStruct.struct(structZone)
			};
			ClimateValue.size = 12;
		}
		else
		{
			ClimateValue.struct = {
				power: BluetoothStruct.bit(),
				automode: BluetoothStruct.bit(),
				ac: BluetoothStruct.bit(),
				eco: BluetoothStruct.bit(),
				_airDLegs: BluetoothStruct.bit(),
				_airDBody: BluetoothStruct.bit(),
				_airDWindshield: BluetoothStruct.bit(),
				_dBackWin: BluetoothStruct.bit(),
				_airInside: BluetoothStruct.bit(),
				_airOutside: BluetoothStruct.bit(),
				_temperatureSettable: BluetoothStruct.bit(),
				_temperatureAmb: BluetoothStruct.bit(),
				temperatureCelsius: BluetoothStruct.bit(),
				_temperatureFahrenheit: BluetoothStruct.bit(),
				_airRate: BluetoothStruct.uint8(),
				_temperature: BluetoothStruct.uint16()
			};
			ClimateValue.size = 5;
		}
	}

	power = false;
	automode = false;
	dual = false;
	ac = false;
	eco = false;
	airAuto = false;
	airIntake = false;
	heatedFrontWindow = false;
	heatedRearWindow = false;
	temperatureCelsius = false;
	driver = {
		airFlowLegs: false,
		airFlowBody: false,
		airFlowUp: false,
		heatedSeat: 0,
		airRate: 0,
		temperature: 0
	} as IClimateZone;
	passenger = {
		airFlowLegs: false,
		airFlowBody: false,
		airFlowUp: false,
		heatedSeat: 0,
		airRate: 0,
		temperature: 0
	} as IClimateZone;

	// переменные для совместимости
	_airDLegs = false;
	_airDBody = false;
	_airDWindshield = false;
	_dBackWin = false;
	_airInside = false;
	_airOutside = false;
	_temperatureSettable = false;
	_temperatureAmb = false;
	_temperatureFahrenheit = false;
	_airRate = 0;
	_temperature = 0;

	_nop = 0;

	constructor(data?: DataView)
	{
		super(API_CLIMATE_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(this, this.exec, ClimateValue.size, new BluetoothStruct(ClimateValue.struct), buf);
		if (result && ClimateValue.size === 5)
		{
			this.driver.airFlowLegs = this._airDLegs;
			this.driver.airFlowBody = this._airDBody;
			this.heatedFrontWindow = this._airDWindshield;
			this.heatedRearWindow = this._dBackWin;
			this.airIntake = this._airInside;
			this.driver.airRate = this._airRate;
			this.driver.temperature = this._temperature;
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
