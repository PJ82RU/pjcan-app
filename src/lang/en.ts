export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Подключиться",
			disconnect: "Отключиться"
		},
		dialog: {
			noConnected: "Вы не подключены ни к одному устройству Bluetooth.",
			connected: "Вы подключены к устройству Bluetooth PJCAN."
		},
		notify: {
			noConnected: "Нет подключения устройству Bluetooth.",
			connected: "PJCAN подключен",
			disconnected: "PJCAN отключен",
			lostConnected: "Потеряно подключение с устройством Bluetooth PJCAN. Пытаюсь восстановить связь...",
			noData: "Нет данных для отправки"
		},
		server: {
			deviceSelected: "Выбрано {n} Bluetooth устройство.",
			deviceDisconnected: "Устройство Bluetooth {n} отключено.",
			GATTConnect: "Подключение к GATT серверу ...",
			getService: "GATT сервер подключен, читаю сервис ...",
			getCharacteristic: "Сервис получен, читаю характеристику ...",
			characteristicDone: "Характеристика получена.",
			startNotifications: "Запуск уведомлений ...",
			notificationsDone: "Уведомления запущены.",
			reconnect: "Повторная попытка через {n} сек... (осталось {c} попыток)",
			reconnectRestored: "Соединение с устройством Bluetooth PJCAN восстановлено.",
			connectionLost: "Связь с устройством Bluetooth PJCAN потеряна.",
			receive: "Входящие данные: ID {n}",
			send: "Исходящие данные: ID {n}",
			versionProtocol: "Версия протокола: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "Обновление PJ CAN",
		btn: {
			update: "Обновить",
			later: "Позже"
		},
		dialog: {
			new: "Доступна новая версия прошивки устройства PJCAN. Обновить до версии {n} ?"
		},
		process: {
			preparation: "Подготовка к загрузке ...",
			upload: "Загрузка прошивки ...",
			update: "Обновление прошивки ..."
		},
		notify: {
			completed: "Прошивка успешно завершена",
			warning: "Прошивка завершена не удачно. Перезагрузите устройство и попробуйте еще раз",
			error: "Ошибка обновления прошивки"
		}
	},

	onboard: {},

	btn: {
		apply: "Применить",
		cancel: "Отмена",
		close: "Закрыть"
	}
};
