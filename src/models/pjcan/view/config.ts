import Struct from '@/components/bluetooth/struct';

/** Интерфейс параметров отображения */
export interface IViewConfig {
	enabled: boolean; // Вкл/выкл отображения
	type: number; // Тип отображения текста
	time: number; // Время отображения на LCD, сек.
}

/** Структура данных */
export const StructViewConfig = {
	enabled: Struct.bit(),
	type: Struct.uint8(),
	time: Struct.uint16()
};

/** Модель параметров отображения */
export default class ViewConfig implements IViewConfig {
	enabled = false;
	type = 0;
	time = 0;
}
