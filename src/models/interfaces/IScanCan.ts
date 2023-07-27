import { IScanCanRow } from "./IScanCanRow";

export interface IScanCan {
	mac: string;
	datetime: string;
	rows: IScanCanRow[]
}
