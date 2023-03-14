export interface IScannerFrame {
	receive: boolean; // Входящий пакет
	send: boolean; // Исходящий пакет
	id: number; // Идентификатор
	data: number[]; // Данные
	length: number; // Размер данных
	timestamp: bigint; // Временная метка
}
