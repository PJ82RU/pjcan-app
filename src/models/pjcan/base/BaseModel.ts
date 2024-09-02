import { IBluetoothStruct } from "@/components/bluetooth/IBluetoothStruct";

export const API_CANBUS_EVENT = "Canbus";

/** Базовая модель */
export class BaseModel
{
	readonly exec;
	readonly highPriority;
	readonly protocol;
	skipActivationCheck = false;
	id = 0;
	isData = false;

	constructor(exec: number, highPriority: boolean = false, protocol: number = 41)
	{
		this.exec = exec;
		this.highPriority = highPriority;
		this.protocol = protocol;
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
		const offset = this.protocol === 40 ? 1 : 3;
		const id = buf.getUint8(0);
		const result =
			this.protocol === 40
				? id === exec
				: id === exec && (buf.byteLength >= 3 ? buf.getUint16(1, true) : 0) === size;

		if (result)
		{
			try
			{
				struct.decode(buf, th, offset);
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
		const offset = this.protocol === 40 ? 1 : 3;
		const buf: DataView = new DataView(new ArrayBuffer(size + offset));
		buf.setUint8(0, exec);
		if (offset === 3) buf.setUint16(1, size, true);
		if (size > 0)
		{
			try
			{
				struct?.encode(buf, th, offset);
			}
			catch (e)
			{
				console.log(e);
				if (offset === 3) buf.setUint16(1, 0, true);
			}
		}
		return buf;
	}
}
