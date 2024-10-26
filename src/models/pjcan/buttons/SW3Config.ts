import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ISW3Config } from "./ISW3Config";
import { ISW3ConfigButton } from "./ISW3ConfigButton";
import { TButtonExec } from "./TButtonExec";

export const API_SW3_CONFIG_EXEC = 0x3a;
export const API_SW3_CONFIG_EVENT = "SW3Config";

/** Модель конфигурации кнопок */
export class SW3Config extends BaseModel implements ISW3Config
{
	static struct: any = {
		buttons: BluetoothStruct.struct(
			{
				id: BluetoothStruct.uint8(),
				resistanceTo: BluetoothStruct.uint16(),
				exec: BluetoothStruct.uint8()
			},
			7
		)
	};
	static size: number = 28;

	buttons = [] as ISW3ConfigButton[];

	constructor(exec: number = API_SW3_CONFIG_EXEC, data?: DataView)
	{
		super(exec);
		for (let i = 0; i < 6; i++)
		{
			const item: ISW3ConfigButton = {
				id: 0,
				resistanceTo: 0,
				exec: TButtonExec.BUTTON_EXEC_NONE
			} as ISW3ConfigButton;
			this.buttons.push(item);
		}
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, SW3Config.size, new BluetoothStruct(SW3Config.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, SW3Config.size, new BluetoothStruct(SW3Config.struct));
	}

	/**
	 * Запись параметров кнопки
	 * @param {IButtonConfigItem} value Новое значение
	 */
	setButton(value: ISW3ConfigButton): boolean
	{
		const index = this.buttons.findIndex((x: ISW3ConfigButton) => x.id === value.id);
		if (index < 0) return false;

		const button = this.buttons[index];
		button.id = value.id;
		button.resistanceTo = value.resistanceTo;
		button.exec = value.exec;
		return true;
	}
}
