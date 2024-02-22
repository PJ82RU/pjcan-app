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
		programming: BluetoothStruct.bit(),
		items: BluetoothStruct.struct(
			{
				extended: BluetoothStruct.bit(),
				id: BluetoothStruct.uint8(),
				hold: BluetoothStruct.uint8(),
				resistance_min: BluetoothStruct.uint16(),
				resistance_max: BluetoothStruct.uint16(),
				exec: BluetoothStruct.uint8(5),
				execMode: BluetoothStruct.uint8(5)
			},
			7
		)
	};
	static size: number = 108;

	enabled = false;
	programming = false;
	items = [] as IButtonConfigItem[];

	constructor(exec: number = API_BUTTONS_SW1_CONFIG_EXEC, data?: DataView)
	{
		super(exec);
		for (let i = 0; i < 7; i++)
		{
			const item: IButtonConfigItem = {
				extended: false,
				hold: 0,
				resistance_min: 0,
				resistance_max: 0,
				exec: new Array(5),
				execMode: new Array(5)
			} as IButtonConfigItem;
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
		return this._set(this, this.exec, ButtonsConfig.size, new BluetoothStruct(ButtonsConfig.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, ButtonsConfig.size, new BluetoothStruct(ButtonsConfig.struct));
	}
}
