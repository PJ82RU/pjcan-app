export interface IScannerConfig {
	enabled: boolean; // Включить сканирование
	addSend: boolean; // Фиксировать исходящие данные
	timeout: number; // Таймаут выключения сканирования при бездействии, сек
}
