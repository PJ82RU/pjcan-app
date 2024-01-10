import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IViewConfig } from "./IViewConfig";
import { TViewType } from "./TViewType";

/** Модель параметров отображения */
export class ViewConfig extends BaseModel implements IViewConfig
{
	enabled = false;
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;
	delay = 0;

	static struct: any = {
		enabled: BluetoothStruct.bit(),
		type: BluetoothStruct.uint8(),
		time: BluetoothStruct.uint8(),
		delay: BluetoothStruct.uint8()
	};
	static size: number = 4;

	api_exec = 0;

	constructor(exec: number, data?: DataView)
	{
		super();
		this.api_exec = exec;
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.api_exec, ViewConfig.size, new BluetoothStruct(ViewConfig.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.api_exec, ViewConfig.size, new BluetoothStruct(ViewConfig.struct));
	}
}
