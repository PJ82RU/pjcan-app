export enum EDeviceUpdateError {
    UPD_OK, // Все хорошо
    UPD_ERROR_NODATA, // Нет данных
    UPD_ERROR_NODATA_BEGIN, // Нет данных для запуска прошивки
    UPD_ERROR_BEGIN, // Ошибка запуска прошивки
    UPD_ERROR_WRITE, // Ошибка записи данных
    UPD_ERROR_END, // Прошивка завершилась не удачно
    UPD_ERROR_NOT_FOUND_IV, // Отсутствует IV
    UPD_ERROR_SETKEY, // Не верный ключ шифрования
    UPD_ERROR_DECRYPT, // Ошибка декодирования
    UPD_ERROR_TIMEOUT // Остановка обновления по таймауту
}
