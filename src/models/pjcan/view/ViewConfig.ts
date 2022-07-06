import { BluetoothStruct } from '@/components/bluetooth';

/** Тип отображения текста */
export enum TViewType {
	VIEW_TEXT_SIMPLE = 0, // простое отображение текста
	VIEW_TEXT_FLICKERING = 1, // мигающий текст
	VIEW_TEXT_TICKER = 2 // бегущая строка
}

/** Интерфейс параметров отображения */
export interface IViewConfig {
	enabled: boolean; // Вкл/выкл отображения
	type: TViewType; // Тип отображения текста
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
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;
}
