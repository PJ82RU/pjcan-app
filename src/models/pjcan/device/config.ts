import { Struct } from '@/components/bluetooth/struct';
import { BaseModel, IBaseModel } from '@/models/pjcan/base-model';

export const API_EXEC_DEVICE_CONFIG = 10; // команда API
const STRUCT_LENGTH = 3; // длина данных API

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	led: number; // Cостояние мигания светодиода
}

/** Структура данных */
export const StructDeviceConfig = {
	reboot: Struct.bit(),
	led: Struct.uint8()
};

const struct = new Struct(StructDeviceConfig);

/** Модель параметров устройства */
export class DeviceConfig extends BaseModel implements IDeviceConfig {
	reboot = false;
	led = 0;

	/**
	 * Запись данных
	 * @param {DataView} buf Буффер данных
	 */
	set(buf: DataView): boolean {
		return this._set(this, API_EXEC_DEVICE_CONFIG, STRUCT_LENGTH, struct, buf);
	}

	/** Чтение данных */
	get(): DataView | undefined {
		return this._get(this, API_EXEC_DEVICE_CONFIG, STRUCT_LENGTH, struct);
	}
}
