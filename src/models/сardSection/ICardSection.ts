import { TCardSection } from '@/models/сardSection/TCardSection';

export interface ICardSection {
	type: TCardSection;
	title: string;
	value: string | number;
}
