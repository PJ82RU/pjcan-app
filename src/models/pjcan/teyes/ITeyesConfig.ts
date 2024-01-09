import { IBaseModel } from "../base";

/** Интерфейс параметров Teyes */
export interface ITeyesConfig extends IBaseModel {
	receiveClock: boolean; // Принимать время ГУ
	receiveButtons: boolean; // Принимать кнопки ГУ: CLOCK, HOUR, MIN
	receiveText: boolean; // Принимать текст ГУ (название радиостанций и др.)
	sendButton: boolean; // Отправлять ГУ нажатие кнопок на руле
	sendClimate: boolean; // Отправлять ГУ значения климата
	sendDoors: boolean; // Отправлять ГУ статусы дверей автомобиля
	parseVolume: boolean; // Парсинг значения уровня звука ГУ
	lcdShow: boolean; // Показать текст ГУ на LCD экране
	reverseUart: boolean; // Поменять местами контакты RX и TX
	protocol: number; // Протокол
}
