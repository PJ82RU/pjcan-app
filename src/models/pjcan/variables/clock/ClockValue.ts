import { IClockValue } from "./IClockValue";

export const API_SIZE_VARIABLE_CLOCK = 3;
export const API_SIZE_VARIABLE_CLOCK_VIEW = 4;

/** Модель значения часов */
export class ClockValue implements IClockValue
{
	hour = 0;
	minutes = 0;
	seconds = 0;
}
