import { Timeout } from "../../types/Timeout";

/** Базовый интерфейс */
export interface IBaseModel {
	exec: number;
	highPriority: boolean;
	id: number;
	isData: boolean;
	lastSend?: number;
	timeout?: Timeout;
	set: (buf: DataView) => boolean;
	get: (request?: boolean) => DataView;
}
