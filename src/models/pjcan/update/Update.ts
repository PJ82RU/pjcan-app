import EventEmitter from "eventemitter3";
import { IUpdate } from "./IUpdate";
import { BluetoothStruct } from "@/components/bluetooth";

export const API_UPDATE_EXEC = 90;
export const API_UPDATE_EVENT = "Update";
export const API_UPDATE_EVENT_ERROR = "ErrorUpdate";
export const UPDATE_VALUE_DATA_SIZE = 496;

/** Модель обновления прошивки */
export class Update extends EventEmitter implements IUpdate
{
	static struct: any = {
		begin: BluetoothStruct.bit(),
		end: BluetoothStruct.bit(),
		abort: BluetoothStruct.bit(),
		encrypt: BluetoothStruct.bit(),
		iv: BluetoothStruct.bit(),
		total: BluetoothStruct.uint32(),
		size: BluetoothStruct.uint16()
	};
	static size: number = 503;

	firmwareUrl = "";
	firmwareData = new Uint8Array(0);
	offset = 0;
	error = 0;
	get uploading(): number
	{
		return this.offset > 0 ? this.offset / this.total : 0;
	}

	encrypt = false;
	iv = false;
	ivData = new Uint8Array(0);

	begin = false;
	end = false;
	abort = false;
	total = 0;
	size = 0;

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/** Очистить данные */
	clear(): void
	{
		this.firmwareData = new Uint8Array(0);
		this.offset = 0;
		this.error = 0;
		this.begin = false;
		this.end = false;
		this.abort = false;
		this.encrypt = false;
		this.total = 0;
		this.size = 0;
	}

	/**
	 * Записать значение IV
	 * @param res
	 */
	setIV(res: string): boolean
	{
		this.iv = !!res && res?.length % 2 === 0 && /^[a-f\d]+$/i.test(res);
		if (this.iv)
		{
			this.ivData = new Uint8Array(res.length / 2);
			let pos = 0;
			for (let i = 0; i < res.length; i += 2)
			{
				this.ivData[pos] = parseInt(res.substring(i, i + 2), 16);
				pos++;
			}
		}
		return this.iv;
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): void
	{
		if (buf.getUint8(0) === API_UPDATE_EXEC && buf.byteLength === 2)
		{
			this.error = buf.getUint8(1);
			this.emit(API_UPDATE_EVENT, this.error);
		}
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		try
		{
			const buf: DataView = new DataView(new ArrayBuffer(Update.size + 1));
			buf.setUint8(0, API_UPDATE_EXEC);

			this.begin = !this.begin && this.offset === 0;
			if (this.begin && this.encrypt && this.iv)
			{
				this.size = this.ivData.length;
				for (let i = 0; i < this.size; i++)
				{
					buf.setUint8(8 + i, this.ivData[i]);
				}
			}
			else
			{
				this.size = this.total - this.offset;
				if (this.size > UPDATE_VALUE_DATA_SIZE) this.size = UPDATE_VALUE_DATA_SIZE;
				else if (this.size < 0) this.size = 0;

				for (let i = 0; i < this.size; i++)
				{
					buf.setUint8(8 + i, this.firmwareData[this.offset]);
					this.offset++;
				}
			}

			this.end = this.offset >= this.total;
			new BluetoothStruct(Update.struct)?.encode(buf, this, 1);
			return buf;
		}
		catch (e)
		{
			console.log(e);
		}
	}
}
