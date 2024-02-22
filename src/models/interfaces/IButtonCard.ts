import { IButtonConfigItem } from "../pjcan/buttons";

export interface IButtonCard {
	id: number;
	title: string;
	icon: string;
	config?: IButtonConfigItem;
	configLoaded?: boolean;
}
