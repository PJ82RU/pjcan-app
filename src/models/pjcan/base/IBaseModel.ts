import { Timeout } from "../../types/Timeout";

/** Базовый интерфейс */
export interface IBaseModel {
	protocol: number;
	exec: number;
	highPriority: boolean;
	skipActivationCheck: boolean;
	id: number;
	isData: boolean;
	lastSend?: number;
	timeout?: Timeout;
	set: (buf: DataView) => boolean;
	get: (request?: boolean) => DataView;
}
