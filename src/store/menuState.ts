import { IMenuState } from '@/models/menu';

const menuState: IMenuState = {
	header: [{ name: 'on-board', lang: 'Onboard', size: 26 }],
	main: [
		{ name: 'fuel', lang: 'Fuel', size: 24 },
		{ name: 'engine', lang: 'Engine', size: 24 },
		{ name: 'doors', lang: 'Doors', size: 21 },
		{ name: 'speedometer', lang: 'Speedometer', size: 26 },
		{ name: 'climate', lang: 'Climate', size: 26 }
	],
	actions: [{ name: 'options2', lang: 'SetTime', size: 24 }],
	footer: [{ name: 'options', lang: 'Setting', size: 24 }],

	popupDevice: [{ lang: 'DeviceInfo' }],
	popupMain: [{ lang: 'About' }]
};

export default menuState;
