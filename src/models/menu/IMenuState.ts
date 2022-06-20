import { IItemMenuState } from './IItemMenuState';

interface IMenuState {
	header: IItemMenuState[];
	main: IItemMenuState[];
	actions: IItemMenuState[];
	footer: IItemMenuState[];
	popup: IItemMenuState[];
}

export { IMenuState };
