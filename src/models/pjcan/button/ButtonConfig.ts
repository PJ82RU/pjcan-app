import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonsConfig } from "./IButtonsConfig";
import { IButtonsConfigItem } from "./IButtonsConfigItem";

export const API_BUTTONS_CONFIG_EXEC = 20;
export const API_BUTTONS_CONFIG_EVENT = "ButtonsConfig";
export const BUTTON_NUMBER = 6; // количество кнопок
export const BUTTON_PRESS_TYPE_NUMBER = 5; // количество типов кнопок

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		out: BluetoothStruct.bit(),
		reset: BluetoothStruct.bit(),
		sendValue: BluetoothStruct.bit(),
		range: BluetoothStruct.uint16(),
		items: BluetoothStruct.struct(
			{
				delayExec: BluetoothStruct.bit(),
				hold: BluetoothStruct.uint8(),
				inR: BluetoothStruct.uint16(),
				outR: BluetoothStruct.uint16(),
				exec: BluetoothStruct.uint8(BUTTON_PRESS_TYPE_NUMBER)
			},
			BUTTON_NUMBER
		)
	};
	static size: number = 69;

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
			const item: IButtonsConfigItem = {
				delayExec: false,
				hold: 0,
				inR: 0,
				outR: 0,
				exec: []
			} as IButtonsConfigItem;
			for (let j = 0; j < BUTTON_PRESS_TYPE_NUMBER; j++) item.exec.push(0);
			this.items.push(item);
		}
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(
			this,
			API_BUTTONS_CONFIG_EXEC,
			ButtonsConfig.size + 1,
			new BluetoothStruct(ButtonsConfig.struct),
			buf
		);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(
			this,
			API_BUTTONS_CONFIG_EXEC,
			ButtonsConfig.size + 1,
			new BluetoothStruct(ButtonsConfig.struct)
		);
	}
}
