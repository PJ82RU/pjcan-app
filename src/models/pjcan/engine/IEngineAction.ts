export interface IEngineAction {
	resetWorktime: boolean; // Сбросить счетчик моточасов
	resetCountRPM: boolean; // Сбросить счетчик коленчатого вала (RPM)
	resetOilLife: boolean; // Сбросить счетчики ресурса масла
}
