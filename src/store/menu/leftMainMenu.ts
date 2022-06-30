import { EItemMenu } from '@/models/menu/EItemMenu';

export const menuHeader = [{ type: EItemMenu.ONBOARD, name: 'on-board', lang: 'Onboard', size: 26 }];
export const menuMain = [
	{ type: EItemMenu.FUEL, name: 'fuel', lang: 'Fuel', size: 24 },
	{ type: EItemMenu.ENGINE, name: 'engine', lang: 'Engine', size: 24 },
	{ type: EItemMenu.DOORS, name: 'doors', lang: 'Doors', size: 21 },
	{ type: EItemMenu.SPEEDOMETER, name: 'speedometer', lang: 'Speedometer', size: 26 },
	{ type: EItemMenu.CLIMATE, name: 'climate', lang: 'Climate', size: 26 }
];
export const menuActions = [{ type: EItemMenu.OPTIONS2, name: 'options2', lang: 'SetTime', size: 24 }];
export const menuFooter = [{ type: EItemMenu.OPTIONS, name: 'options', lang: 'Setting', size: 24 }];
