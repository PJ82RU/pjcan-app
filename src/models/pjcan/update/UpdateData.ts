import EventEmitter from "eventemitter3";
import { IUpdateData } from "./IUpdateData";

export const API_EXEC_UPDATE_UPLOAD_GZ = 92;
export const API_SIZE_UPDATE_UPLOAD_GZ = 511;
export const UPDATE_UPLOAD_EVENT_RESULT = "UploadResult";

/** Модель загрузки данных прошивки */
export class UpdateData extends EventEmitter implements IUpdateData
{
	data = new Uint8Array(0);
	offset = 0;
	last = false;
	get uploading(): number
	{
		return this.offset > 0 ? this.offset / this.data.byteLength : 0;
	}

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/** Очистить данные */
	clear(): void
	{
		this.data = new Uint8Array(0);
		this.offset = 0;
		this.last = false;
	}
	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): void
	{
		if (buf.getUint8(0) === API_EXEC_UPDATE_UPLOAD_GZ && buf.byteLength === 2)
		{
			this.last = buf.getUint8(1) === 0;
			this.emit(UPDATE_UPLOAD_EVENT_RESULT, this.last);
		}
	}

	/** Чтение данных */
	get(): DataView
	{
		let size = this.data.byteLength - this.offset;
		if (size < 0) size = 0;
		else if (size > API_SIZE_UPDATE_UPLOAD_GZ) size = API_SIZE_UPDATE_UPLOAD_GZ;

		const buf: Uint8Array = new Uint8Array(size + 1);
		buf[0] = API_EXEC_UPDATE_UPLOAD_GZ;
		for (let i = 0; i < size; i++)
		{
			buf[i + 1] = this.data[this.offset];
			this.offset++;
		}
		return new DataView(buf.buffer);
	}
}
