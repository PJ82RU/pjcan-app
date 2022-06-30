import { ICardSection } from '@/models/сardSection/ICardSection';

export interface ITimeCardSection extends ICardSection {
	comment?: string;
	realtime?: boolean;
	color?: string;
	readonly?: boolean;
}
