import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { IButtonsConfig } from "./IButtonsConfig";
import { IButtonConfigItem } from "./IButtonConfigItem";

export const API_BUTTONS_SW1_CONFIG_EXEC = 0x30;
export const API_BUTTONS_SW1_CONFIG_EVENT = "ButtonsSW1Config";

export const API_BUTTONS_SW3_CONFIG_EXEC = 0x3a;
export const API_BUTTONS_SW3_CONFIG_EVENT = "ButtonsSW3Config";

/** Модель конфигурации кнопок */
export class ButtonsConfig extends BaseModel implements IButtonsConfig
{
	static struct: any = {
		enabled: BluetoothStruct.bit(),
		sendValue: BluetoothStruct.bit(),
		range: BluetoothStruct.uint16(),
		items: BluetoothStruct.struct(
			{
				extended: BluetoothStruct.bit(),
				hold: BluetoothStruct.uint8(),
				resistance: BluetoothStruct.uint16(),
				exec: BluetoothStruct.uint8(5),
				execMode: BluetoothStruct.uint8(5)
			},
			7
		)
	};
	static size: number = 101;

	enabled = false;
	range = 0;
	sendValue = false;
	items = [] as IButtonConfigItem[];

	api_exec = 0;

	constructor(exec: number, data?: DataView)
	{
		super();
		this.api_exec = exec;
		for (let i = 0; i < 7; i++)
		{
			const item: IButtonConfigItem = {
				extended: false,
				hold: 0,
				resistance: 0,
				exec: [],
				execMode: []
			} as IButtonConfigItem;
			for (let j = 0; j < 5; j++) item.exec.push(0);
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
		return this._set(this, this.api_exec, ButtonsConfig.size, new BluetoothStruct(ButtonsConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.api_exec)
			: this._get(this, this.api_exec, ButtonsConfig.size, new BluetoothStruct(ButtonsConfig.struct));
	}
}
