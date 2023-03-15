import { IViewConfig } from "./IViewConfig";
import { TViewType } from "./TViewType";

/** Модель параметров отображения */
export class ViewConfig implements IViewConfig
{
	enabled = false;
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;
}
