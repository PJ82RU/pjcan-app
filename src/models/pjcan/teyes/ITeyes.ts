import { ITeyesConfig } from "./ITeyesConfig";
import { ITeyesText } from "./ITeyesText";
import { IViewConfig } from "../view";

export interface ITeyes {
	config: ITeyesConfig;
	text: ITeyesText;
	textView: IViewConfig;
}
