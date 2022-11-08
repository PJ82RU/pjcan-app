import { ITeyesConfig } from "./ITeyesConfig";
import { ITeyesText } from "./ITeyesText";
import { ITeyesView } from "./ITeyesView";

export interface ITeyes {
	/** Конфигурация Teyes */
	config: ITeyesConfig;
	/** Текст Teyes */
	text: ITeyesText;
	/** Конфигурация отображения значений Teyes */
	view: ITeyesView
}
