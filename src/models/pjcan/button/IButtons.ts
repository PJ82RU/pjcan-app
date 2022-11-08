import { IButtonsConfig } from "./IButtonsConfig";
import { IButtonValue } from "./IButtonValue";

export interface IButtons {
	/** Конфигурация кнопок */
	config: IButtonsConfig;
	/** Значения кнопки */
	value: IButtonValue;
}
