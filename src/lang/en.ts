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
			warning: "Прошивка завершена не удачно. Выключите и включите устройство, и попробуйте обновить еще раз",
			error: "Ошибка обновления прошивки",
			errorDownload: "Ошибка загрузки прошивки с сервера. Возможно отсутствует подключение к сети интернет",
			errorUpload: "Ошибка загрузки прошивки на устройство PJCAN. Возможно отсутствует подключение по Bluetooth",
			errorWaitUpdate: "Истекло время ожидания устройства PJCAN. Выключите и включите устройство, и попробуйте обновить еще раз"
		}
	},

	error: {
		title: "Что смотришь,\nпиши PJ82"
	},

	menu: {
		onboard: "Бортовой компьютер",
		onboardButtons: "Кнопки БК",
		language: {
			russian: "Russian language",
			english: "English language"
		},
		settings: {
			buttons: "Настройка кнопок руля"
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
		sketchSize: "Размер прошивки",
		temperatureChip: "Температура чипа"
	},

	deviceReset: {
		title: "Сброс конфигурации устройства",
		config: "Сбросить значения конфигурации по умолчанию",
		view: "Сбросить значения конфигурации отображения по умолчанию"
	},

	btn: {
		apply: "Применить",
		cancel: "Отмена",
		close: "Закрыть",
		deviceInfo: "Об устройстве",
		deviceReset: "Сбросить конфигурацию"
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
			worktime: {
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
				title: "Положение дрос. заслонки",
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
		},

		doors: {
			title: "Двери",
			menu: "LCD: Двери",

			doorFL: {
				title: "Передняя левая",
				description: "Текущее состояние передней левой двери"
			},
			doorFR: {
				title: "Передняя правая",
				description: "Текущее состояние передней правой двери"
			},
			doorBL: {
				title: "Задняя левая",
				description: "Текущее состояние задней левой двери"
			},
			doorBR: {
				title: "Задняя правая",
				description: "Текущее состояние задней правой двери"
			},
			trunk: {
				title: "Багажник",
				description: "Текущее состояние багажника"
			}
		},

		volume: {
			title: "Звук",
			menu: "LCD: Звук",

			mute: {
				title: "Включить звук",
				description: "Временное включение/выключение звука без изменения текущего уровня"
			},
			level: {
				title: "Уровень звука",
				description: "Текущее значение уровня звука"
			}
		},

		climate: {
			title: "Климат-контроль",
			menu: "LCD: Климат-контроль",

			enabled: {
				title: "Статус работы",
				description: "Статус работы блока климат-контроля"
			},
			autoMode: {
				title: "Auto",
				description: "Автоматический режим работы блока климата"
			},
			ac: {
				title: "AC",
				description: "Работа кондиционера"
			},
			temperature: {
				title: "Температура",
				description: "Установленное значение температуры блока климат-контроля"
			},
			air: {
				title: "Вентиляция салона",
				description: "Циркуляция воздуха внутри салона"
			},
			blow: {
				title: "Воздушный поток",
				description: "Направление воздушного потока"
			}
		}
	},

	buttons: {
		title: "Настройки кнопок",

		mode: "Кнопка MODE",
		seekUp: "Кнопка SEEK UP",
		seekDown: "Кнопка SEEK DOWN",
		volUp: "Кнопка VOL UP",
		volDown: "Кнопка VOL DOWN",
		volMute: "Кнопка VOL MUTE",

		resistance: {
			title: "Сопротивление кнопки",
			description: "Сопротивление кнопки в условных единицах"
		},
		pressSingle: {
			title: "Кнопка нажата 1 раз",
			description: "Функция, которая выполняется при нажатии кнопки"
		},
		pressDual: {
			title: "Кнопка нажата 2 раза",
			description: "Функция, которая выполняется при нажатии кнопки 2 раза"
		},
		pressTriple: {
			title: "Кнопка нажата 3 раза",
			description: "Функция, которая выполняется при нажатии кнопки 3 раза"
		},
		pressHold: {
			title: "Удержание кнопки",
			description: "Функция, которая выполняется при нажатии и удержании кнопки 3 более секунд."
		},
		release: {
			title: "Кнопка отпущена",
			description: "Функция, которая выполняется если кнопка отпущена"
		},

		functions: {
			0: "Нет действия",
			1: "Кнопка Teyes MODE",
			2: "Кнопка Teyes SEEK UP",
			3: "Кнопка Teyes SEEK DOWN",
			4: "Кнопка Teyes VOL UP",
			5: "Кнопка Teyes VOL DOWN",
			6: "Кнопка Teyes VOL MUTE",
			7: "Кнопка Clock на LCD",
			8: "Кнопка Clock на LCD отпущена",
			9: "Кнопка Clock H на LCD",
			10: "Кнопка Clock H на LCD отпущена",
			11: "Кнопка Clock M на LCD",
			12: "Кнопка Clock M на LCD отпущена",
			13: "Кнопка Info на LCD",
			14: "Кнопка Info на LCD отпущена",
			15: "Кнопка показать значения ДВС",
			16: "Кнопка показать значения расхода",
			17: "Кнопка показать значения движения",
			18: "Кнопка показать значения температуры"
		},

		definition: {
			title: "Обнаружено нажатие кнопки",
			type: {
				title: "Тип кнопки",
				description: "Выберите тип кнопки для дальнейшего ее использования"
			}
		}
	},

	onboardButtons: {
		title: "Кнопки БК",
		description: "Кнопки <b>H</b>, <b>M</b>, <b>RM</b> и <b>24/12</b> работают только на рестайлинговой версии  автомобиля"
	}
};
