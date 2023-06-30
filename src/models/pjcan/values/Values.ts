import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IValues } from "./IValues";
import { DeviceValue } from "../device";
import { LCDValue } from "../lcd";
import { VariablesValue } from "../variables/values";
import { IVersion } from "../version";

export const API_VALUES_EXEC = 3;
export const API_VALUES_EVENT = "Values";

export class Values extends BaseModel implements IValues
{
	static struct: any;
	static size: number;

	/**
	 * Обновить версию структуры
	 * @param {IVersion} version Версия протокола
	 */
	static update(version?: IVersion): void
	{
		VariablesValue.update(version);

		Values.struct = {
			device: BluetoothStruct.struct(DeviceValue.struct),
			lcd: BluetoothStruct.struct(LCDValue.struct),
			variable: BluetoothStruct.struct(VariablesValue.struct)
		};
		Values.size = DeviceValue.size + LCDValue.size + VariablesValue.size;
	}

	device = new DeviceValue();
	lcd = new LCDValue();
	variable = new VariablesValue();

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
		const result = this._set(this, API_VALUES_EXEC, Values.size + 1, new BluetoothStruct(Values.struct), buf);
		if (result)
		{
			this.device.isData = true;
			this.lcd.isData = true;
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
		return this._get(this, API_VALUES_EXEC, 1);
	}
}

Values.update();
