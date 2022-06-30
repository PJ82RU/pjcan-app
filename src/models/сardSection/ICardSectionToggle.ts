import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ICardSectionToggle extends ICardSection {
	comment?: string;
	color?: string;
	disable?: boolean;
}
