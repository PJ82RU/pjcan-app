import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IDatetimeConfig } from "./IDatetimeConfig";

export const API_DATETIME_CONFIG_EXEC = 0x4a;
export const API_DATETIME_CONFIG_EVENT = "DatetimeConfig";

export const API_DATETIME_VIEW_EXEC = 0x4d;
export const API_DATETIME_VIEW_EVENT = "DatetimeView";

/** Модель значения часов */
export class DatetimeConfig extends BaseModel implements IDatetimeConfig
{
	static struct: any = {
		showDate: BluetoothStruct.bit(),
		showTime: BluetoothStruct.bit(),
		showDayWeek: BluetoothStruct.bit(),
		showDateAndDayWeek: BluetoothStruct.bit(),
		showTimeAndDayWeek: BluetoothStruct.bit(),
		showFullDatetime: BluetoothStruct.bit(),
		timezone: BluetoothStruct.int8(),
		unixtime: BluetoothStruct.uint32()
	};
	static size: number = 6;

	showDate = false;
	showTime = false;
	showDayWeek = false;
	showDateAndDayWeek = false;
	showTimeAndDayWeek = false;
	showFullDatetime = false;
	timezone = 0;
	unixtime = 0;

	constructor(data?: DataView)
	{
		super(API_DATETIME_CONFIG_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, DatetimeConfig.size, new BluetoothStruct(DatetimeConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, DatetimeConfig.size, new BluetoothStruct(DatetimeConfig.struct));
	}

	/** Обновить текущее время */
	updateUnixtime(): void
	{
		const now = new Date();
		this.unixtime = Math.round(now.getTime() / 1000);
		this.timezone = now.getTimezoneOffset() / 60;
	};
}
