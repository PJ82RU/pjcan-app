import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { StructVolumeView } from "./StructVolumeView";
import { IVolumeView } from "./IVolumeView";

export const API_EXEC_VARIABLE_VOLUME_VIEW = 202;
export const API_SIZE_VARIABLE_VOLUME_VIEW = 4;

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
		return this._set(this, API_EXEC_VARIABLE_VOLUME_VIEW, API_SIZE_VARIABLE_VOLUME_VIEW + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_VARIABLE_VOLUME_VIEW, API_SIZE_VARIABLE_VOLUME_VIEW + 1, struct);
	}
}
