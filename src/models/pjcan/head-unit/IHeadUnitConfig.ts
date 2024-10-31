import { IBaseModel } from "../base";
import { TProtocol } from "./TProtocol";

/** Интерфейс параметров Head Unit */
export interface IHeadUnitConfig extends IBaseModel {
	showTextOfLogo: boolean; // Отображать текст ГУ вместо логотипа
	sendButton: boolean; // Отправлять ГУ нажатие кнопок на руле
	sendClimate: boolean; // Отправлять ГУ значения климата
	sendDoors: boolean; // Отправлять ГУ статусы дверей автомобиля
	sendOnboard: boolean; // Отправлять ГУ статусы дверей и данные БК
	reverseUart: boolean; // Поменять местами контакты RX и TX
	holdToFlip: boolean; // Листать значение уровня громкости при удержании кнопки, если ГУ не поддерживает данный функционал
	protocol: TProtocol; // Протокол
}
