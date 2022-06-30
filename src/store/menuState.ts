import { IMenuState } from '@/models/menu';
import { EItemMenuState } from '@/models/menu/EItemMenuState';

const menuState: IMenuState = {
	// левое меню
	header: [{ type: EItemMenuState.ONBOARD, name: 'on-board', lang: 'Onboard', size: 26 }],
	main: [
		{ type: EItemMenuState.FUEL, name: 'fuel', lang: 'Fuel', size: 24 },
		{ type: EItemMenuState.ENGINE, name: 'engine', lang: 'Engine', size: 24 },
		{ type: EItemMenuState.DOORS, name: 'doors', lang: 'Doors', size: 21 },
		{ type: EItemMenuState.SPEEDOMETER, name: 'speedometer', lang: 'Speedometer', size: 26 },
		{ type: EItemMenuState.CLIMATE, name: 'climate', lang: 'Climate', size: 26 }
	],
	actions: [{ type: EItemMenuState.OPTIONS2, name: 'options2', lang: 'SetTime', size: 24 }],
	footer: [{ type: EItemMenuState.OPTIONS, name: 'options', lang: 'Setting', size: 24 }],

	// всплывающее правое меню
	popupDevice: [{ type: EItemMenuState.DEVICE_INFO, lang: 'DeviceInfo' }],
	popupMain: [{ type: EItemMenuState.ABOUT, lang: 'About' }],

	// всплывающее меню CardSection
	popupCardSection: [{ type: EItemMenuState.SETTING_LCD, lang: 'SettingLCD' }]
};

export default menuState;
