import { BluetoothStruct } from '@/components/bluetooth';

/** Интерфейс параметров отображения */
export interface IViewConfig {
	enabled: boolean; // Вкл/выкл отображения
	type: number; // Тип отображения текста
	time: number; // Время отображения на LCD, сек.
}

/** Структура данных */
export const StructViewConfig = {
	enabled: BluetoothStruct.bit(),
	type: BluetoothStruct.uint8(),
	time: BluetoothStruct.uint16()
};

/** Модель параметров отображения */
export class ViewConfig implements IViewConfig {
	enabled = false;
	type = 0;
	time = 0;
}
