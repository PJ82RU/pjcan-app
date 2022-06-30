import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ICardSectionTime extends ICardSection {
	comment?: string;
	realtime?: boolean;
	color?: string;
	readonly?: boolean;
}
