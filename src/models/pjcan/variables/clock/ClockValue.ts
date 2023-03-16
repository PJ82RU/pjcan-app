import { IClockValue } from "./IClockValue";

/** Модель значения часов */
export class ClockValue implements IClockValue
{
	hour = 0;
	minutes = 0;
	seconds = 0;
}
