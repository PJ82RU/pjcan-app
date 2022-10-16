export default {
	BLE: {
		title: "Bluetooth",
		btnConnect: "Подключиться",
		btnDisconnect: "Отключиться",
		dlgNoConnected: "Вы не подключены ни к одному устройству Bluetooth.",
		dlgConnected: "Вы подключены устройству Bluetooth PJCAN.",
		connected: "PJCAN подключен",
		disconnected: "PJCAN отключен",
		lostConnected: "Потеряно подключение с устройством Bluetooth PJCAN. Пытаюсь восстановить связь...",
		noData: "Нет данных для отправки",

		server: {
			deviceSelected: "Выбрано %n Bluetooth устройство.",
			deviceDisconnected: "Устройство Bluetooth %n отключено.",
			GATTConnect: "Подключение к GATT серверу ...",
			getService: "GATT сервер подключен, читаю сервис ...",
			getCharacteristic: "Сервис получен, читаю характеристику ...",
			characteristicDone: "Характеристика получена.",
			startNotifications: "Запуск уведомлений ...",
			notificationsDone: "Уведомления запущены.",
			reconnect: "Повторная попытка через %n сек... (осталось %c попыток)",
			reconnectRestored: "Соединение с устройством Bluetooth PJCAN восстановлено.",
			connectionLost: "Связь с устройством Bluetooth PJCAN потеряна.",
			receive: "Входящие данные: ID %n",
			send: "Исходящие данные: ID %n",
			versionProtocol: "Версия протокола: %mj.%mn.%bl.%rv"
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

	onboard: {},

	btn: {
		apply: "Применить",
		cancel: "Отмена",
		close: "Закрыть"
	}
};
