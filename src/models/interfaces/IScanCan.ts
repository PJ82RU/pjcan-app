import { IScanCanRow } from "./IScanCanRow";

export interface IScanCan {
	mac: string;
	rows: IScanCanRow[]
}
