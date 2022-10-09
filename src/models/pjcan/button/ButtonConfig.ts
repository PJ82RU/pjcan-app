import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonsConfig, IButtonsConfigItem, StructButtonsConfig } from "./index";

export const API_EXEC_BUTTONS_CONFIG = 20; // команда API
const STRUCT_LENGTH = 63; // длина данных API

export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

const struct = new BluetoothStruct(StructButtonsConfig);

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig
{
	enabled = false;
	out = false;
	reset = false;
	range = 0;
	items = [] as IButtonsConfigItem[];

	constructor(data?: DataView)
	{
		super();
		for (let i = 0; i < BUTTON_NUMBER; i++)
		{
			const item: IButtonsConfigItem = { hold: 0, inR: 0, outR: 0, exec: [] } as IButtonsConfigItem;
			for (let j = 0; j < BUTTON_PRESS_TYPE_NUMBER; j++) item.exec.push(0);
			this.items.push(item);
		}
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_EXEC_BUTTONS_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_EXEC_BUTTONS_CONFIG, STRUCT_LENGTH, struct);
	}
}
