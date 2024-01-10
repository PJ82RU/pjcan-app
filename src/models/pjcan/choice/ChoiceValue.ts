import { BaseModel } from "../base";
import { IChoiceValue } from "./IChoiceValue";

export const API_CHOICE_EXEC = 0x10;

/** Модель выборочного запроса данных */
export class ChoiceValue extends BaseModel implements IChoiceValue
{
	listID: number[] = [];

	constructor(data?: DataView, fn?: (res: DataView) => void)
	{
		super(API_CHOICE_EXEC);
		if (data && fn) this.parse(data, fn);
	}

	/**
	 * Разбор выборочных данных
	 * @param {DataView} data Данные
	 * @param {function} fn Метод входящих данных
	 */
	parse(data: DataView, fn: (res: DataView) => void)
	{
		const data_size = data.getUint16(1, true);
		if (data_size === 0 || data_size + 3 > data.byteLength) return;

		let offset = 3;
		while (offset < data_size)
		{
			const id = data.getUint8(0);
			const size = data.getUint16(offset + 1, true);
			const frame_size = size + 3;
			if (offset + frame_size > data.byteLength) break;

			if (id !== this.exec) fn(new DataView(data.buffer.slice(offset, frame_size)));
			offset += frame_size;
		}
	}

	set(buf: DataView): boolean
	{
		return false;
	}

	/** Чтение данных */
	get(): DataView
	{
		const buf: DataView = new DataView(new ArrayBuffer(this.listID.length + 3));
		buf.setUint8(0, this.exec);
		buf.setUint16(1, this.listID.length, true);
		this.listID.forEach((id: number, index: number) => buf.setUint8(3 + index, id));
		return buf;
	}
}
