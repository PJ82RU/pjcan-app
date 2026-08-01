export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Conectar",
			disconnect: "Desconectar"
		},
		dialog: {
			noConnected: "No estás conectado a ningún dispositivo Bluetooth.",
			connected: "Estás conectado a un dispositivo Bluetooth PJCAN."
		},
		notify: {
			noConnected: "No hay conexión con el dispositivo Bluetooth.",
			connected: "PJCAN conectado",
			disconnected: "PJCAN desconectado",
			lostConnected: "Se perdió la conexión con el dispositivo Bluetooth PJCAN. Intentando reconectar...",
			noData: "No hay datos para enviar"
		},
		server: {
			deviceSelected: "Dispositivo bluetooth {n} seleccionado.",
			deviceDisconnected: "El dispositivo Bluetooth {n} está desconectado.",
			GATTConnect: "Conectando al servidor GATT...",
			getService: "Servidor GATT conectado, leyendo servicio...",
			getCharacteristic: "Servicio recibido, leyendo la característica...",
			characteristicDone: "Característica recibida.",
			startNotifications: "Iniciando notificaciones...",
			notificationsDone: "Notificaciones iniciadas.",
			reconnect: "Reintentando en {n} segundos... (quedan {c} intentos)",
			reconnectRestored: "Se ha restablecido la conexión con el dispositivo Bluetooth PJCAN.",
			connectionLost: "Se ha perdido la comunicación con el dispositivo Bluetooth PJCAN.",
			receive: "Recibir datos: ID {n}",
			send: "Enviando datos: ID {n}",
			versionProtocol: "Versión del protocolo: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "Actualizar PJCAN",
		warning: "¡Atención!",
		btn: {
			update: "Actualizar",
			rollback: "Revertir",
			later: "Más tarde"
		},
		dialog: {
			updateTo: "¿Actualizar el firmware de PJCAN a la versión {version}?",
			rollbackTo: "¿Revertir el firmware de PJCAN a la versión {version}?",
			browserOutdated: "La versión de tu navegador está desactualizada.\n" + "Actualízala y abre la aplicación web de nuevo."
		},
		process: {
			preparation: "Preparando para subir...",
			upload: "Subiendo Firmware",
			update: "Actualización de firmware...",
			timeLeft: "Tiempo restante"
		},
		notify: {
			newVersion: "Actualización disponible {version}",
			completed: "La actualización del firmware se completó con éxito",
			warning: "La actualización del firmware falló. Apaga y enciende el dispositivo, luego intenta actualizar de nuevo.",
			error: "Error en la actualización del firmware",
			errorDownload: "Error al descargar el firmware del servidor. Puede que no haya conexión a internet.",
			errorUpload: "Error al subir el firmware al dispositivo PJCAN. Puede que no haya conexión Bluetooth.",
			errorWaitUpdate:
				"El dispositivo PJCAN ha agotado el tiempo de espera. Apaga y enciende el dispositivo, y luego intenta actualizar de nuevo."
		}
	},

	error: {
		title: "Qué estás mirando,\nescribe a PJ82",
		version: "Error al solicitar la versión del dispositivo. Vuelve a conectar el dispositivo PJCAN."
	},

	rules: {
		required: "Campo obligatorio",
		counter: "Máximo {n} caracteres | Máximo {n} caracter | Máximo {n} caracteres | Máximo {n} caracteres",
		english: "Solo se permiten caracteres latinos y números."
	},

	menu: {
		onboard: "Ordenador de a bordo",
		onboardButtons: "Botones de a bordo",
		test: "Pruebas",
		language: "Selección de idioma",
		settings: {
			buttonsSW1: "Botones del volante",
			buttonsSW3: "Botones SW3",
			options: "Opciones"
		},
		update: "Actualizar a {version}",
		rollback: "Revertir a {version}",
		install: "Instalar",
		about: "Acerca de"
	},

	activation: {
		success: "¡Dispositivo activado con éxito! Reiniciando...",
		error: "Dispositivo no activado. Contacta al desarrollador."
	},

	about: {
		title: "Acerca de",
		version: "Versión de la aplicación web",
		versionFirmware: "Versión del firmware de PJCAN",
		carSupport: "Soporte de coche",
		author: "Autor",
		sha: "Hash del dispositivo"
	},

	deviceInfo: {
		title: "Información técnica",
		cpuFreqMHz: "Frecuencia de la CPU, MHz",
		efuseMac: "Dirección MAC",
		freeSketchSpace: "Espacio libre para el firmware",
		sdkVersion: "Versión del SDK",
		sketchMD5: "MD5 del firmware",
		sketchSize: "Tamaño del firmware",
		temperatureChip: "Temperatura del chip",
		sha: "SHA",
		hardware: "Versión de la placa"
	},

	deviceReset: {
		title: "Restablecer la configuración del dispositivo",
		config: "Restablecer la configuración general a los valores de fábrica",
		configShort: "Configuración general",
		view: "Restablecer la configuración de pantalla a los valores de fábrica",
		viewShort: "Configuración de pantalla",
		buttons: "Restablecer la configuración de los botones a los valores de fábrica",
		buttonsShort: "Configuración de los botones"
	},

	btn: {
		apply: "Aplicar",
		cancel: "Cancelar",
		close: "Cerrar",
		deviceInfo: "Acerca del dispositivo",
		deviceReset: "Restablecer configuración",
		reset: "Restablecer",
		ok: "OK"
	},

	onboard: {
		title: "Ordenador de a bordo",

		viewSetting: {
			enabled: {
				title: "Mostrar información",
				titleShort: "Mostrar",
				description: "Estado de la visualización de información en la pantalla de información"
			},
			type: {
				title: "Estilo de visualización de la información",
				description: "Mostrar texto estático, parpadeante o en movimiento",
				items: ["Texto sin formato", "Texto parpadeante", "Texto en movimiento"]
			},
			time: {
				title: "Tiempo de visualización, seg.",
				description: "Mostrar en la pantalla de información durante el número de segundos especificado"
			},
			delay: {
				title: "Tiempo de pausa de la visualización, seg.",
				description: "Pausar la visualización de información durante el número de segundos especificado"
			}
		},

		info: {
			title: "Información",
			acc: {
				title: "ACC",
				description: "Alimentación del coche"
			},
			worktime: {
				title: "Tiempo de trabajo",
				description: "Tiempo de funcionamiento del dispositivo desde el encendido",
				menu: "LCD: Tiempo de trabajo"
			},
			voltmeter: {
				title: "Voltaje",
				description: "Voltaje de la red de a bordo en voltios (valor medio durante 10 segundos)",
				menu: "LCD: Voltaje"
			},
			temperatureIn: {
				title: "Temperatura interior",
				description: "Lecturas de la temperatura interior del coche",
				menu: "LCD: Temperatura del aire"
			},
			temperatureOut: {
				title: "Temperatura exterior",
				description: "Lecturas de la temperatura exterior del coche",
				menu: "LCD: Temperatura del aire"
			},
			signals: {
				title: "Señales"
			},
			handbrake: {
				title: "Freno de mano",
				description: "Posición del freno de mano",
				menu: "LCD: Freno de mano"
			},
			reverse: {
				title: "Marcha atrás",
				description: "Palanca de cambios en posición R",
				menu: "LCD: Marcha atrás"
			},
			light: {
				title: "Luz de fondo",
				description: "Contacto de la luz de fondo"
			},
			amp: {
				title: "AMP Cont",
				description: "Contacto de encendido de Bose"
			},
			safetyBelt: {
				title: "Cinturón de seguridad",
				description: "Cinturón de seguridad del conductor y del pasajero",
				menu: "LCD: Cinturón de seguridad"
			},
			signal: {
				title: "Intermitente",
				description: "Señal de giro y señal de parada de emergencia",
				menu: "LCD: Intermitente"
			},
			device: {
				title: "Parámetros del dispositivo",
				menu: "Parámetros del dispositivo",
				disableLedWork: {
					title: "Contacto LED_WORK",
					description: "Control del contacto LED_WORK"
				},
				disableReverse: {
					title: "Contacto REVERSE",
					description: "Control del contacto REVERSE"
				},
				disableRPosition: {
					title: "Contacto R_POSITION",
					description: "Control del contacto R_POSITION"
				},
				disableAmpIllum: {
					title: "Contacto AMP_ILLUM",
					description: "Control del contacto AMP_ILLUM"
				},
				disableVoltmeter: {
					title: "Voltímetro",
					description: "Activar/desactivar el voltímetro"
				},
				calibrationOfVoltmeter: {
					title: "Calibración del voltímetro",
					titleShort: "Calibración",
					description: "Un número positivo disminuye el valor del voltímetro, un número negativo lo aumenta"
				}
			}
		},

		engine: {
			title: "Motor",

			enabled: {
				title: "Funcionamiento del motor",
				description: "Estado actual del motor",
				menu: "LCD: Funcionamiento del motor"
			},
			RPM: {
				title: "RPM del motor",
				description: "Número actual de revoluciones completas del cigüeñal del motor por minuto",
				menu: "LCD: RPM del motor"
			},
			countRPM: {
				title: "Contador de RPM",
				titleShort: "Contador de RPM",
				description: "Número total de revoluciones completas del cigüeñal del motor en miles",
				menu: "LCD: Contador de RPM"
			},
			load: {
				title: "Carga del motor",
				description: "Porcentaje de carga del motor",
				menu: "LCD: Carga del motor"
			},
			worktime: {
				title: "Horas del motor",
				description: "Tiempo total de funcionamiento del motor",
				menu: "LCD: Horas del motor"
			},
			throttle: {
				title: "Posición del acelerador",
				description: "Posición relativa del acelerador",
				menu: "LCD: Posición del acelerador"
			},
			coolant: {
				title: "Temperatura del refrigerante",
				description: "Temperatura del refrigerante",
				menu: "LCD: Temperatura del refrigerante"
			},
			oilLifePercent: {
				title: "Vida útil del aceite, %",
				titleShort: "Vida útil, %",
				description: "Vida útil restante del aceite en porcentaje",
				menu: "LCD: Vida útil del aceite, %"
			},
			oilLifeDistance: {
				title: "Kilometraje hasta el cambio de aceite, km",
				titleShort: "Kilometraje, km",
				description: "Kilometraje restante hasta el cambio de aceite en kilómetros",
				menu: "LCD: Kilometraje hasta el cambio, km"
			},
			statistics: {
				title: "Estadísticas"
			},
			settings: {
				title: "Configuración de estadísticas del motor",
				menu: "Estadísticas del motor",
				showDays: {
					title: "Mostrar días en las estadísticas",
					titleShort: "Mostrar días",
					description: "Mostrar las horas del motor en la pantalla de información en formato d.hh:mm:ss"
				},
				worktime: {
					title: "Tiempo de funcionamiento, min.",
					description: "Tiempo total de funcionamiento del motor"
				},
				countRPM: {
					title: "Contador de RPM, miles",
					description: "Número total de revoluciones completas del cigüeñal del motor en miles"
				}
			},
			oilSettings: {
				title: "Configuración de estadísticas de aceite",
				menu: "Estadísticas de aceite",
				oilDurationHours: {
					title: "Tiempo de funcionamiento con el aceite, h.",
					titleShort: "Tiempo de func., h.",
					description: "Tiempo total de funcionamiento del motor con el aceite actual"
				},
				oilDistanceKm: {
					title: "Kilometraje con el aceite, km",
					titleShort: "Kilometraje, km",
					description: "Kilometraje total del coche con el aceite actual"
				},
				oilHoursLimit: {
					title: "Límite de cambio de aceite, h.",
					titleShort: "Límite de aceite, h.",
					description: "Límite de horas del motor para el cambio de aceite"
				},
				oilHoursLimitItems: [
					"ILSAC / Japón (220 h) — para Mazda (Predeterminado)",
					"ACEA / Europa (250 h) — aceites resistentes",
					"PAO / Premium (300 h) — sintéticos PAO",
					"Mineral (180 h) — aceites simples",
					"Límite personalizado..."
				],
				oilHoursLimitCustom: {
					title: "Límite personalizado, h.",
					description: "Introduce tu límite de cambio de aceite personalizado (de 150 a 350 horas)"
				}
			}
		},

		fuel: {
			title: "Combustible",

			current: {
				title: "Consumo de combustible",
				description: "Valor del ordenador de a bordo, l/100 km",
				menu: "LCD: Consumo de combustible"
			},
			avg: {
				title: "Consumo medio",
				description: "Valor del ordenador de a bordo, l/100 km",
				menu: "LCD: Consumo medio"
			},
			settings: {
				title: "Configuración de consumo",
				menu: "Configuración de consumo",
				ratio: {
					title: "Coeficiente de consumo de combustible",
					description: "Para ajustar el consumo de GLP u otros tipos de combustible"
				}
			}
		},

		movement: {
			title: "Velocímetro",

			speed: {
				title: "Velocidad del coche",
				description: "Valor del ordenador de a bordo, km/h",
				menu: "LCD: Velocidad del coche"
			},
			speedAVG: {
				title: "Velocidad media",
				description: "Valor del ordenador de a bordo, km/h",
				menu: "LCD: Velocidad media"
			},
			restWay: {
				title: "Distancia restante, km",
				description: "Valor del ordenador de a bordo en km",
				menu: "LCD: Distancia restante"
			}
		},

		doors: {
			title: "Puertas",
			menu: "LCD: Puertas",

			doorFL: {
				title: "Delantera izquierda",
				description: "Estado actual de la puerta delantera izquierda"
			},
			doorFR: {
				title: "Delantera derecha",
				description: "Estado actual de la puerta delantera derecha"
			},
			doorBL: {
				title: "Trasera izquierda",
				description: "Estado actual de la puerta trasera izquierda"
			},
			doorBR: {
				title: "Trasera derecha",
				description: "Estado actual de la puerta trasera derecha"
			},
			trunk: {
				title: "Maletero",
				description: "Estado actual del maletero"
			},

			settings: {
				title: "Configuración de las puertas",
				frontReverse: {
					title: "Intercambiar puertas delanteras",
					titleShort: "Puertas delanteras",
					description: "Intercambiar las puertas delanteras"
				},
				backReverse: {
					title: "Intercambiar puertas traseras",
					titleShort: "Puertas traseras",
					description: "Intercambiar las puertas traseras"
				},
				frontBackReverse: {
					title: "Intercambiar puertas delanteras con traseras",
					titleShort: "Delanteras con traseras",
					description: "Intercambiar las puertas delanteras y traseras"
				}
			}
		},

		volume: {
			title: "Sonido",
			menu: "LCD: Sonido",

			mute: {
				title: "Silenciar sonido",
				description: "Silenciar temporalmente el sonido sin cambiar el nivel actual"
			},
			level: {
				title: "Nivel de sonido",
				description: "Valor actual del nivel de sonido"
			}
		},

		climate: {
			title: "Climatizador",
			menu: "LCD: Climatizador",

			enabled: {
				title: "Estado de funcionamiento",
				description: "Estado de funcionamiento de la unidad de climatización"
			},
			autoMode: {
				title: "Auto",
				description: "Modo automático de la unidad de climatización"
			},
			ac: {
				title: "AC",
				description: "Funcionamiento del aire acondicionado"
			},
			temperature: {
				title: "Temperatura",
				description: "Valor de temperatura establecido de la unidad de climatización"
			},
			air: {
				title: "Ventilación de la cabina",
				description: "Circulación de aire dentro de la cabina"
			},
			blow: {
				title: "Flujo de aire",
				description: "Dirección del flujo de aire"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Activar Bose",
				description: "Activar/desactivar el amplificador de sonido Bose"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"Es un sistema de cancelación de ruido que ajusta continuamente el sonido para compensar el ruido de fondo y la velocidad del vehículo"
			},
			radioFM: {
				title: "Radio FM",
				description: "Activar/desactivar la radio FM"
			},
			wow: {
				title: "Wow",
				description: "Pitido al cambiar de parámetro"
			},
			balance: {
				title: "Balance",
				description: "Desplazar el balance de sonido hacia la derecha o la izquierda"
			},
			bass: {
				title: "Graves",
				description: "Mejora de las bajas frecuencias"
			},
			fade: {
				title: "Fade",
				description: "Desplazar el balance de sonido hacia adelante o hacia atrás"
			},
			treble: {
				title: "Agudos",
				description: "Mejora de las altas frecuencias"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"La tecnología CenterPoint convierte las señales estéreo en audio multicanal y crea simultáneamente un escenario sonoro más amplio y envolvente"
			},

			volumeConfig: {
				title: "Configuración de inicio",
				start: {
					title: "Cambiar el nivel de sonido",
					description: "Establecer el nivel de sonido especificado a continuación cuando se encienda el adaptador PJCAN"
				},
				level: {
					title: "Nivel de sonido",
					description: "El nivel de sonido establecido cuando se enciende el adaptador PJCAN"
				}
			}
		}
	},

	buttons: {
		title: "Configuración de los botones",
		extendedMode: "Modo extendido",
		hintMode: " (modo extendido)",

		mode: "Botón MODE",
		setUp: "Botón SET UP",
		setDown: "Botón SET DOWN",
		volUp: "Botón VOL +",
		volDown: "Botón VOL -",
		volMute: "Botón VOL MUTE",

		extended: {
			title: "Modo extendido",
			description: "Soporte para pulsación doble, triple y prolongada de un botón"
		},
		resistance: {
			title: "Resistencia del botón",
			description: "Intervalo de resistencia del botón",
			cur: {
				title: "Resistencia actual",
				description: "Valor de resistencia del botón presionado. No se puede cambiar"
			},
			min: {
				title: "Resistencia mínima",
				description:
					"Especifica el valor mínimo del botón, pero no permitas que los valores se solapen con otros botones"
			},
			max: {
				title: "Resistencia máxima",
				description:
					"Especifica el valor máximo del botón, pero no permitas que los valores se solapen con otros botones"
			}
		},
		pressSingle: {
			title: "Botón presionado una vez",
			description: "La función que se ejecuta cuando se presiona el botón"
		},
		pressDual: {
			title: "Botón presionado dos veces",
			description: "La función que se ejecuta cuando se presiona el botón dos veces"
		},
		pressTriple: {
			title: "Botón presionado 3 veces",
			description: "La función que se ejecuta cuando se presiona el botón 3 veces"
		},
		pressHold: {
			title: "Mantener pulsado el botón",
			description: "La función que se ejecuta cuando se mantiene pulsado el botón durante 3 o más segundos.",
			time: {
				title: "Tiempo de pulsación del botón",
				description: "Tiempo de pulsación del botón, seg."
			}
		},

		functions: {
			0: "Sin función",
			1: "PJCAN: cambiar el modo de control",
			2: "PJCAN: mostrar los valores del motor",
			3: "PJCAN: mostrar los valores de consumo",
			4: "PJCAN: mostrar los valores de movimiento",
			5: "PJCAN: mostrar los valores de temperatura",
			6: "PJCAN: mostrar la fecha y la hora",
			7: "HU: Botón MUTE en el volante",
			8: "HU: Botón MODE en el volante",
			9: "HU: Botón SET DOWN en el volante",
			10: "HU: Botón SET UP en el volante",
			11: "HU: Botón Vol+ en el volante",
			12: "HU: Botón Vol- en el volante",
			13: "HU: abrir el control por voz",
			14: "HU: abrir el ecualizador",
			15: "HU: abrir la radio",
			16: "HU: buscar emisora de radio",
			17: "HU: abrir la cámara",
			18: "HU: abrir el teléfono",
			42: "HU: Pausa/Reproducir",
			19: "BC: Botón INFO (información del BC)",
			20: "BC: Botón CLOCK (hora en el BC)",
			21: "BC: Botón CLOCK H (horas)",
			22: "BC: Botón CLOCK M (minutos)",
			23: "BC: Botón CLOCK 24/12 (cambio de formato de hora)",
			24: "BC: poner los minutos a 0",
			25: "BC: cambiar el modo INFO/CLOCK",
			26: "BC: mantener pulsado INFO (restablecer consumo)",
			27: "BC: mantener pulsado CLOCK (ajuste del reloj)",
			28: "BOSE: activar/desactivar el amplificador",
			29: "BOSE: activar/desactivar Audio PLT",
			30: "BOSE: MUTE",
			31: "BOSE: VOL +",
			32: "BOSE: VOL -",
			33: "BOSE: BALANCE +",
			34: "BOSE: BALANCE -",
			35: "BOSE: BASS +",
			36: "BOSE: BASS -",
			37: "BOSE: FADE +",
			38: "BOSE: FADE -",
			39: "BOSE: TREBLE +",
			40: "BOSE: TREBLE -",
			41: "BOSE: cambiar los modos de CenterPoint (cíclicamente)"
		},

		edit: {
			title: "Editando el botón \"{name}\"",
			beginValue: {
				title: "Valor inicial",
				titleShort: "Inicio",
				description: "Valor inicial del rango de resistencia del botón en unidades."
			},
			endValue: {
				title: "Valor final",
				titleShort: "Fin",
				description: "Valor final del rango de resistencia del botón en unidades."
			}
		},

		notify: {
			detected: "Botón \"{id}\" presionado",
			notDefined: "¡El botón presionado no está definido!"
		}
	},

	onboardButtons: {
		title: "Botones de a bordo",
		buttons: {
			holdClock: "mantener CLOCK",
			holdInfo: "mantener SET/INFO",
			holdClockShort: "mant. CLOCK",
			holdInfoShort: "mant. INFO",
			clock: "CLOCK",
			info: "SET/INFO",
			infoShort: "INFO",
			clockH: "H",
			clockM: "M",
			clockRM: "RM",
			clock24: "24/12"
		}
	},

	test: {
		title: "Pruebas",
		description:
			"Introduce texto (solo caracteres latinos y números), selecciona el estilo y la alineación, especifica el tiempo de visualización y haz clic en \"Mostrar\"",
		text: {
			title: "Texto",
			description: "Texto que se muestra en la pantalla de información"
		},
		btnShow: "Mostrar"
	},

	options: {
		title: "Opciones",
		lcd: {
			title: "Pantalla de a bordo",
			enabled: {
				title: "Pantalla de a bordo",
				description: "Activar/desactivar la salida de información en la pantalla de información de a bordo"
			},
			logo: {
				title: "Logotipo",
				description: "Texto que se muestra cuando no hay datos para mostrar en la pantalla de a bordo. Máximo 12 caracteres."
			},
			hello: {
				title: "Texto de saludo",
				description: "Texto que se muestra cuando se enciende el ACC. Máximo 32 caracteres.",
				menu: "BC: Texto de saludo"
			}
		},
		head: {
			title: "Unidad principal",
			titleShort: "HU",
			protocol: {
				title: "Protocolo UART",
				description: "Protocolo UART para la comunicación entre PJCAN y la unidad principal",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)",
					5: "Hiworld MZF1.2 (GB) 1N4MZF10B"
				}
			},
			reverseUart: {
				title: "Intercambiar contactos UART",
				description: "Intercambiar los contactos UART si no hay comunicación entre PJCAN y la unidad principal"
			},
			onboardShow: {
				title: "Mostrar información de la unidad principal",
				titleShort: "Mostrar info HU",
				description: "Mostrar el texto de la unidad principal en la pantalla de a bordo en lugar del logotipo",
				menu: "LCD: Mostrar texto de la unidad principal"
			},
			sendButton: {
				title: "Botones del volante",
				description: "Soporte para el control de la unidad principal con los botones del volante"
			},
			sendClimate: {
				title: "Mostrar el climatizador en la unidad principal",
				description: "Mostrar el panel del climatizador en la unidad principal (si el protocolo admite esta funcionalidad)"
			},
			sendDoors: {
				title: "Mostrar el estado de las puertas en la unidad principal",
				titleShort: "Mostrar puertas en HU",
				description: "Mostrar el estado de las puertas del coche en la unidad principal (si el protocolo admite esta funcionalidad)"
			},
			sendOnboard: {
				title: "Mostrar datos de a bordo en la unidad principal",
				description: "Mostrar el estado de las puertas y los valores del ordenador de a bordo en la unidad principal (si el protocolo admite esta funcionalidad)"
			},
			holdToFlip: {
				title: "Control del nivel de volumen",
				titleShort: "Control de volumen",
				description: "Cambio suave del nivel de volumen al mantener pulsados los botones Vol+/Vol- (recomendado si la unidad principal no admite esta función)."
			}
		},
		datetime: {
			title: "Fecha y hora",
			description:
				"Para mostrar la fecha y la hora en la pantalla de a bordo, es necesario iniciar la aplicación web cada vez que se enciende el contacto para sincronizar los datos con el adaptador PJCAN.",
			menu: "LCD: Opciones de visualización",
			date: {
				title: "Mostrar fecha",
				description: "Mostrar la fecha actual en la pantalla de a bordo"
			},
			time: {
				title: "Mostrar hora",
				description: "Mostrar la hora actual en la pantalla de a bordo"
			},
			dayWeek: {
				title: "Mostrar día de la semana",
				description: "Mostrar el día de la semana actual en la pantalla de a bordo"
			},
			dateAndDayWeek: {
				title: "Mostrar fecha y día de la semana",
				titleShort: "Mostrar fecha y día",
				description: "Mostrar la fecha y el día de la semana actuales en la pantalla de a bordo"
			},
			timeAndDayWeek: {
				title: "Mostrar hora y día de la semana",
				titleShort: "Mostrar hora y día",
				description: "Mostrar la hora y el día de la semana actuales en la pantalla de a bordo"
			},
			fullDatetime: {
				title: "Mostrar fecha y hora completas",
				titleShort: "Mostrar fecha y hora completas",
				description: "Mostrar la fecha y la hora actuales en formato completo en la pantalla de a bordo"
			}
		},
		onboard: {
			title: "Ordenador de a bordo",
			titleShort: "BC",
			description:
				"Lista de tarjetas que se muestran en la pantalla \"Ordenador de a bordo\". El orden se cambia arrastrando los bloques. También puedes activar/desactivar la visualización en la página.",
			reset: {
				menu: "Organizar por defecto"
			}
		}
	},

	scanner: {
		dialog: {
			title: "Escaneo del bus CAN",
			text: "¿Iniciar el escaneo del bus CAN?\n" + "Los datos del escaneo se enviarán automáticamente a PJ82."
		},
		btn: {
			start: "Iniciar",
			next: "Siguiente",
			finish: "Finalizar"
		},
		step: {
			0: {
				title: "Escaneando los valores del motor",
				text: "Arranca el motor del coche y pulsa el botón \"Siguiente\""
			},
			1: {
				title: "Escaneando los valores de las puertas",
				text:
					"1. Abre la puerta del conductor y ciérrala;\n" +
					"2. Abre la puerta trasera izquierda y ciérrala;\n" +
					"3. Abre el maletero y ciérralo;\n" +
					"4. Abre la puerta trasera derecha y ciérrala;\n" +
					"5. Abre la puerta delantera derecha y ciérrala.\n" +
					"\n" +
					"Vuelve al habitáculo y pulsa el botón \"Siguiente\""
			},
			2: {
				title: "Escaneando los valores de las señales",
				text:
					"1. Abróchate el cinturón de seguridad del conductor;\n" +
					"2. Abróchate el cinturón de seguridad del pasajero delantero;\n" +
					"3. Abróchate los cinturones de seguridad de los pasajeros traseros;\n" +
					"4. Enciende el intermitente izquierdo, luego el derecho, y luego apágalo;\n" +
					"5. Enciende la señal de parada de emergencia, y luego apágala.\n" +
					"\n" +
					"Pulsa el botón \"Siguiente\""
			},
			3: {
				title: "Escaneando los valores del climatizador",
				text:
					"1. Enciende/apaga el AUTO;\n" +
					"2. Enciende/apaga el AC;\n" +
					"3. Cambia la dirección del flujo de aire;\n" +
					"4. Cambia la velocidad del flujo de aire.\n" +
					"\n" +
					"Pulsa el botón \"Siguiente\""
			},
			4: {
				title: "Escaneando los valores de movimiento",
				text:
					"1. Suelta el freno de mano;\n" +
					"2. Pon la marcha atrás y retrocede un poco;\n" +
					"3. Pon el modo de conducción en una transmisión automática o cambia de marcha en una transmisión manual y empieza a moverte hacia adelante.\n" +
					"\n" +
					"Cuando el coche se haya detenido, apaga el motor y pulsa el botón \"Finalizar\""
			}
		},
		notify: {
			errorStart: "Escaneo no iniciado.\n" + "Comprueba la conexión con el dispositivo PJCAN.",
			errorSend: "Error al enviar el paquete de datos de escaneo.",
			warningSend: "No hay datos de escaneo para enviar."
		},
		upload: {
			title: "Subiendo al servidor",
			text: "Subiendo los valores escaneados al servidor.",
			leftToLoad:
				"No hay paquetes para subir | Queda {n} paquete por subir | Quedan {n} paquetes por subir | Quedan {n} paquetes por subir"
		}
	},

	choosingCarModel: {
		title: "Eligiendo un modelo de coche",
		label: "Modelo de coche",
		description: "Posibilidad de cambiar el modelo de coche compatible con el adaptador PJCAN.",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (en pruebas)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5"
		}
	},

	help: {
		onboard: {
			notify: "Desliza el dedo hacia la izquierda/derecha para desplazarte por los bloques de información"
		}
	},
	language: {
		title: "Selección de idioma",
		label: "Idioma de la interfaz",
		description: "Elige el idioma de la interfaz que más te convenga"
	}
};
