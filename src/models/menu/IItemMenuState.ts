import { EItemMenuState } from './EItemMenuState';

export interface IItemMenuState {
	type: EItemMenuState;
	name?: string;
	lang: string;
	size?: string | number;
}
