import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ISelectCardSection extends ICardSection {
	comment?: string;
	options?: any;
	disable?: boolean;
	readonly?: boolean;
}
