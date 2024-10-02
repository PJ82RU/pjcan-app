export interface IDeviceFirmwareUrl {
	current?: string; // Версия прошивки
	url: string; // Путь к файлу прошивки предыдущей версии для отката
	iv: string; // IV
}
