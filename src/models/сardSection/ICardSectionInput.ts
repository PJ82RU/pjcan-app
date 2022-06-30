import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ICardSectionInput extends ICardSection {
	comment?: string;
	placeholder?: string;
	disable?: boolean;
	readonly?: boolean;
	min?: number;
	max?: number;
}
