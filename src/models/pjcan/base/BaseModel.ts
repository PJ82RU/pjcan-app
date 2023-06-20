import { IBluetoothStruct } from "@/components/bluetooth/IBluetoothStruct";

/** Базовая модель */
export class BaseModel
{
	isData: boolean = false;

	/**
	 * Запись данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} len Длина данных API
	 * @param {IBluetoothStruct} struct Структура данных
	 * @param {DataView} buf Буфер данных
	 * @protected
	 */
	protected _set(th: any, exec: number, len: number, struct: IBluetoothStruct, buf: DataView): boolean
	{
		try
		{
			if (buf.getUint8(0) === exec && buf.byteLength === len)
			{
				struct.decode(buf, th, 1);
				this.isData = true;
				return true;
			}
		}
		catch (e)
		{
			console.log(e);
		}
		return false;
	}

	/**
	 * Чтение данных
	 * @param {any} th Объект модели
	 * @param {number} exec Команда API
	 * @param {number} len Длина данных API
	 * @param {IBluetoothStruct} struct Структура данных
	 */
	protected _get(th: any, exec: number, len: number, struct?: IBluetoothStruct): DataView | undefined
	{
		try
		{
			const buf: DataView = new DataView(new ArrayBuffer(len));
			struct?.encode(buf, th, 1);
			buf.setUint8(0, exec);
			return buf;
		}
		catch (e)
		{
			console.log(e);
		}
	}

	/**
	 * Копирование значений объекта на базе IBaseModel
	 * @param res
	 */
	setModel<T>(res: T): void
	{
		for (const key in res)
		{
			// @ts-ignore
			if (this[key] !== undefined) this[key] = res[key];
		}
	}
}
