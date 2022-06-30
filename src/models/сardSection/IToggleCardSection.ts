import { ICardSection } from '@/models/сardSection/ICardSection';

export interface IToggleCardSection extends ICardSection {
	comment?: string;
	color?: string;
	disable?: boolean;
}
