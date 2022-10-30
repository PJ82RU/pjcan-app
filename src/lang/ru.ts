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

	menu: {
		language: {
			russian: "Russian language",
			english: "English language"
		},
		about: "О программе"
	},

	about: {
		title: "О программе",
		version: "Версия web-приложения",
		versionFirmware: "Версия прошивки PJCAN",
		carSupport: "Поддержка автомобиля",
		author: "Автор"
	},

	deviceInfo: {
		title: "Техническая информация",
		chipCores: "Количество ядер",
		// chipModel: "Модель чипа",
		chipRevision: "Номер ревизии чипа",
		cpuFreqMHz: "Частота ЦП, МГц",
		// cycleCount: "Количество циклов",
		efuseMac: "MAC-адрес",
		flashChipMode: "Режим флеш-памяти",
		flashChipSize: "Размер флеш-памяти, байт",
		flashChipSpeed: "Частота флеш-памяти",
		// heapSize: "Размер кучи в памяти",
		// freeHeap: "Свободной кучи в памяти",
		// maxAllocHeap: "Размер самого большого блока кучи",
		// minFreeHeap: "Наименьший уровень свободной кучи",
		// psramSize: "Размер SPI RAM",
		// freePsram: "Свободной SPI RAM",
		// maxAllocPsram: "Размер самого большого блока SPI RAM",
		// minFreePsram: "Наименьший уровень свободной SPI RAM",
		freeSketchSpace: "Свободное место для прошивки",
		sdkVersion: "Версия SDK",
		sketchMD5: "MD5 прошивки",
		sketchSize: "Размер прошивки"
	},

	btn: {
		apply: "Применить",
		cancel: "Отмена",
		close: "Закрыть",
		deviceInfo: "Об устройстве"
	},

	onboard: {
		title: "Бортовой компьютер",

		viewSetting: {
			enabled: {
				title: "Отображать информацию",
				description: "Статус отображения информации на информационном экране"
			},
			type: {
				title: "Стиль отображения информации",
				description: "Отображать статичный текст, мигающий или в стиле бегущий строки",
				items: [
					"Обычный текст",
					"Мигание текста",
					"Бегущая строка"
				]
			},
			time: {
				title: "Время отображения, сек.",
				description: "Показывать на информационном экране указанное количество секунд"
			}
		},

		info: {
			title: "Информация",
			acc: {
				title: "ACC",
				description: "Питание автомобиля"
			},
			timeWork: {
				title: "Время работы",
				description: "Время работы устройства с момента включения",
				menu: "LCD: Время работы"
			},
			temperature: {
				title: "Температура воздуха",
				description: "Показания внешней температуры автомобиля",
				menu: "LCD: Температура воздуха"
			},
			handbrake: {
				title: "Ручной тормоз",
				description: "Положение ручного тормоза",
				menu: "LCD: Ручной тормоз"
			},
			reverse: {
				title: "Задний ход",
				description: "Ручка КПП в положении R",
				menu: "LCD: Задний ход"
			},
			safetyBelt: {
				title: "Ремень безопасности",
				description: "Ремень безопасности водителя и пассажира",
				menu: "LCD: Ремень безопасности"
			},
			signal: {
				title: "Сигнал поворота",
				description: "Сигнал поворота и аварийной остановки",
				menu: "LCD: Сигнал поворота"
			}
		},

		engine: {
			title: "Двигатель",

			enabled: {
				title: "Работа ДВС",
				description: "Текущее состояние ДВС",
				menu: "LCD: Работа ДВС"
			},
			RPM: {
				title: "RPM двигателя",
				description: "Текущее количество полных оборотов коленчатого вала двигателя в минуту",
				menu: "LCD: RPM двигателя"
			},
			countRPM: {
				title: "Счетчик RPM, тыс.",
				description: "Общее количество полных оборотов коленчатого вала двигателя в тысячах",
				menu: "LCD: Счетчик RPM"
			},
			load: {
				title: "Нагрузка на ДВС",
				description: "Нагрузка чего-то на что-то, хз как рассчитывается",
				menu: "LCD: Нагрузка на ДВС"
			},
			motors: {
				title: "Моточасы",
				description: "Общее время работы двигателя",
				menu: "LCD: Моточасы"
			},
			throttle: {
				title: "Положение дроссельной заслонки",
				description: "Вот как ее положили, так и лежит",
				menu: "LCD: Положение дроссельной заслонки"
			},
			coolant: {
				title: "Температура антифриза",
				description: "Температура охлаждающей жидкости",
				menu: "LCD: Температура антифриза"
			}
		},

		fuel: {
			title: "Топливо",

			current: {
				title: "Расход топлива",
				description: "Значение БК, л/100 км",
				menu: "LCD: Расход топлива"
			},
			avg: {
				title: "Средний расход",
				description: "Значение БК, л/100 км",
				menu: "LCD: Средний расход"
			},
			total: {
				title: "Количество топлива",
				description: "Экспериментальное значение (расчетное), л",
				menu: "LCD: Количество топлива"
			},
			consumption: {
				title: "Расход топлива",
				description: "Экспериментальное значение (расчетное), л/ч",
				menu: "LCD: Расход топлива"
			}
		},

		movement: {
			title: "Спидометр",

			speed: {
				title: "Скорость автомобиля",
				description: "Значение БК, км/ч",
				menu: "LCD: Скорость автомобиля"
			},
			speedAVG: {
				title: "Средняя скорость",
				description: "Значение БК, км/ч",
				menu: "LCD: Средняя скорость"
			},
			restWay: {
				title: "Остаток пути, км",
				description: "Значение БК в км",
				menu: "LCD: Остаток пути"
			}
		}
	}
};
