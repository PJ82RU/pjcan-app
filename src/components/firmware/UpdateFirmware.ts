// noinspection JSUnusedGlobalSymbols

import axios from "axios";
import canbus, { API_EVENT_UPDATE_BEGIN_GZ, API_EVENT_UPDATE_UPLOAD_GZ } from "@/api/canbus";
import { IVersion, Version } from "@/models/pjcan/version";
import { IUpdateBegin, IUpdateData, UPDATE_UPLOAD_EVENT_RESULT, UpdateBegin, UpdateData } from "@/models/pjcan/update";

const URL_FIRMWARE_PATH = location.href + "firmware/";
const URL_FIRMWARE_VERSION = URL_FIRMWARE_PATH + "version.json";
const URL_FIRMWARE_GZIP = URL_FIRMWARE_PATH + "firmware.bin.gz";

/** Обновление прошивки устройства PJ CAN */
export class UpdateFirmware
{
	/** Новая версия прошивки */
	newVersion: IVersion = new Version();
	/** Результат загрузки */
	resultUpload: IUpdateData = new UpdateData();
	/** Результат начала обновления */
	resultBegin: IUpdateBegin = new UpdateBegin();
	/** Статус обновления */
	isUpdated: boolean = false;
	/** Процент загрузки прошивки на устройство PJ CAN */
	get uploading(): number
	{
		return this.resultUpload.offset > 0 ? this.resultUpload.offset / this.resultUpload.data.byteLength : 0;
	}

	constructor()
	{
		canbus.addListener(API_EVENT_UPDATE_BEGIN_GZ, (data: DataView) => this.resultBegin.set(data));
		canbus.addListener(API_EVENT_UPDATE_UPLOAD_GZ, (data: DataView) => this.resultUpload.set(data));

		this.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, (res: boolean) => this.onUpload(res));
	}

	/** Очистить значения */
	clear(): void
	{
		this.newVersion.clear();
		this.resultUpload.clear();
	}

	/** Проверить версию прошивки */
	checkNewVersion(): Promise<void>
	{
		return new Promise((resolve, reject) =>
		{
			axios({
				url: URL_FIRMWARE_VERSION,
				method: "GET"
			})
				.then((res: any) =>
				{
					// проверяем версию прошивки
					if (res.data?.current?.length === 4)
					{
						const ver = res.data.current;
						this.newVersion.major = ver[0];
						this.newVersion.minor = ver[1];
						this.newVersion.build = ver[2];
						this.newVersion.revision = ver[3];

						if (!canbus.version.compare(this.newVersion)) resolve();
						else reject("Current version");
					}
					else reject("No data");
				})
				.catch((e) => reject(e));
		});
	}

	/** Пишем данные файла прошивки в устройство PJ CAN */
	private onUpload(result: boolean): void
	{
		if (result && this.resultUpload.offset < this.resultUpload.data.byteLength)
		{
			canbus.bluetooth.send(this.resultUpload.get()).then();
		}
	}

	/** Загрузка прошивки */
	upload(): void
	{
		axios({
			url: URL_FIRMWARE_GZIP,
			method: "GET",
			responseType: "arraybuffer",
			headers: { "Content-Type": "application/gzip" }
		}).then((res: any) =>
		{
			if (res.data.byteLength > 0)
			{
				setTimeout(async () =>
				{
					this.resultUpload.data = new Uint8Array(res.data);
					this.resultUpload.offset = 0;
					await this.onUpload(true);
				}, 1000);
			}
		});
	}

	/** Начать прошивку устройства */
	begin(): void
	{
		canbus.bluetooth.send(this.resultBegin.get()).then();
	}
}

const update = new UpdateFirmware();
export default update;
