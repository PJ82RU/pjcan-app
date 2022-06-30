import { TItemMenu } from '@/models/menu/TItemMenu';

export const menuHeader = [{ type: TItemMenu.ONBOARD, name: 'on-board', lang: 'Onboard', size: 26 }];
export const menuMain = [
	{ type: TItemMenu.FUEL, name: 'fuel', lang: 'Fuel', size: 24 },
	{ type: TItemMenu.ENGINE, name: 'engine', lang: 'Engine', size: 24 },
	{ type: TItemMenu.DOORS, name: 'doors', lang: 'Doors', size: 21 },
	{ type: TItemMenu.SPEEDOMETER, name: 'speedometer', lang: 'Speedometer', size: 26 },
	{ type: TItemMenu.CLIMATE, name: 'climate', lang: 'Climate', size: 26 }
];
export const menuActions = [{ type: TItemMenu.OPTIONS2, name: 'options2', lang: 'SetTime', size: 24 }];
export const menuFooter = [{ type: TItemMenu.OPTIONS, name: 'options', lang: 'Setting', size: 24 }];
