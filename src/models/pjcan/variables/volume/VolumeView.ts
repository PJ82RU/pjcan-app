import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { IVolumeView } from "./IVolumeView";

export const API_VARIABLE_VOLUME_VIEW_EXEC = 202;
export const API_VARIABLE_VOLUME_VIEW_EVENT = "VariableVolumeView";

/** Модель параметров отображения данных уровня звука */
export class VolumeView extends BaseModel implements IVolumeView
{
	static struct: any = {
		view: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = ViewConfig.size;

	view = new ViewConfig();

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_VARIABLE_VOLUME_VIEW_EXEC,
			VolumeView.size + 1,
			new BluetoothStruct(VolumeView.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_VARIABLE_VOLUME_VIEW_EXEC,
			VolumeView.size + 1,
			new BluetoothStruct(VolumeView.struct)
		);
	}
}
