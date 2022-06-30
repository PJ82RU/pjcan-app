import { EItemMenu } from './EItemMenu';

export interface IItemMenu {
	type: EItemMenu;
	name?: string;
	lang: string;
	size?: string | number;
}
