import { IUpdateData } from "./IUpdateData";
import { IUpdateBegin } from "./IUpdateBegin";

export interface IUpdateResult {
	/** Результат загрузки */
	upload: IUpdateData;
	/** Результат начала обновления */
	begin: IUpdateBegin;
}
