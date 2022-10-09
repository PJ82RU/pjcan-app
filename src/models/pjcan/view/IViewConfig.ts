import { TViewType } from "./TViewType";

/** Интерфейс параметров отображения */
export interface IViewConfig {
	enabled: boolean; // Вкл/выкл отображения
	type: TViewType; // Тип отображения текста
	time: number; // Время отображения на LCD, сек.
}
