import { BluetoothStruct } from "@/components/bluetooth";

export const API_TEYES_CONFIG_SIZE = 2;

/** Структура данных */
export const StructTeyesConfig = {
	receiveClock: BluetoothStruct.bit(),
	receiveButtons: BluetoothStruct.bit(),
	receiveText: BluetoothStruct.bit(),
	sendButton: BluetoothStruct.bit(),
	sendClimate: BluetoothStruct.bit(),
	sendDoors: BluetoothStruct.bit(),
	parseVolume: BluetoothStruct.bit(),
	lcdShow: BluetoothStruct.bit(),
	uartBaud: BluetoothStruct.uint8()
};
