import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { API_VALUES_SIZE, StructValues } from "./StructValues";
import { IValues } from "./IValues";
import { DeviceValue } from "../device";
import { LCDValue } from "../lcd";
import { VariablesValue } from "../variables/values";

export const API_VALUES_EXEC = 3;
export const API_VALUES_EVENT = "Values";

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
		const result = this._set(this, API_VALUES_EXEC, API_VALUES_SIZE + 1, struct, buf);
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
