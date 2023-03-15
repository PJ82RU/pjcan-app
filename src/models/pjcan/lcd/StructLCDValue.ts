import { BluetoothStruct } from "@/components/bluetooth";

export const API_LCD_VALUE_SIZE = 15;

/** Структура данных */
export const StructLCDValue = {
	icoCDIN: BluetoothStruct.bit(),
	icoMDIN: BluetoothStruct.bit(),
	icoST: BluetoothStruct.bit(),
	icoDOLBY: BluetoothStruct.bit(),
	icoRPT: BluetoothStruct.bit(),
	icoRDM: BluetoothStruct.bit(),
	icoAF: BluetoothStruct.bit(),
	icoPTY: BluetoothStruct.bit(),
	icoTA: BluetoothStruct.bit(),
	icoTP: BluetoothStruct.bit(),
	icoAUTOM: BluetoothStruct.bit(),
	charS1: BluetoothStruct.bit(),
	charS2: BluetoothStruct.bit(),
	charS3: BluetoothStruct.bit(),
	charS4: BluetoothStruct.bit(),
	btnChange: BluetoothStruct.bit(),
	btnInfo: BluetoothStruct.bit(),
	btnClock: BluetoothStruct.bit(),
	btnClockM: BluetoothStruct.bit(),
	btnClockH: BluetoothStruct.bit(),
	btnClockRM: BluetoothStruct.bit(),
	flgClock24: BluetoothStruct.bit(),
	buffer: BluetoothStruct.char(12)
};
