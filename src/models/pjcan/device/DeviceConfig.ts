import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceConfig } from "./IDeviceConfig";

export const API_DEVICE_CONFIG_EXEC = 0x08;
export const API_DEVICE_CONFIG_EVENT = "DeviceConfig";

export const API_DEVICE_VIEW_WORKTIME_EXEC = 0x0a;
export const API_DEVICE_VIEW_WORKTIME_EVENT = "DeviceWorktime";

export const API_DEVICE_VIEW_VOLTMETER_EXEC = 0x0b;
export const API_DEVICE_VIEW_VOLTMETER_EVENT = "DeviceVoltmeter";

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig
{
	static struct: any = {
		disableLedWork: BluetoothStruct.bit(),
		disableReverse: BluetoothStruct.bit(),
		disableRPosition: BluetoothStruct.bit(),
		disableAmpIllum: BluetoothStruct.bit(),
		disableVoltmeter: BluetoothStruct.bit(),
		calibrationOfVoltmeter: BluetoothStruct.int8()
	};
	static size: number = 2;

	disableLedWork = false;
	disableReverse = false;
	disableRPosition = false;
	disableAmpIllum = false;
	disableVoltmeter = false;
	calibrationOfVoltmeter = 0;

	constructor(data?: DataView)
	{
		super(API_DEVICE_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DeviceConfig.size, new BluetoothStruct(DeviceConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, DeviceConfig.size, new BluetoothStruct(DeviceConfig.struct));
	}
}
