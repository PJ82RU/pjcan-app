import { IBaseModel } from "../../base";
import { IViewConfig } from "../../view";

/** Интерфейс значений тестирования */
export interface ITestValue extends IBaseModel {
	text: string;
	view: IViewConfig;
}
