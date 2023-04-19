import { IBaseModel } from "../base";

/** Интерфейс версии */
export interface IVersion extends IBaseModel {
	major: number;
	minor: number;
	build: number;
	revision: number;
	is: boolean;
	toString: string;

	compare: (ver: IVersion) => number;
	clear: () => void;
}
