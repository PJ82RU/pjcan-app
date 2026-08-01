import { IViewConfig } from "@/models/pjcan/view";

export interface IMenuItem {
	id?: number;
	title: string;
	disabled?: boolean;
	view?: IViewConfig;
}
