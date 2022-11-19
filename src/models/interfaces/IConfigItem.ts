import { IButtonsConfigItem, TButtonItem } from "../pjcan/button";

export interface IConfigItem {
	title: string;
	type: TButtonItem;
	item: IButtonsConfigItem | undefined;
	icon: string;
}
