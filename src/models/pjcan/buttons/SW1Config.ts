import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ISW1Config } from "./ISW1Config";
import { ISW1ConfigButton } from "./ISW1ConfigButton";

export const API_SW1_CONFIG_EXEC = 0x30;
export const API_SW1_CONFIG_EVENT = "SW1Config";

export const SW1_CONFIG_RESISTANCE_MIN = 0;
export const SW1_CONFIG_RESISTANCE_MAX = 3799;

/** Модель конфигурации кнопок */
export class SW1Config extends BaseModel implements ISW1Config
{
	static struct: any = {
		hold: BluetoothStruct.uint8(),
		buttons: BluetoothStruct.struct(
			{
				extended: BluetoothStruct.bit(),
				swtch: BluetoothStruct.bit(),
				id: BluetoothStruct.uint8(),
				resistanceTo: BluetoothStruct.uint16(),
				exec: BluetoothStruct.uint8(4),
				execMode: BluetoothStruct.uint8(4)
			},
			6
		)
	};
	static size: number = 73;

	hold = 0;
	buttons = [] as ISW1ConfigButton[];

	constructor(exec: number = API_SW1_CONFIG_EXEC, data?: DataView)
	{
		super(exec);
		for (let i = 0; i < 6; i++)
		{
			const item: ISW1ConfigButton = {
				extended: false,
				swtch: false,
				id: 0,
				resistanceTo: 0,
				exec: new Array(4),
				execMode: new Array(4)
			} as ISW1ConfigButton;
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
		return this._set(this, this.exec, SW1Config.size, new BluetoothStruct(SW1Config.struct), buf);
	}

	/**
	 * Чтение данных
	 * @param {boolean} request Только запрос
	 */
	get(request?: boolean): DataView
	{
		return request
			? this._get(this, this.exec)
			: this._get(this, this.exec, SW1Config.size, new BluetoothStruct(SW1Config.struct));
	}

	/**
	 * Запись параметров кнопки
	 * @param {IButtonConfigItem} value Новое значение
	 */
	setButton(value: ISW1ConfigButton): boolean
	{
		const index = this.buttons.findIndex((x: ISW1ConfigButton) => x.id === value.id);
		if (index < 0) return false;

		const button = this.buttons[index];
		button.extended = value.extended;
		button.swtch = value.swtch;
		button.id = value.id;
		button.resistanceTo = value.resistanceTo;
		button.exec = [...value.exec];
		button.execMode = [...value.execMode];
		return true;
	}
}
