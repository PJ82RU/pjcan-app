export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Verbinden",
			disconnect: "Trennen"
		},
		dialog: {
			noConnected: "Sie sind mit keinem Bluetooth-Gerät verbunden.",
			connected: "Sie sind mit einem PJCAN Bluetooth-Gerät verbunden."
		},
		notify: {
			noConnected: "Keine Verbindung zum Bluetooth-Gerät.",
			connected: "PJCAN verbunden",
			disconnected: "PJCAN getrennt",
			lostConnected: "Verbindung zum PJCAN Bluetooth-Gerät verloren. Versuche, die Verbindung wiederherzustellen...",
			noData: "Keine Daten zum Senden"
		},
		server: {
			deviceSelected: "{n} Bluetooth-Gerät ausgewählt.",
			deviceDisconnected: "Bluetooth-Gerät {n} ist getrennt.",
			GATTConnect: "Verbindung zum GATT-Server wird hergestellt...",
			getService: "GATT-Server verbunden, Dienst wird gelesen...",
			getCharacteristic: "Dienst empfangen, Merkmal wird gelesen...",
			characteristicDone: "Merkmal empfangen.",
			startNotifications: "Benachrichtigungen werden gestartet...",
			notificationsDone: "Benachrichtigungen gestartet.",
			reconnect: "Erneuter Versuch in {n} Sekunden... ({c} Versuche verbleibend)",
			reconnectRestored: "Die Verbindung zum PJCAN Bluetooth-Gerät wurde wiederhergestellt.",
			connectionLost: "Die Kommunikation mit dem PJCAN Bluetooth-Gerät wurde unterbrochen.",
			receive: "Daten empfangen: ID {n}",
			send: "Daten senden: ID {n}",
			versionProtocol: "Protokollversion: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "PJCAN aktualisieren",
		warning: "Achtung!",
		btn: {
			update: "Aktualisieren",
			rollback: "Zurücksetzen",
			later: "Später"
		},
		dialog: {
			updateTo: "PJCAN-Firmware auf Version {version} aktualisieren?",
			rollbackTo: "PJCAN-Firmware auf Version {version} zurücksetzen?",
			browserOutdated: "Ihre Browser-Version ist veraltet.\n" + "Aktualisieren Sie sie und öffnen Sie die Webanwendung erneut."
		},
		process: {
			preparation: "Vorbereitung zum Hochladen...",
			upload: "Firmware wird hochgeladen",
			update: "Firmware-Update...",
			timeLeft: "Verbleibende Zeit"
		},
		notify: {
			newVersion: "Update {version} verfügbar",
			completed: "Firmware-Update erfolgreich abgeschlossen",
			warning: "Das Firmware-Update ist fehlgeschlagen. Schalten Sie das Gerät aus und wieder ein und versuchen Sie dann erneut, es zu aktualisieren.",
			error: "Fehler beim Firmware-Update",
			errorDownload: "Fehler beim Herunterladen der Firmware vom Server. Möglicherweise besteht keine Internetverbindung.",
			errorUpload: "Fehler beim Hochladen der Firmware auf das PJCAN-Gerät. Möglicherweise besteht keine Bluetooth-Verbindung.",
			errorWaitUpdate:
				"Das PJCAN-Gerät hat eine Zeitüberschreitung. Schalten Sie das Gerät aus und wieder ein und versuchen Sie dann erneut, es zu aktualisieren."
		}
	},

	error: {
		title: "Was schaust du dir an,\nschreib an PJ82",
		version: "Fehler beim Anfordern der Geräteversion. Verbinden Sie das PJCAN-Gerät erneut."
	},

	rules: {
		required: "Pflichtfeld",
		counter: "Maximal {n} Zeichen | Maximal {n} Zeichen | Maximal {n} Zeichen | Maximal {n} Zeichen",
		english: "Nur lateinische Zeichen und Zahlen sind erlaubt."
	},

	menu: {
		onboard: "Bordcomputer",
		onboardButtons: "Bordcomputer-Tasten",
		test: "Testen",
		language: "Sprachauswahl",
		settings: {
			buttonsSW1: "Lenkradtasten",
			buttonsSW3: "SW3-Tasten",
			options: "Optionen"
		},
		update: "Auf {version} aktualisieren",
		rollback: "Auf {version} zurücksetzen",
		install: "Installieren",
		about: "Über"
	},

	activation: {
		success: "Gerät erfolgreich aktiviert! Neustart...",
		error: "Gerät nicht aktiviert. Kontaktieren Sie den Entwickler."
	},

	about: {
		title: "Über",
		version: "Version der Webanwendung",
		versionFirmware: "PJCAN-Firmware-Version",
		carSupport: "Fahrzeugunterstützung",
		author: "Autor",
		sha: "Geräte-Hash"
	},

	deviceInfo: {
		title: "Technische Informationen",
		cpuFreqMHz: "CPU-Frequenz, MHz",
		efuseMac: "MAC-Adresse",
		freeSketchSpace: "Freier Speicherplatz für Firmware",
		sdkVersion: "SDK-Version",
		sketchMD5: "Firmware-MD5",
		sketchSize: "Firmware-Größe",
		temperatureChip: "Chip-Temperatur",
		sha: "SHA",
		hardware: "Platinenversion"
	},

	deviceReset: {
		title: "Gerätekonfiguration zurücksetzen",
		config: "Allgemeine Konfiguration auf Werkseinstellungen zurücksetzen",
		configShort: "Allgemeine Konfiguration",
		view: "Anzeigeeinstellungen auf Werkseinstellungen zurücksetzen",
		viewShort: "Anzeigekonfiguration",
		buttons: "Tasteneinstellungen auf Werkseinstellungen zurücksetzen",
		buttonsShort: "Tastenkonfiguration"
	},

	btn: {
		apply: "Anwenden",
		cancel: "Abbrechen",
		close: "Schließen",
		deviceInfo: "Über das Gerät",
		deviceReset: "Konfiguration zurücksetzen",
		reset: "Zurücksetzen",
		ok: "OK"
	},

	onboard: {
		title: "Bordcomputer",

		viewSetting: {
			enabled: {
				title: "Informationen anzeigen",
				titleShort: "Anzeigen",
				description: "Status der Informationsanzeige auf dem Informationsbildschirm"
			},
			type: {
				title: "Stil der Informationsanzeige",
				description: "Statischen, blinkenden oder laufenden Text anzeigen",
				items: ["Einfacher Text", "Blinkender Text", "Laufender Text"]
			},
			time: {
				title: "Anzeigedauer, Sek.",
				description: "Auf dem Informationsbildschirm für die angegebene Anzahl von Sekunden anzeigen"
			},
			delay: {
				title: "Anzeigepause, Sek.",
				description: "Informationsanzeige für die angegebene Anzahl von Sekunden anhalten"
			}
		},

		info: {
			title: "Informationen",
			acc: {
				title: "ACC",
				description: "Fahrzeugstrom"
			},
			worktime: {
				title: "Betriebszeit",
				description: "Betriebszeit des Geräts seit dem Einschalten",
				menu: "LCD: Betriebszeit"
			},
			voltmeter: {
				title: "Spannung",
				description: "Bordnetzspannung in Volt (Durchschnittswert über 10 Sekunden)",
				menu: "LCD: Spannung"
			},
			temperatureIn: {
				title: "Innentemperatur",
				description: "Messwerte der Fahrzeuginnentemperatur",
				menu: "LCD: Lufttemperatur"
			},
			temperatureOut: {
				title: "Außentemperatur",
				description: "Messwerte der Fahrzeugaußentemperatur",
				menu: "LCD: Lufttemperatur"
			},
			signals: {
				title: "Signale"
			},
			handbrake: {
				title: "Handbremse",
				description: "Position der Handbremse",
				menu: "LCD: Handbremse"
			},
			reverse: {
				title: "Rückwärtsgang",
				description: "Schalthebel in Position R",
				menu: "LCD: Rückwärtsgang"
			},
			light: {
				title: "Hintergrundbeleuchtung",
				description: "Kontakt der Hintergrundbeleuchtung"
			},
			amp: {
				title: "AMP Cont",
				description: "Bose-Einschaltkontakt"
			},
			safetyBelt: {
				title: "Sicherheitsgurt",
				description: "Sicherheitsgurt für Fahrer und Beifahrer",
				menu: "LCD: Sicherheitsgurt"
			},
			signal: {
				title: "Blinker",
				description: "Blinker und Warnblinkanlage",
				menu: "LCD: Blinker"
			},
			device: {
				title: "Geräteparameter",
				menu: "Geräteparameter",
				disableLedWork: {
					title: "LED_WORK-Kontakt",
					description: "Steuerung des LED_WORK-Kontakts"
				},
				disableReverse: {
					title: "REVERSE-Kontakt",
					description: "Steuerung des REVERSE-Kontakts"
				},
				disableRPosition: {
					title: "R_POSITION-Kontakt",
					description: "Steuerung des R_POSITION-Kontakts"
				},
				disableAmpIllum: {
					title: "AMP_ILLUM-Kontakt",
					description: "Steuerung des AMP_ILLUM-Kontakts"
				},
				disableVoltmeter: {
					title: "Voltmeter",
					description: "Voltmeter aktivieren/deaktivieren"
				},
				calibrationOfVoltmeter: {
					title: "Voltmeter-Kalibrierung",
					titleShort: "Kalibrierung",
					description: "Eine positive Zahl verringert den Voltmeterwert, eine negative Zahl erhöht ihn"
				}
			}
		},

		engine: {
			title: "Motor",

			enabled: {
				title: "Motorbetrieb",
				description: "Aktueller Motorstatus",
				menu: "LCD: Motorbetrieb"
			},
			RPM: {
				title: "Motordrehzahl",
				description: "Aktuelle Anzahl der vollen Kurbelwellenumdrehungen pro Minute",
				menu: "LCD: Motordrehzahl"
			},
			countRPM: {
				title: "Drehzahlzähler",
				titleShort: "Drehzahlzähler",
				description: "Gesamtzahl der vollen Kurbelwellenumdrehungen in Tausend",
				menu: "LCD: Drehzahlzähler"
			},
			load: {
				title: "Motorlast",
				description: "Prozentsatz der Motorlast",
				menu: "LCD: Motorlast"
			},
			worktime: {
				title: "Betriebsstunden",
				description: "Gesamtbetriebszeit des Motors",
				menu: "LCD: Betriebsstunden"
			},
			throttle: {
				title: "Drosselklappenstellung",
				description: "Relative Drosselklappenstellung",
				menu: "LCD: Drosselklappenstellung"
			},
			coolant: {
				title: "Kühlmitteltemperatur",
				description: "Kühlmitteltemperatur",
				menu: "LCD: Kühlmitteltemperatur"
			},
			oilLifePercent: {
				title: "Öl-Lebensdauer, %",
				titleShort: "Lebensdauer, %",
				description: "Verbleibende Öl-Lebensdauer in Prozent",
				menu: "LCD: Öl-Lebensdauer, %"
			},
			oilLifeDistance: {
				title: "Kilometer bis zum Ölwechsel, km",
				titleShort: "Kilometer, km",
				description: "Verbleibende Kilometer bis zum Ölwechsel in Kilometern",
				menu: "LCD: Kilometer bis zum Wechsel, km"
			},
			statistics: {
				title: "Statistiken"
			},
			settings: {
				title: "Einstellungen der Motorstatistik",
				menu: "Motorstatistik",
				showDays: {
					title: "Tage in Statistiken anzeigen",
					titleShort: "Tage anzeigen",
					description: "Betriebsstunden auf dem Informationsbildschirm im Format d.hh:mm:ss anzeigen"
				},
				worktime: {
					title: "Betriebszeit, Min.",
					description: "Gesamtbetriebszeit des Motors"
				},
				countRPM: {
					title: "Drehzahlzähler, Tsd.",
					description: "Gesamtzahl der vollen Kurbelwellenumdrehungen in Tausend"
				}
			},
			oilSettings: {
				title: "Einstellungen der Ölstatistik",
				menu: "Ölstatistik",
				oilDurationHours: {
					title: "Betriebszeit mit Öl, Std.",
					titleShort: "Betriebszeit, Std.",
					description: "Gesamtbetriebszeit des Motors mit dem aktuellen Öl"
				},
				oilDistanceKm: {
					title: "Kilometerleistung mit Öl, km",
					titleShort: "Kilometer, km",
					description: "Gesamtkilometerleistung des Fahrzeugs mit dem aktuellen Öl"
				},
				oilHoursLimit: {
					title: "Ölwechsellimit, Std.",
					titleShort: "Öllimit, Std.",
					description: "Betriebsstundenlimit für den Ölwechsel"
				},
				oilHoursLimitItems: [
					"ILSAC / Japan (220 Std.) — für Mazda (Standard)",
					"ACEA / Europa (250 Std.) — starke Öle",
					"PAO / Premium (300 Std.) — PAO-Synthetik",
					"Mineral (180 Std.) — einfache Öle",
					"Benutzerdefiniertes Limit..."
				],
				oilHoursLimitCustom: {
					title: "Benutzerdefiniertes Limit, Std.",
					description: "Geben Sie Ihr benutzerdefiniertes Ölwechsellimit ein (von 150 bis 350 Stunden)"
				}
			}
		},

		fuel: {
			title: "Kraftstoff",

			current: {
				title: "Kraftstoffverbrauch",
				description: "Wert des Bordcomputers, l/100 km",
				menu: "LCD: Kraftstoffverbrauch"
			},
			avg: {
				title: "Durchschnittsverbrauch",
				description: "Wert des Bordcomputers, l/100 km",
				menu: "LCD: Durchschnittsverbrauch"
			},
			settings: {
				title: "Verbrauchseinstellungen",
				menu: "Verbrauchseinstellungen",
				ratio: {
					title: "Kraftstoffverbrauchskoeffizient",
					description: "Zur Anpassung des Verbrauchs von LPG oder anderen Kraftstoffarten"
				}
			}
		},

		movement: {
			title: "Tachometer",

			speed: {
				title: "Fahrzeuggeschwindigkeit",
				description: "Wert des Bordcomputers, km/h",
				menu: "LCD: Fahrzeuggeschwindigkeit"
			},
			speedAVG: {
				title: "Durchschnittsgeschwindigkeit",
				description: "Wert des Bordcomputers, km/h",
				menu: "LCD: Durchschnittsgeschwindigkeit"
			},
			restWay: {
				title: "Verbleibende Strecke, km",
				description: "Wert des Bordcomputers in km",
				menu: "LCD: Verbleibende Strecke"
			}
		},

		doors: {
			title: "Türen",
			menu: "LCD: Türen",

			doorFL: {
				title: "Vorne links",
				description: "Aktueller Zustand der vorderen linken Tür"
			},
			doorFR: {
				title: "Vorne rechts",
				description: "Aktueller Zustand der vorderen rechten Tür"
			},
			doorBL: {
				title: "Hinten links",
				description: "Aktueller Zustand der hinteren linken Tür"
			},
			doorBR: {
				title: "Hinten rechts",
				description: "Aktueller Zustand der hinteren rechten Tür"
			},
			trunk: {
				title: "Kofferraum",
				description: "Aktueller Zustand des Kofferraums"
			},

			settings: {
				title: "Türenkonfiguration",
				frontReverse: {
					title: "Vordertüren tauschen",
					titleShort: "Vordertüren",
					description: "Die Vordertüren tauschen"
				},
				backReverse: {
					title: "Hintertüren tauschen",
					titleShort: "Hintertüren",
					description: "Die Hintertüren tauschen"
				},
				frontBackReverse: {
					title: "Vorder- mit Hintertüren tauschen",
					titleShort: "Vordere mit hinteren",
					description: "Die vorderen und hinteren Türen tauschen"
				}
			}
		},

		volume: {
			title: "Ton",
			menu: "LCD: Ton",

			mute: {
				title: "Ton stummschalten",
				description: "Ton vorübergehend stummschalten, ohne den aktuellen Pegel zu ändern"
			},
			level: {
				title: "Lautstärke",
				description: "Aktueller Lautstärkewert"
			}
		},

		climate: {
			title: "Klimaanlage",
			menu: "LCD: Klimaanlage",

			enabled: {
				title: "Betriebsstatus",
				description: "Betriebsstatus der Klimaanlage"
			},
			autoMode: {
				title: "Auto",
				description: "Automatikmodus der Klimaanlage"
			},
			ac: {
				title: "AC",
				description: "Betrieb der Klimaanlage"
			},
			temperature: {
				title: "Temperatur",
				description: "Eingestellter Temperaturwert der Klimaanlage"
			},
			air: {
				title: "Innenraumbelüftung",
				description: "Luftzirkulation im Innenraum"
			},
			blow: {
				title: "Luftstrom",
				description: "Richtung des Luftstroms"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Bose aktivieren",
				description: "Bose-Soundverstärker aktivieren/deaktivieren"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"Es handelt sich um ein Geräuschunterdrückungssystem, das den Klang kontinuierlich anpasst, um Hintergrundgeräusche und Fahrzeuggeschwindigkeit auszugleichen"
			},
			radioFM: {
				title: "Radio FM",
				description: "FM-Radio aktivieren/deaktivieren"
			},
			wow: {
				title: "Wow",
				description: "Signalton bei Parameteränderung"
			},
			balance: {
				title: "Balance",
				description: "Klangbalance nach rechts oder links verschieben"
			},
			bass: {
				title: "Bass",
				description: "Verstärkung der tiefen Frequenzen"
			},
			fade: {
				title: "Fade",
				description: "Klangbalance nach vorne oder hinten verschieben"
			},
			treble: {
				title: "Höhen",
				description: "Verstärkung der hohen Frequenzen"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"Die CenterPoint-Technologie wandelt Stereosignale in Mehrkanal-Audio um und erzeugt gleichzeitig eine breitere/immersivere Klangbühne"
			},

			volumeConfig: {
				title: "Starteinstellungen",
				start: {
					title: "Lautstärke ändern",
					description: "Stellen Sie die unten angegebene Lautstärke ein, wenn der PJCAN-Adapter eingeschaltet wird"
				},
				level: {
					title: "Lautstärke",
					description: "Die Lautstärke, die beim Einschalten des PJCAN-Adapters eingestellt wird"
				}
			}
		}
	},

	buttons: {
		title: "Tasteneinstellungen",
		extendedMode: "Erweiterter Modus",
		hintMode: " (erweiterter Modus)",

		mode: "MODE-Taste",
		setUp: "SET UP-Taste",
		setDown: "SET DOWN-Taste",
		volUp: "VOL +-Taste",
		volDown: "VOL --Taste",
		volMute: "VOL MUTE-Taste",

		extended: {
			title: "Erweiterter Modus",
			description: "Unterstützung für doppeltes, dreifaches Drücken und Halten einer Taste"
		},
		resistance: {
			title: "Tastenwiderstand",
			description: "Widerstandsintervall der Taste",
			cur: {
				title: "Aktueller Widerstand",
				description: "Widerstandswert der gedrückten Taste. Kann nicht geändert werden"
			},
			min: {
				title: "Minimaler Widerstand",
				description:
					"Geben Sie den minimalen Tastenwert an, aber lassen Sie keine Überschneidungen mit anderen Tasten zu"
			},
			max: {
				title: "Maximaler Widerstand",
				description:
					"Geben Sie den maximalen Tastenwert an, aber lassen Sie keine Überschneidungen mit anderen Tasten zu"
			}
		},
		pressSingle: {
			title: "Taste einmal gedrückt",
			description: "Die Funktion, die beim Drücken der Taste ausgeführt wird"
		},
		pressDual: {
			title: "Taste zweimal gedrückt",
			description: "Die Funktion, die beim zweimaligen Drücken der Taste ausgeführt wird"
		},
		pressTriple: {
			title: "Taste 3-mal gedrückt",
			description: "Die Funktion, die beim 3-maligen Drücken der Taste ausgeführt wird"
		},
		pressHold: {
			title: "Taste halten",
			description: "Die Funktion, die ausgeführt wird, wenn die Taste 3 oder mehr Sekunden lang gehalten wird.",
			time: {
				title: "Tastenhaltedauer",
				description: "Tastenhaltedauer, Sek."
			}
		},

		functions: {
			0: "Keine Funktion",
			1: "PJCAN: Steuermodus ändern",
			2: "PJCAN: Motorwerte anzeigen",
			3: "PJCAN: Verbrauchswerte anzeigen",
			4: "PJCAN: Bewegungswerte anzeigen",
			5: "PJCAN: Temperaturwerte anzeigen",
			6: "PJCAN: Datum und Uhrzeit anzeigen",
			7: "HU: MUTE-Taste am Lenkrad",
			8: "HU: MODE-Taste am Lenkrad",
			9: "HU: SET DOWN-Taste am Lenkrad",
			10: "HU: SET UP-Taste am Lenkrad",
			11: "HU: Vol+-Taste am Lenkrad",
			12: "HU: Vol--Taste am Lenkrad",
			13: "HU: Sprachsteuerung öffnen",
			14: "HU: Equalizer öffnen",
			15: "HU: Radio öffnen",
			16: "HU: Radiowelle suchen",
			17: "HU: Kamera öffnen",
			18: "HU: Telefon öffnen",
			42: "HU: Pause/Wiedergabe",
			19: "BC: INFO-Taste (BC-Informationen)",
			20: "BC: CLOCK-Taste (Zeit am BC)",
			21: "BC: CLOCK H-Taste (Stunden)",
			22: "BC: CLOCK M-Taste (Minuten)",
			23: "BC: CLOCK 24/12-Taste (Zeitformat ändern)",
			24: "BC: Minuten auf 0 zurücksetzen",
			25: "BC: INFO/CLOCK-Modus wechseln",
			26: "BC: INFO halten (Verbrauch zurücksetzen)",
			27: "BC: CLOCK halten (Uhr einstellen)",
			28: "BOSE: Verstärker aktivieren/deaktivieren",
			29: "BOSE: Audio PLT aktivieren/deaktivieren",
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
			41: "BOSE: CenterPoint-Modi wechseln (zyklisch)"
		},

		edit: {
			title: "Taste \"{name}\" bearbeiten",
			beginValue: {
				title: "Anfangswert",
				titleShort: "Start",
				description: "Anfangswert des Widerstandsbereichs der Taste in Einheiten."
			},
			endValue: {
				title: "Endwert",
				titleShort: "Ende",
				description: "Endwert des Widerstandsbereichs der Taste in Einheiten."
			}
		},

		notify: {
			detected: "Taste \"{id}\" gedrückt",
			notDefined: "Gedrückte Taste ist nicht definiert!"
		}
	},

	onboardButtons: {
		title: "Bordcomputer-Tasten",
		buttons: {
			holdClock: "CLOCK halten",
			holdInfo: "SET/INFO halten",
			holdClockShort: "CLOCK halt.",
			holdInfoShort: "INFO halt.",
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
		title: "Testen",
		description:
			"Geben Sie Text ein (nur lateinische Zeichen und Zahlen), wählen Sie Stil und Ausrichtung, geben Sie die Anzeigezeit an und klicken Sie auf \"Anzeigen\"",
		text: {
			title: "Text",
			description: "Auf dem Informationsbildschirm angezeigter Text"
		},
		btnShow: "Anzeigen"
	},

	options: {
		title: "Optionen",
		lcd: {
			title: "Bordcomputer-Bildschirm",
			enabled: {
				title: "Bordcomputer-Bildschirm",
				description: "Informationsausgabe auf dem Bordcomputer-Informationsbildschirm aktivieren/deaktivieren"
			},
			logo: {
				title: "Logo",
				description: "Text, der angezeigt wird, wenn keine Daten zur Ausgabe auf dem Bordcomputer-Bildschirm vorhanden sind. Maximal 12 Zeichen."
			},
			hello: {
				title: "Begrüßungstext",
				description: "Text, der beim Einschalten von ACC angezeigt wird. Maximal 32 Zeichen.",
				menu: "BC: Begrüßungstext"
			}
		},
		head: {
			title: "Haupteinheit",
			titleShort: "HU",
			protocol: {
				title: "UART-Protokoll",
				description: "UART-Protokoll für die Kommunikation zwischen PJCAN und der Haupteinheit",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)",
					5: "Hiworld MZF1.2 (GB) 1N4MZF10B"
				}
			},
			reverseUart: {
				title: "UART-Kontakte tauschen",
				description: "Tauschen Sie die UART-Kontakte, wenn keine Kommunikation zwischen PJCAN und der Haupteinheit besteht"
			},
			onboardShow: {
				title: "Informationen der Haupteinheit anzeigen",
				titleShort: "HU-Info anzeigen",
				description: "Text der Haupteinheit anstelle des Logos auf dem Bordcomputer-Bildschirm anzeigen",
				menu: "LCD: Text der Haupteinheit anzeigen"
			},
			sendButton: {
				title: "Lenkradtasten",
				description: "Unterstützung für die Steuerung der Haupteinheit mit den Lenkradtasten"
			},
			sendClimate: {
				title: "Klimaanlage auf der Haupteinheit anzeigen",
				description: "Klimaanlagen-Panel auf der Haupteinheit anzeigen (wenn das Protokoll diese Funktionalität unterstützt)"
			},
			sendDoors: {
				title: "Türenstatus auf der Haupteinheit anzeigen",
				titleShort: "Türen auf HU anzeigen",
				description: "Türenstatus des Fahrzeugs auf der Haupteinheit anzeigen (wenn das Protokoll diese Funktionalität unterstützt)"
			},
			sendOnboard: {
				title: "Bordcomputer-Daten auf der Haupteinheit anzeigen",
				description: "Türenstatus und Bordcomputer-Werte auf der Haupteinheit anzeigen (wenn das Protokoll diese Funktionalität unterstützt)"
			},
			holdToFlip: {
				title: "Lautstärkeregelung",
				titleShort: "Lautstärkeregelung",
				description: "Sanfte Änderung der Lautstärke beim Halten der Tasten Vol+/Vol- (empfohlen, wenn die Haupteinheit diese Funktion nicht unterstützt)."
			}
		},
		datetime: {
			title: "Datum und Uhrzeit",
			description:
				"Um Datum und Uhrzeit auf dem Bordcomputer-Bildschirm anzuzeigen, müssen Sie die Webanwendung bei jedem Einschalten der Zündung starten, um die Daten mit dem PJCAN-Adapter zu synchronisieren.",
			menu: "LCD: Anzeigeoptionen",
			date: {
				title: "Datum anzeigen",
				description: "Aktuelles Datum auf dem Bordcomputer-Bildschirm anzeigen"
			},
			time: {
				title: "Uhrzeit anzeigen",
				description: "Aktuelle Uhrzeit auf dem Bordcomputer-Bildschirm anzeigen"
			},
			dayWeek: {
				title: "Wochentag anzeigen",
				description: "Aktuellen Wochentag auf dem Bordcomputer-Bildschirm anzeigen"
			},
			dateAndDayWeek: {
				title: "Datum und Wochentag anzeigen",
				titleShort: "Datum und Tag anz.",
				description: "Aktuelles Datum und Wochentag auf dem Bordcomputer-Bildschirm anzeigen"
			},
			timeAndDayWeek: {
				title: "Uhrzeit und Wochentag anzeigen",
				titleShort: "Uhrzeit und Tag anz.",
				description: "Aktuelle Uhrzeit und Wochentag auf dem Bordcomputer-Bildschirm anzeigen"
			},
			fullDatetime: {
				title: "Vollständiges Datum und Uhrzeit anzeigen",
				titleShort: "Voll. Datum u. Uhrzeit anz.",
				description: "Aktuelles Datum und Uhrzeit im Vollformat auf dem Bordcomputer-Bildschirm anzeigen"
			}
		},
		onboard: {
			title: "Bordcomputer",
			titleShort: "BC",
			description:
				"Liste der auf dem Bildschirm \"Bordcomputer\" angezeigten Karten. Die Reihenfolge wird durch Ziehen der Blöcke geändert. Sie können die Anzeige auf der Seite auch aktivieren/deaktivieren.",
			reset: {
				menu: "Standardmäßig anordnen"
			}
		}
	},

	scanner: {
		dialog: {
			title: "CAN-Bus-Scannen",
			text: "CAN-Bus-Scannen starten?\n" + "Die Scandaten werden automatisch an PJ82 gesendet."
		},
		btn: {
			start: "Start",
			next: "Weiter",
			finish: "Fertig"
		},
		step: {
			0: {
				title: "Motorwerte scannen",
				text: "Starten Sie den Automotor und drücken Sie die Taste \"Weiter\""
			},
			1: {
				title: "Türwerte scannen",
				text:
					"1. Öffnen und schließen Sie die Fahrertür;\n" +
					"2. Öffnen und schließen Sie die hintere linke Tür;\n" +
					"3. Öffnen und schließen Sie den Kofferraum;\n" +
					"4. Öffnen und schließen Sie die hintere rechte Tür;\n" +
					"5. Öffnen und schließen Sie die vordere rechte Tür.\n" +
					"\n" +
					"Kehren Sie in den Innenraum zurück und drücken Sie die Taste \"Weiter\""
			},
			2: {
				title: "Signalwerte scannen",
				text:
					"1. Legen Sie den Fahrersicherheitsgurt an;\n" +
					"2. Legen Sie den Beifahrersicherheitsgurt an;\n" +
					"3. Legen Sie die Sicherheitsgurte der Fondpassagiere an;\n" +
					"4. Schalten Sie den linken Blinker ein, dann den rechten, dann schalten Sie ihn aus;\n" +
					"5. Schalten Sie die Warnblinkanlage ein, dann schalten Sie sie aus.\n" +
					"\n" +
					"Drücken Sie die Taste \"Weiter\""
			},
			3: {
				title: "Klimawerte scannen",
				text:
					"1. AUTO ein-/ausschalten;\n" +
					"2. AC ein-/ausschalten;\n" +
					"3. Luftstromrichtung ändern;\n" +
					"4. Luftstromgeschwindigkeit ändern.\n" +
					"\n" +
					"Drücken Sie die Taste \"Weiter\""
			},
			4: {
				title: "Bewegungswerte scannen",
				text:
					"1. Handbremse lösen;\n" +
					"2. Rückwärtsgang einlegen und ein wenig zurücksetzen;\n" +
					"3. Fahrmodus in einem Automatikgetriebe einlegen oder Gänge in einem Schaltgetriebe schalten und vorwärts fahren.\n" +
					"\n" +
					"Nachdem das Auto angehalten hat, den Motor abstellen und die Taste \"Fertig\" drücken"
			}
		},
		notify: {
			errorStart: "Scannen nicht gestartet.\n" + "Überprüfen Sie die Verbindung zum PJCAN-Gerät.",
			errorSend: "Fehler beim Senden des Scandatenpakets.",
			warningSend: "Keine Scandaten zum Senden."
		},
		upload: {
			title: "Auf den Server hochladen",
			text: "Gescannte Werte auf den Server hochladen.",
			leftToLoad:
				"Keine Pakete zum Hochladen | {n} Paket zum Hochladen übrig | {n} Pakete zum Hochladen übrig | {n} Pakete zum Hochladen übrig"
		}
	},

	choosingCarModel: {
		title: "Automodell auswählen",
		label: "Automodell",
		description: "Möglichkeit, das vom PJCAN-Adapter unterstützte Automodell zu ändern.",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (Test)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5"
		}
	},

	help: {
		onboard: {
			notify: "Wischen Sie nach links/rechts, um durch die Informationsblöcke zu scrollen"
		}
	},
	language: {
		title: "Sprachauswahl",
		label: "Sprache der Benutzeroberfläche",
		description: "Wählen Sie die für Sie passende Sprache der Benutzeroberfläche"
	}
};
