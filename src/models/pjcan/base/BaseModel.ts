import { IBluetoothStruct } from "@/components/bluetooth/IBluetoothStruct";

export const API_CANBUS_EVENT = "Canbus";

/** Базовая модель */
export class BaseModel
{
	readonly exec: number;
	readonly highPriority: boolean;
	isData: boolean = false;

	constructor(exec: number, highPriority: boolean = false)
	{
		this.exec = exec;
		this.highPriority = highPriority;
	}

	/**
	 * Запись данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} size Размер данных
	 * @param {IBluetoothStruct} struct Структура данных
	 * @param {DataView} buf Буфер данных
	 * @protected
	 */
	protected _set(th: any, exec: number, size: number, struct: IBluetoothStruct, buf: DataView): boolean
	{
		const id = buf.getUint8(0);
		const sizeData = buf.byteLength >= 3 ? buf.getUint16(1, true) : 0;
		const result = id === exec && sizeData === size;
		if (result)
		{
			try
			{
				struct.decode(buf, th, 3);
				this.isData = true;
			}
			catch (e)
			{
				console.log(e);
			}
		}
		return result;
	}

	/**
	 * Чтение данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} size Длина данных
	 * @param {IBluetoothStruct} struct Структура данных
	 */
	protected _get(th: any, exec: number, size: number = 0, struct?: IBluetoothStruct): DataView
	{
		const buf: DataView = new DataView(new ArrayBuffer(size + 3));
		buf.setUint8(0, exec);
		buf.setUint16(1, size, true);
		if (size > 0)
		{
			try
			{
				struct?.encode(buf, th, 3);
			}
			catch (e)
			{
				console.log(e);
				buf.setUint16(1, 0, true);
			}
		}
		return buf;
	}
}
