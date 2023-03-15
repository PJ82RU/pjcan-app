import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { StructButtonsConfig, BUTTON_NUMBER, BUTTON_PRESS_TYPE_NUMBER } from "./StructButtonsConfig";
import { IButtonsConfig } from "./IButtonsConfig";
import { IButtonsConfigItem } from "./IButtonsConfigItem";

export const API_BUTTONS_CONFIG_EXEC = 20;
export const API_SIZE_BUTTONS_CONFIG = 63;

const struct = new BluetoothStruct(StructButtonsConfig);

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig
{
	enabled = false;
	out = false;
	reset = false;
	range = 0;
	sendValue = false;
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
		return this._set(this, API_BUTTONS_CONFIG_EXEC, API_SIZE_BUTTONS_CONFIG + 1, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_BUTTONS_CONFIG_EXEC, API_SIZE_BUTTONS_CONFIG + 1, struct);
	}
}
