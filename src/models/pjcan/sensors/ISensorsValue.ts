import { IBaseModel } from "../base";

/** Интерфейс значений датчиков */
export interface ISensorsValue extends IBaseModel {
	acc: boolean; // Сигнал АСС
	handbrake: boolean; // Ручной тормоз
	reverse: boolean; // Задний ход автомобиля
	seatbeltDriver: boolean; // Ремень безопасности водителя
	seatbeltPassenger: boolean; // Ремень безопасности пассажира
	turnSignalLeft: boolean; // Сигнал левого поворота
	turnSignalRight: boolean; // Сигнал правого поворота
	highBeam: boolean; // Дальний свет фар
}
