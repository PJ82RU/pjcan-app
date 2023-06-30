import { IViewConfig } from "./IViewConfig";
import { TViewType } from "./TViewType";
import { BluetoothStruct } from "@/components/bluetooth";

/** Модель параметров отображения */
export class ViewConfig implements IViewConfig
{
	enabled = false;
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;

	static struct: any = {
		enabled: BluetoothStruct.bit(),
		type: BluetoothStruct.uint8(),
		time: BluetoothStruct.uint16()
	};
	static size: number = 4;
}
