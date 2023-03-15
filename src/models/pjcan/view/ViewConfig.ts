import { IViewConfig } from "./IViewConfig";
import { TViewType } from "./TViewType";

export const API_VIEW_SIZE = 4;

/** Модель параметров отображения */
export class ViewConfig implements IViewConfig
{
	enabled = false;
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;
}
