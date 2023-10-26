import { IBaseModel } from "../base";

/** Интерфейс параметров Teyes */
export interface ITeyesConfig extends IBaseModel {
	receiveClock: boolean;
	receiveButtons: boolean;
	receiveText: boolean;
	sendButton: boolean;
	sendClimate: boolean;
	sendDoors: boolean;
	parseVolume: boolean;
	lcdShow: boolean;
	uartBaud?: number;			// 4.0.2
	reverseUart?: boolean;		// 4.1
}
