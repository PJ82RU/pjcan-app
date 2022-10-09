import EventEmitter from "eventemitter3";

/** Интерфейс начала обновления прошивки устройства */
export interface IUpdateBegin extends EventEmitter {
	set: (buf: DataView) => void;
	get: () => DataView;
}
