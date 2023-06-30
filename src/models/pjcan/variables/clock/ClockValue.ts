import { IClockValue } from "./IClockValue";
import { BluetoothStruct } from "@/components/bluetooth";

/** Модель значения часов */
export class ClockValue implements IClockValue
{
	static struct: any = {
		hour: BluetoothStruct.uint8(),
		minutes: BluetoothStruct.uint8(),
		seconds: BluetoothStruct.uint8()
	};
	static size: number = 3;
	static sizeView: number = 4;

	hour = 0;
	minutes = 0;
	seconds = 0;
}
