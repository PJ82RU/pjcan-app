// noinspection DuplicatedCode

import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructValues } from "./StructValues";
import { IValues } from "./IValues";
import { API_SIZE_DEVICE_VALUE, DeviceValue } from "../device";
import { API_SIZE_LCD_VALUE, LCDValue } from "../lcd";
import { API_SIZE_VARIABLE_VALUE, VariablesValue } from "../variables/values";

export const API_VALUE_EXEC = 3;
export const API_SIZE_VALUE = API_SIZE_DEVICE_VALUE + API_SIZE_LCD_VALUE + API_SIZE_VARIABLE_VALUE;

const struct = new BluetoothStruct(StructValues);

export class Values extends BaseModel implements IValues
{
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
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		const result = this._set(this, API_VALUE_EXEC, API_SIZE_VALUE + 1, struct, buf);
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
		return this._get(this, API_VALUE_EXEC, 1);
	}
}
