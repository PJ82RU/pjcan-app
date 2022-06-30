import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ICardSectionSelect extends ICardSection {
	comment?: string;
	options?: any;
	disable?: boolean;
	readonly?: boolean;
}
