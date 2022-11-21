import { TButtonItem } from "../pjcan/button";

export interface IConfigItem {
	title: string;
	type: TButtonItem;
	icon: string;
	inR: number;
	pressSingle: number;
	pressDual: number;
	pressTriple: number;
	pressHold: number;
	release: number;
}
