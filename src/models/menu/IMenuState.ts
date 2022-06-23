import { IItemMenuState } from './IItemMenuState';

interface IMenuState {
	header: IItemMenuState[];
	main: IItemMenuState[];
	actions: IItemMenuState[];
	footer: IItemMenuState[];

	popupDevice: IItemMenuState[];
	popupMain: IItemMenuState[];
}

export { IMenuState };
