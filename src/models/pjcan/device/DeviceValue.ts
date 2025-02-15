import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDeviceHardware, IDeviceValue } from "./IDeviceValue";
import { EDeviceType } from "./EDeviceType";
import { EDeviceAddons } from "./EDeviceAddons";

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
		stateLedWork: BluetoothStruct.bit(),
		stateReverse: BluetoothStruct.bit(),
		stateRPosition: BluetoothStruct.bit(),
		stateAmpIllum: BluetoothStruct.bit(),
		configSave: BluetoothStruct.bit(),
		hardware: BluetoothStruct.struct(this.structHardware),
		led: BluetoothStruct.uint8(),
		voltmeter: BluetoothStruct.uint16(),
		worktime: BluetoothStruct.uint32()
	};
	static size: number = 12;

	activation = false;
	stateLedWork = false;
	stateReverse = false;
	stateRPosition = false;
	stateAmpIllum = false;
	configSave = false;
	hardware = {
		major: 0,
		minor: 0,
		build: 0,
		revision: 0
	} as IDeviceHardware;
	led = 0;
	voltmeter = 0;
	worktime = 0;
	type = EDeviceType.PJCAN_UNDEFINED;
	addons = EDeviceAddons.ADDONS_STANDARD;

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
		const result: boolean = this._set(this, this.exec, DeviceValue.size, new BluetoothStruct(DeviceValue.struct), buf);
		if (result && this.hardware.major === 4)
		{
			switch (this.hardware.minor)
			{
				case 0:
					// PJCAN 4.0
					this.type = EDeviceType.PJCAN_40;
					break;
				case 1:
					// PJCAN 4.1
					switch (this.hardware.build)
					{
						case 0:
							// PJCAN 4.1a
							this.type = EDeviceType.PJCAN_41A;
							break;
						case 1:
							// PJCAN 4.1b
							this.type = EDeviceType.PJCAN_41B;
							this.addons = EDeviceAddons.ADDONS_R_CAM;
							break;
						case 2:
							// PJCAN 4.1 rev.1.1
							this.type = EDeviceType.PJCAN_41_REV1_1;
							break;
					}
					break;
				case 2:
					// PJCAN 4.2
					this.type = EDeviceType.PJCAN_42_REV1_0;
					switch (this.hardware.build)
					{
						case 0:
							this.addons = EDeviceAddons.ADDONS_STANDARD;
							break;
						case 1:
							this.addons = EDeviceAddons.ADDONS_R_CAM;
							break;
						case 2:
							this.addons = EDeviceAddons.ADDONS_ENCODER;
							break;
						case 3:
							this.addons = EDeviceAddons.ADDONS_POTENTIOMETER;
							break;
						case 4:
							this.addons = EDeviceAddons.ADDONS_R_CAM_POTENTIOMETER;
							break;
					}
					break;
			}
		}
		return result;
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec);
	}
}
