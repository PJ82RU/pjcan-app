import { BluetoothStruct } from '@/components/bluetooth';
import { BaseModel, IBaseModel } from '../BaseModel';

export const API_EXEC_DEVICE_CONFIG = 10; // команда API
const STRUCT_LENGTH = 3; // длина данных API

/** Интерфейс параметров устройства */
export interface IDeviceConfig extends IBaseModel {
	reboot: boolean; // Перезагрузка устройства
	led: number; // Состояние мигания светодиода
}

/** Структура данных */
export const StructDeviceConfig = {
	reboot: BluetoothStruct.bit(),
	led: BluetoothStruct.uint8()
};

const struct = new BluetoothStruct(StructDeviceConfig);

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
