import { TViewType, IViewConfig } from "./index";

/** Модель параметров отображения */
export class ViewConfig implements IViewConfig
{
	enabled = false;
	type = TViewType.VIEW_TEXT_SIMPLE;
	time = 0;
}
