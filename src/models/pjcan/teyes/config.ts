import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_TEYES_CONFIG = 30; // команда API
const STRUCT_LENGTH = 2; // длина данных API

/** Интерфейс параметров Teyes */
export interface ITeyesConfig extends IBaseModel {
	receiveClock: boolean;
	receiveButtons: boolean;
	receiveText: boolean;
	sendButton: boolean;
	sendClimat: boolean;
	sendDoors: boolean;
	parseVolume: boolean;
	lcdShow: boolean;
}

/** Структура данных */
export const StructTeyesConfig = {
	receiveClock: Struct.bit(),
	receiveButtons: Struct.bit(),
	receiveText: Struct.bit(),
	sendButton: Struct.bit(),
	sendClimat: Struct.bit(),
	sendDoors: Struct.bit(),
	parseVolume: Struct.bit(),
	lcdShow: Struct.bit()
};

const struct = new Struct(StructTeyesConfig);

/** Модель параметров Teyes */
export class TeyesConfig extends BaseModel implements ITeyesConfig {
	receiveClock = false;
	receiveButtons = false;
	receiveText = false;
	sendButton = false;
	sendClimat = false;
	sendDoors = false;
	parseVolume = false;
	lcdShow = false;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_TEYES_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_TEYES_CONFIG, STRUCT_LENGTH, struct);
	}
}
