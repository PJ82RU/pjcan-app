import EventEmitter from "eventemitter3";
import { IDeviceUpdate } from "./IDeviceUpdate";
import { BluetoothStruct } from "@/components/bluetooth";
import { EDeviceUpdateError } from "./EDeviceUpdateError";

export const API_DEVICE_UPDATE_EXEC = 0x05;
export const API_DEVICE_UPDATE_EVENT = "DeviceUpdate";
export const API_DEVICE_UPDATE_EVENT_ERROR = "DeviceUpdateError";

/** Модель обновления прошивки */
export class DeviceUpdate extends EventEmitter implements IDeviceUpdate
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
	error = EDeviceUpdateError.UPD_OK;
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

	highPriority = true;

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
		const id = buf.getUint8(0);
		const sizeData = buf.byteLength >= 3 ? buf.getUint16(1, true) : 0;
		const result = id === API_DEVICE_UPDATE_EXEC && sizeData === 1;
		if (result)
		{
			this.error = buf.getUint8(3);
			this.emit(API_DEVICE_UPDATE_EVENT, this.error);
		}
	}

	/** Чтение данных */
	get(): DataView
	{
		const buf: DataView = new DataView(new ArrayBuffer(DeviceUpdate.size + 3));
		buf.setUint8(0, API_DEVICE_UPDATE_EXEC);
		buf.setUint16(1, DeviceUpdate.size, true);
		try
		{
			this.begin = !this.begin && this.offset === 0;
			if (this.begin && this.encrypt && this.iv)
			{
				this.size = this.ivData.length;
				for (let i = 0; i < this.size; i++)
				{
					buf.setUint8(10 + i, this.ivData[i]);
				}
			}
			else
			{
				this.size = this.total - this.offset;
				if (this.size > 496) this.size = 496;
				else if (this.size < 0) this.size = 0;

				for (let i = 0; i < this.size; i++)
				{
					buf.setUint8(10 + i, this.firmwareData[this.offset]);
					this.offset++;
				}
			}
			this.end = this.offset >= this.total;
			new BluetoothStruct(DeviceUpdate.struct)?.encode(buf, this, 3);
		}
		catch (e)
		{
			console.log(e);
			buf.setUint16(1, 0, true);
		}
		return buf;
	}
}
