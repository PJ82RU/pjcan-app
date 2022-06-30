import { ICardSection } from '@/models/сardSection/ICardSection';

export interface IInputCardSection extends ICardSection {
	comment?: string;
	placeholder?: string;
	disable?: boolean;
	readonly?: boolean;
	min?: number;
	max?: number;
}
