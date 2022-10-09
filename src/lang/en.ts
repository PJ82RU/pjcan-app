export default {
	BLE: {
		btnConnect: "Подключиться",
		btnDisconnect: "Отключиться",
		noConnected: "Вы не подключены ни к одному устройству Bluetooth.",
		connected: "PJCAN подключен",
		disconnected: "PJCAN отключен",
		lostConnected: "Потеряно подключение с устройством Bluetooth PJCAN. Пытаюсь восстановить связь...",
		noData: "Нет данных для отправки",

		server: {
			deviceSelected: "Выбрано % Bluetooth устройство.",
			deviceDisconnected: "Устройство Bluetooth % отключено.",
			GATTConnect: "Подключение к GATT серверу ...",
			getService: "GATT сервер подключен, читаю сервис ...",
			getCharacteristic: "Сервис получен, читаю характеристику ...",
			characteristicDone: "Характеристика получена.",
			startNotifications: "Запуск уведомлений ...",
			notificationsDone: "Уведомления запущены.",
			reconnect: "Повторная попытка через % сек... (осталось $ попыток)",
			reconnectRestored: "Соединение с устройством Bluetooth PJCAN восстановлено.",
			connectionLost: "Связь с устройством Bluetooth PJCAN потеряна.",
			receive: "Входящие данные: ID %",
			send: "Исходящие данные: ID %",
			versionProtocol: "Версия протокола: %n0.%n1.%n2.%n3"
		}
	},

	updateFirmware: {
		later: "Позже",
		update: "Обновить",
		new: "Доступна новая версия прошивки устройства PJCAN. Обновить до версии % ?",
		preparation: "Подготовка к загрузке ...",
		process: {
			upload: "Загрузка прошивки ...",
			update: "Обновление прошивки ...",
			completed: "Прошивка успешно завершена"
		},
		processWarning: "Прошивка завершена не удачно. Перезагрузите устройство и попробуйте еще раз",
		error: "Ошибка обновления прошивки"
	},

	onboard: {
	}
};
