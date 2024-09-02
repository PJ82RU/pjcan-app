import { IBaseModel } from "../base";

/** Интерфейс версии */
export interface IVersion extends IBaseModel {
	major: number;
	minor: number;
	build: number;
	revision: number;
	is: boolean;
	supported: boolean;
	toString: string;

	compare: (ver: IVersion, len: number) => number;
	compareString: (ver: string) => number;
	clear: () => void;
	setVersion: (ver: IVersion) => boolean;
}
