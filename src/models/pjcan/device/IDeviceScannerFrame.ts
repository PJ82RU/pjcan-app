export interface IDeviceScannerFrame {
	id: number; // Идентификатор
	data: number[]; // Данные
	length: number; // Размер данных
	timestamp: bigint; // Временная метка
}
