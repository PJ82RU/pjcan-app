import axios from 'axios';
import Store from '@/store';
import UpdateData, { IUpdateData, UPDATE_UPLOAD_EVENT_RESULT } from '@/models/pjcan/update/upload';
import UpdateBegin, { IUpdateBegin } from '@/models/pjcan/update/begin';
import { IVersion, Version } from '@/models/version';

const URL_FIRMWARE_VERSION = '/firmware/version.json';
const URL_FIRMWARE_GZIP = '/firmware/firmware.bin.gz';

/** Обновление прошивки устройства PJCAN */
class UpdateFirmware {
	/** Новая версия прошивки */ //@ts-ignore
	public newVersion: IVersion;
	/** Результат загрузки */ //@ts-ignore
	public resultUpload: IUpdateData;
	/** Результат начала обновления */ //@ts-ignore
	public resultBegin: IUpdateBegin;
	/** Процент загрузки прошивки на устройство PJCAN */
	public get uploading(): number {
		return this.resultUpload.offset > 0 ? this.resultUpload.offset / this.resultUpload.data.byteLength : 0;
	}

	constructor() {
		this.clear();
	}

	/** Очистить значения */
	public clear(): void {
		this.newVersion = new Version();
		this.resultUpload = new UpdateData();
		this.resultBegin = new UpdateBegin();

		this.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, (res) => this.onUpload(res));
	}

	/** Проверить версию прошивки */
	public checkNewVersion(): Promise<void> {
		return new Promise((resolve, reject) => {
			axios({
				url: URL_FIRMWARE_VERSION,
				method: 'GET'
			})
				.then((res: any) => {
					// проверяем версию прошивки
					if (res.data?.current?.length === 4) {
						const ver = res.data.current;
						this.newVersion.major = ver[0];
						this.newVersion.minor = ver[1];
						this.newVersion.build = ver[2];
						this.newVersion.revision = ver[3];

						if (!Store.version.compare(this.newVersion)) resolve();
						else reject('Current version');
					} else reject('No data');
				})
				.catch((e) => reject(e));
		});
	}

	/** Пишем данные файла прошивки в устройство PJCAN */
	private onUpload(result: boolean): void {
		if (result && this.resultUpload.offset < this.resultUpload.data.byteLength)
			Store.bluetooth.send(this.resultUpload.get());
	}

	/** Загрузка прошивки */
	public upload(): void {
		axios({
			url: URL_FIRMWARE_GZIP,
			method: 'GET',
			responseType: 'arraybuffer',
			headers: { 'Content-Type': 'application/gzip' }
		}).then((res: any) => {
			if (res.data.byteLength > 0) {
				setTimeout(() => {
					this.resultUpload.data = new Uint8Array(res.data);
					this.resultUpload.offset = 0;
					this.onUpload(true);
				}, 1000);
			}
		});
	}

	/** Начать прошивку устройства */
	public begin(): void {
		Store.bluetooth.send(this.resultBegin.get());
	}
}

export default UpdateFirmware;
