import { BluetoothStruct } from "@/components/bluetooth";

/** Структура данных */
export const StructTeyesConfig = {
	receiveClock: BluetoothStruct.bit(),
	receiveButtons: BluetoothStruct.bit(),
	receiveText: BluetoothStruct.bit(),
	sendButton: BluetoothStruct.bit(),
	sendClimate: BluetoothStruct.bit(),
	sendDoors: BluetoothStruct.bit(),
	parseVolume: BluetoothStruct.bit(),
	lcdShow: BluetoothStruct.bit()
};
