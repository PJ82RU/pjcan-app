import { Timeout } from "../../types/Timeout";

/** Базовый интерфейс */
export interface IBaseModel {
	lastSend?: number;
	timeout?: Timeout;
	set: (buf: DataView) => boolean;
	get: () => DataView;
	isData: boolean;
	requestPriority: boolean;
}
