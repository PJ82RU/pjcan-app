import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceHardware, IDeviceValue } from "./IDeviceValue";

export const API_DEVICE_VALUE_EXEC = 0x03;
export const API_DEVICE_VALUE_EVENT = "DeviceValue";

/** Модель значений устройства */
export class DeviceValue extends BaseModel implements IDeviceValue
{
	static structHardware: any = {
		major: BluetoothStruct.uint8(),
		minor: BluetoothStruct.uint8(),
		build: BluetoothStruct.uint8(),
		revision: BluetoothStruct.uint8()
	};

	static struct: any = {
		activation: BluetoothStruct.bit(),
		state_led_work: BluetoothStruct.bit(),
		state_reverse: BluetoothStruct.bit(),
		state_r_position: BluetoothStruct.bit(),
		state_amp_illum: BluetoothStruct.bit(),
		hardware: BluetoothStruct.struct(this.structHardware),
		led: BluetoothStruct.uint8(),
		voltmeter: BluetoothStruct.uint16(),
		worktime: BluetoothStruct.uint32()
	};
	static size: number = 12;

	activation = false;
	state_led_work = false;
	state_reverse = false;
	state_r_position = false;
	state_amp_illum = false;
	hardware = {
		major: 0,
		minor: 0,
		build: 0,
		revision: 0
	} as IDeviceHardware;
	led = 0;
	voltmeter = 0;
	worktime = 0;

	constructor(data?: DataView)
	{
		super(API_DEVICE_VALUE_EXEC);
		this.skipActivationCheck = true;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DeviceValue.size, new BluetoothStruct(DeviceValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
