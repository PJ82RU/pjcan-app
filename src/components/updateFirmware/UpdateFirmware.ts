import axios from 'axios';
import { Store } from '@/store';
import { UpdateData, IUpdateData, UPDATE_UPLOAD_EVENT_RESULT } from '@/models/pjcan/update/UpdateData';
import { UpdateBegin, IUpdateBegin } from '@/models/pjcan/update/UpdateBegin';
import { IVersion, Version } from '@/models/version';

const URL_FIRMWARE_VERSION = '/firmware/version.json';
const URL_FIRMWARE_GZIP = '/firmware/firmware.bin.gz';

/** Обновление прошивки устройства PJCAN */
export class UpdateFirmware {
	private _store: Store;

	/** Новая версия прошивки */
	newVersion: IVersion = new Version();
	/** Результат загрузки */
	resultUpload: IUpdateData = new UpdateData();
	/** Результат начала обновления */
	resultBegin: IUpdateBegin = new UpdateBegin();
	/** Процент загрузки прошивки на устройство PJCAN */
	get uploading(): number {
		return this.resultUpload.offset > 0 ? this.resultUpload.offset / this.resultUpload.data.byteLength : 0;
	}

	constructor(store: Store) {
		this._store = store;
		this.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, (res) => this.onUpload(res));
	}

	/** Очистить значения */
	clear(): void {
		this.newVersion.clear();
		this.resultUpload.clear();
	}

	/** Проверить версию прошивки */
	checkNewVersion(): Promise<void> {
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

						if (!this._store.version.compare(this.newVersion)) resolve();
						else reject('Current version');
					} else reject('No data');
				})
				.catch((e) => reject(e));
		});
	}

	/** Пишем данные файла прошивки в устройство PJCAN */
	private onUpload(result: boolean): void {
		if (result && this.resultUpload.offset < this.resultUpload.data.byteLength)
			this._store.bluetooth.send(this.resultUpload.get()).then();
	}

	/** Загрузка прошивки */
	upload(): void {
		axios({
			url: URL_FIRMWARE_GZIP,
			method: 'GET',
			responseType: 'arraybuffer',
			headers: { 'Content-Type': 'application/gzip' }
		}).then((res: any) => {
			if (res.data.byteLength > 0) {
				setTimeout(async () => {
					this.resultUpload.data = new Uint8Array(res.data);
					this.resultUpload.offset = 0;
					await this.onUpload(true);
				}, 1000);
			}
		});
	}

	/** Начать прошивку устройства */
	begin(): void {
		this._store.bluetooth.send(this.resultBegin.get()).then();
	}
}
