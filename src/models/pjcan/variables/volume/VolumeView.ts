import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { API_VARIABLE_VOLUME_VIEW_SIZE, StructVolumeView } from "./StructVolumeView";
import { IVolumeView } from "./IVolumeView";

export const API_VARIABLE_VOLUME_VIEW_EXEC = 202;
export const API_VARIABLE_VOLUME_VIEW_EVENT = "VariableVolumeView";

const struct = new BluetoothStruct(StructVolumeView);

/** Модель параметров отображения данных уровня звука */
export class VolumeView extends BaseModel implements IVolumeView
{
	view = new ViewConfig();

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
		return this._set(this, API_VARIABLE_VOLUME_VIEW_EXEC, API_VARIABLE_VOLUME_VIEW_SIZE + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_VOLUME_VIEW_EXEC, API_VARIABLE_VOLUME_VIEW_SIZE + 1, struct);
	}
}
