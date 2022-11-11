/** Интерфейс версии */
export interface IVersion {
	major: number;
	minor: number;
	build: number;
	revision: number;
	is: boolean;
	toString: string;

	clear: () => void;
	set: (buf: DataView) => void;
	get: () => DataView;
	compare: (ver: IVersion) => number;
}
