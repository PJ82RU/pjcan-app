/** Интерфейс версии */
export interface IVersion {
	major: number;
	minor: number;
	build: number;
	revision: number;
	is: boolean;
	toString: string;

	compare: (ver: IVersion, len: number) => number;
	clear: () => void;
}
