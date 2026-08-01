export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Połącz",
			disconnect: "Rozłącz"
		},
		dialog: {
			noConnected: "Nie jesteś podłączony do żadnego urządzenia Bluetooth.",
			connected: "Jesteś podłączony do urządzenia Bluetooth PJCAN."
		},
		notify: {
			noConnected: "Brak połączenia z urządzeniem Bluetooth.",
			connected: "PJCAN podłączony",
			disconnected: "PJCAN odłączony",
			lostConnected: "Utracono połączenie z urządzeniem Bluetooth PJCAN. Próba ponownego połączenia...",
			noData: "Brak danych do wysłania"
		},
		server: {
			deviceSelected: "Wybrano urządzenie bluetooth {n}.",
			deviceDisconnected: "Urządzenie Bluetooth {n} jest odłączone.",
			GATTConnect: "Łączenie z serwerem GATT...",
			getService: "Serwer GATT podłączony, odczytywanie usługi...",
			getCharacteristic: "Usługa odebrana, odczytywanie charakterystyki...",
			characteristicDone: "Charakterystyka odebrana.",
			startNotifications: "Uruchamianie powiadomień...",
			notificationsDone: "Powiadomienia uruchomione.",
			reconnect: "Ponowna próba za {n} sekund... (pozostało {c} prób)",
			reconnectRestored: "Połączenie z urządzeniem Bluetooth PJCAN zostało przywrócone.",
			connectionLost: "Utracono komunikację z urządzeniem Bluetooth PJCAN.",
			receive: "Odbierz dane: ID {n}",
			send: "Wysyłanie danych: ID {n}",
			versionProtocol: "Wersja protokołu: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "Aktualizuj PJCAN",
		warning: "Uwaga!",
		btn: {
			update: "Aktualizuj",
			rollback: "Wycofaj",
			later: "Później"
		},
		dialog: {
			updateTo: "Zaktualizować oprogramowanie PJCAN do wersji {version}?",
			rollbackTo: "Wycofać oprogramowanie PJCAN do wersji {version}?",
			browserOutdated: "Wersja Twojej przeglądarki jest przestarzała.\n" + "Zaktualizuj ją i ponownie otwórz aplikację internetową."
		},
		process: {
			preparation: "Przygotowywanie do wysłania...",
			upload: "Wysyłanie oprogramowania",
			update: "Aktualizacja oprogramowania...",
			timeLeft: "Pozostały czas"
		},
		notify: {
			newVersion: "Dostępna aktualizacja {version}",
			completed: "Aktualizacja oprogramowania zakończona pomyślnie",
			warning: "Aktualizacja oprogramowania nie powiodła się. Wyłącz i włącz urządzenie, a następnie spróbuj ponownie zaktualizować.",
			error: "Błąd aktualizacji oprogramowania",
			errorDownload: "Błąd pobierania oprogramowania z serwera. Może brakować połączenia z internetem.",
			errorUpload: "Błąd wysyłania oprogramowania do urządzenia PJCAN. Może brakować połączenia Bluetooth.",
			errorWaitUpdate:
				"Upłynął limit czasu urządzenia PJCAN. Wyłącz i włącz urządzenie, a następnie spróbuj ponownie zaktualizować."
		}
	},

	error: {
		title: "Na co patrzysz,\nnapisz do PJ82",
		version: "Błąd żądania wersji urządzenia. Podłącz ponownie urządzenie PJCAN."
	},

	rules: {
		required: "Pole wymagane",
		counter: "Maksymalnie {n} znaków | Maksymalnie {n} znak | Maksymalnie {n} znaki | Maksymalnie {n} znaków",
		english: "Dozwolone są tylko znaki łacińskie i cyfry."
	},

	menu: {
		onboard: "Komputer pokładowy",
		onboardButtons: "Przyciski pokładowe",
		test: "Testowanie",
		language: "Wybór języka",
		settings: {
			buttonsSW1: "Przyciski na kierownicy",
			buttonsSW3: "Przyciski SW3",
			options: "Opcje"
		},
		update: "Aktualizuj do {version}",
		rollback: "Wycofaj do {version}",
		install: "Zainstaluj",
		about: "O programie"
	},

	activation: {
		success: "Urządzenie aktywowane pomyślnie! Ponowne uruchamianie...",
		error: "Urządzenie nieaktywowane. Skontaktuj się z deweloperem."
	},

	about: {
		title: "O programie",
		version: "Wersja aplikacji internetowej",
		versionFirmware: "Wersja oprogramowania PJCAN",
		carSupport: "Wsparcie dla samochodu",
		author: "Autor",
		sha: "Hash urządzenia"
	},

	deviceInfo: {
		title: "Informacje techniczne",
		cpuFreqMHz: "Częstotliwość procesora, MHz",
		efuseMac: "Adres MAC",
		freeSketchSpace: "Wolne miejsce na oprogramowanie",
		sdkVersion: "Wersja SDK",
		sketchMD5: "MD5 oprogramowania",
		sketchSize: "Rozmiar oprogramowania",
		temperatureChip: "Temperatura układu",
		sha: "SHA",
		hardware: "Wersja płyty"
	},

	deviceReset: {
		title: "Zresetuj konfigurację urządzenia",
		config: "Zresetuj ogólną konfigurację do ustawień fabrycznych",
		configShort: "Konfiguracja ogólna",
		view: "Zresetuj ustawienia wyświetlania do domyślnych",
		viewShort: "Konfiguracja wyświetlania",
		buttons: "Zresetuj ustawienia przycisków do domyślnych",
		buttonsShort: "Konfiguracja przycisków"
	},

	btn: {
		apply: "Zastosuj",
		cancel: "Anuluj",
		close: "Zamknij",
		deviceInfo: "O urządzeniu",
		deviceReset: "Zresetuj konfigurację",
		reset: "Zresetuj",
		ok: "OK"
	},

	onboard: {
		title: "Komputer pokładowy",

		viewSetting: {
			enabled: {
				title: "Wyświetlaj informacje",
				titleShort: "Wyświetlaj",
				description: "Stan wyświetlania informacji na ekranie informacyjnym"
			},
			type: {
				title: "Styl wyświetlania informacji",
				description: "Wyświetlaj tekst statyczny, migający lub przewijany",
				items: ["Zwykły tekst", "Migający tekst", "Przewijany tekst"]
			},
			time: {
				title: "Czas wyświetlania, sek.",
				description: "Pokazuj na ekranie informacyjnym przez określoną liczbę sekund"
			},
			delay: {
				title: "Czas pauzy wyświetlania, sek.",
				description: "Wstrzymaj wyświetlanie informacji na określoną liczbę sekund"
			}
		},

		info: {
			title: "Informacje",
			acc: {
				title: "ACC",
				description: "Zasilanie samochodu"
			},
			worktime: {
				title: "Czas pracy",
				description: "Czas pracy urządzenia od włączenia",
				menu: "LCD: Czas pracy"
			},
			voltmeter: {
				title: "Napięcie",
				description: "Napięcie sieci pokładowej w woltach (średnia wartość z 10 sekund)",
				menu: "LCD: Napięcie"
			},
			temperatureIn: {
				title: "Temperatura wewnętrzna",
				description: "Odczyty temperatury wewnątrz samochodu",
				menu: "LCD: Temperatura powietrza"
			},
			temperatureOut: {
				title: "Temperatura zewnętrzna",
				description: "Odczyty temperatury na zewnątrz samochodu",
				menu: "LCD: Temperatura powietrza"
			},
			signals: {
				title: "Sygnały"
			},
			handbrake: {
				title: "Hamulec ręczny",
				description: "Pozycja hamulca ręcznego",
				menu: "LCD: Hamulec ręczny"
			},
			reverse: {
				title: "Bieg wsteczny",
				description: "Dźwignia zmiany biegów w pozycji R",
				menu: "LCD: Bieg wsteczny"
			},
			light: {
				title: "Podświetlenie",
				description: "Styk podświetlenia"
			},
			amp: {
				title: "AMP Cont",
				description: "Styk włączania Bose"
			},
			safetyBelt: {
				title: "Pas bezpieczeństwa",
				description: "Pas bezpieczeństwa kierowcy i pasażera",
				menu: "LCD: Pas bezpieczeństwa"
			},
			signal: {
				title: "Kierunkowskaz",
				description: "Kierunkowskaz i sygnał zatrzymania awaryjnego",
				menu: "LCD: Kierunkowskaz"
			},
			device: {
				title: "Parametry urządzenia",
				menu: "Parametry urządzenia",
				disableLedWork: {
					title: "Styk LED_WORK",
					description: "Sterowanie stykiem LED_WORK"
				},
				disableReverse: {
					title: "Styk REVERSE",
					description: "Sterowanie stykiem REVERSE"
				},
				disableRPosition: {
					title: "Styk R_POSITION",
					description: "Sterowanie stykiem R_POSITION"
				},
				disableAmpIllum: {
					title: "Styk AMP_ILLUM",
					description: "Sterowanie stykiem AMP_ILLUM"
				},
				disableVoltmeter: {
					title: "Woltomierz",
					description: "Włącz/wyłącz woltomierz"
				},
				calibrationOfVoltmeter: {
					title: "Kalibracja woltomierza",
					titleShort: "Kalibracja",
					description: "Liczba dodatnia zmniejsza wartość woltomierza, liczba ujemna ją zwiększa"
				}
			}
		},

		engine: {
			title: "Silnik",

			enabled: {
				title: "Praca silnika",
				description: "Aktualny stan silnika",
				menu: "LCD: Praca silnika"
			},
			RPM: {
				title: "Obroty silnika",
				description: "Aktualna liczba pełnych obrotów wału korbowego silnika na minutę",
				menu: "LCD: Obroty silnika"
			},
			countRPM: {
				title: "Licznik obrotów",
				titleShort: "Licznik obrotów",
				description: "Całkowita liczba pełnych obrotów wału korbowego silnika w tysiącach",
				menu: "LCD: Licznik obrotów"
			},
			load: {
				title: "Obciążenie silnika",
				description: "Procentowe obciążenie silnika",
				menu: "LCD: Obciążenie silnika"
			},
			worktime: {
				title: "Motogodziny",
				description: "Całkowity czas pracy silnika",
				menu: "LCD: Motogodziny"
			},
			throttle: {
				title: "Pozycja przepustnicy",
				description: "Względna pozycja przepustnicy",
				menu: "LCD: Pozycja przepustnicy"
			},
			coolant: {
				title: "Temperatura płynu chłodzącego",
				description: "Temperatura płynu chłodzącego",
				menu: "LCD: Temperatura płynu chłodzącego"
			},
			oilLifePercent: {
				title: "Żywotność oleju, %",
				titleShort: "Żywotność, %",
				description: "Pozostała żywotność oleju w procentach",
				menu: "LCD: Żywotność oleju, %"
			},
			oilLifeDistance: {
				title: "Przebieg do wymiany oleju, km",
				titleShort: "Przebieg, km",
				description: "Pozostały przebieg do wymiany oleju w kilometrach",
				menu: "LCD: Przebieg do wymiany, km"
			},
			statistics: {
				title: "Statystyki"
			},
			settings: {
				title: "Ustawienia statystyk silnika",
				menu: "Statystyki silnika",
				showDays: {
					title: "Pokazuj dni w statystykach",
					titleShort: "Pokazuj dni",
					description: "Wyświetlaj motogodziny na ekranie informacyjnym w formacie d.hh:mm:ss"
				},
				worktime: {
					title: "Czas pracy, min.",
					description: "Całkowity czas pracy silnika"
				},
				countRPM: {
					title: "Licznik obrotów, tys.",
					description: "Całkowita liczba pełnych obrotów wału korbowego silnika w tysiącach"
				}
			},
			oilSettings: {
				title: "Ustawienia statystyk oleju",
				menu: "Statystyki oleju",
				oilDurationHours: {
					title: "Czas pracy na oleju, godz.",
					titleShort: "Czas pracy, godz.",
					description: "Całkowity czas pracy silnika na bieżącym oleju"
				},
				oilDistanceKm: {
					title: "Przebieg na oleju, km",
					titleShort: "Przebieg, km",
					description: "Całkowity przebieg samochodu na bieżącym oleju"
				},
				oilHoursLimit: {
					title: "Limit wymiany oleju, godz.",
					titleShort: "Limit oleju, godz.",
					description: "Limit motogodzin do wymiany oleju"
				},
				oilHoursLimitItems: [
					"ILSAC / Japonia (220 godz.) — dla Mazdy (Domyślnie)",
					"ACEA / Europa (250 godz.) — mocne oleje",
					"PAO / Premium (300 godz.) — syntetyki PAO",
					"Mineralny (180 godz.) — proste oleje",
					"Limit niestandardowy..."
				],
				oilHoursLimitCustom: {
					title: "Limit niestandardowy, godz.",
					description: "Wprowadź swój niestandardowy limit wymiany oleju (od 150 do 350 godzin)"
				}
			}
		},

		fuel: {
			title: "Paliwo",

			current: {
				title: "Zużycie paliwa",
				description: "Wartość komputera pokładowego, l/100 km",
				menu: "LCD: Zużycie paliwa"
			},
			avg: {
				title: "Średnie zużycie",
				description: "Wartość komputera pokładowego, l/100 km",
				menu: "LCD: Średnie zużycie"
			},
			settings: {
				title: "Ustawienia zużycia",
				menu: "Ustawienia zużycia",
				ratio: {
					title: "Współczynnik zużycia paliwa",
					description: "Do regulacji zużycia LPG lub innych rodzajów paliwa"
				}
			}
		},

		movement: {
			title: "Prędkościomierz",

			speed: {
				title: "Prędkość samochodu",
				description: "Wartość komputera pokładowego, km/h",
				menu: "LCD: Prędkość samochodu"
			},
			speedAVG: {
				title: "Średnia prędkość",
				description: "Wartość komputera pokładowego, km/h",
				menu: "LCD: Średnia prędkość"
			},
			restWay: {
				title: "Pozostała odległość, km",
				description: "Wartość komputera pokładowego w km",
				menu: "LCD: Pozostała odległość"
			}
		},

		doors: {
			title: "Drzwi",
			menu: "LCD: Drzwi",

			doorFL: {
				title: "Przednie lewe",
				description: "Aktualny stan przednich lewych drzwi"
			},
			doorFR: {
				title: "Przednie prawe",
				description: "Aktualny stan przednich prawych drzwi"
			},
			doorBL: {
				title: "Tylne lewe",
				description: "Aktualny stan tylnych lewych drzwi"
			},
			doorBR: {
				title: "Tylne prawe",
				description: "Aktualny stan tylnych prawych drzwi"
			},
			trunk: {
				title: "Bagażnik",
				description: "Aktualny stan bagażnika"
			},

			settings: {
				title: "Konfiguracja drzwi",
				frontReverse: {
					title: "Zamień przednie drzwi",
					titleShort: "Przednie drzwi",
					description: "Zamień miejscami przednie drzwi"
				},
				backReverse: {
					title: "Zamień tylne drzwi",
					titleShort: "Tylne drzwi",
					description: "Zamień miejscami tylne drzwi"
				},
				frontBackReverse: {
					title: "Zamień przednie z tylnymi drzwiami",
					titleShort: "Przednie z tylnymi",
					description: "Zamień miejscami przednie i tylne drzwi"
				}
			}
		},

		volume: {
			title: "Dźwięk",
			menu: "LCD: Dźwięk",

			mute: {
				title: "Wycisz dźwięk",
				description: "Tymczasowo wycisz dźwięk bez zmiany bieżącego poziomu"
			},
			level: {
				title: "Poziom dźwięku",
				description: "Aktualna wartość poziomu dźwięku"
			}
		},

		climate: {
			title: "Klimatyzacja",
			menu: "LCD: Klimatyzacja",

			enabled: {
				title: "Stan pracy",
				description: "Stan pracy jednostki klimatyzacji"
			},
			autoMode: {
				title: "Auto",
				description: "Tryb automatyczny jednostki klimatyzacji"
			},
			ac: {
				title: "AC",
				description: "Działanie klimatyzacji"
			},
			temperature: {
				title: "Temperatura",
				description: "Ustawiona wartość temperatury jednostki klimatyzacji"
			},
			air: {
				title: "Wentylacja kabiny",
				description: "Cyrkulacja powietrza wewnątrz kabiny"
			},
			blow: {
				title: "Nawiew",
				description: "Kierunek nawiewu"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Włącz Bose",
				description: "Włącz/wyłącz wzmacniacz dźwięku Bose"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"Jest to system redukcji szumów, który stale dostosowuje dźwięk, aby skompensować hałas w tle i prędkość pojazdu"
			},
			radioFM: {
				title: "Radio FM",
				description: "Włącz/wyłącz radio FM"
			},
			wow: {
				title: "Wow",
				description: "Sygnał dźwiękowy przy zmianie parametrów"
			},
			balance: {
				title: "Balans",
				description: "Przesuń balans dźwięku w prawo lub w lewo"
			},
			bass: {
				title: "Basy",
				description: "Wzmocnienie niskich częstotliwości"
			},
			fade: {
				title: "Fade",
				description: "Przesuń balans dźwięku do przodu lub do tyłu"
			},
			treble: {
				title: "Tony wysokie",
				description: "Wzmocnienie wysokich częstotliwości"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"Technologia CenterPoint przekształca sygnały stereo w dźwięk wielokanałowy i jednocześnie tworzy szerszą/bardziej wciągającą scenę dźwiękową"
			},

			volumeConfig: {
				title: "Ustawienia uruchamiania",
				start: {
					title: "Zmień poziom dźwięku",
					description: "Ustaw poziom dźwięku określony poniżej po włączeniu adaptera PJCAN"
				},
				level: {
					title: "Poziom dźwięku",
					description: "Poziom dźwięku ustawiany po włączeniu adaptera PJCAN"
				}
			}
		}
	},

	buttons: {
		title: "Ustawienia przycisków",
		extendedMode: "Tryb rozszerzony",
		hintMode: " (tryb rozszerzony)",

		mode: "Przycisk MODE",
		setUp: "Przycisk SET UP",
		setDown: "Przycisk SET DOWN",
		volUp: "Przycisk VOL +",
		volDown: "Przycisk VOL -",
		volMute: "Przycisk VOL MUTE",

		extended: {
			title: "Tryb rozszerzony",
			description: "Obsługa podwójnego, potrójnego naciśnięcia i przytrzymania przycisku"
		},
		resistance: {
			title: "Rezystancja przycisku",
			description: "Przedział rezystancji przycisku",
			cur: {
				title: "Bieżąca rezystancja",
				description: "Wartość rezystancji wciśniętego przycisku. Nie można zmienić"
			},
			min: {
				title: "Minimalna rezystancja",
				description:
					"Określ minimalną wartość przycisku, ale nie dopuszczaj do nakładania się wartości z innymi przyciskami"
			},
			max: {
				title: "Maksymalna rezystancja",
				description:
					"Określ maksymalną wartość przycisku, ale nie dopuszczaj do nakładania się wartości z innymi przyciskami"
			}
		},
		pressSingle: {
			title: "Przycisk naciśnięty raz",
			description: "Funkcja wykonywana po naciśnięciu przycisku"
		},
		pressDual: {
			title: "Przycisk naciśnięty dwa razy",
			description: "Funkcja wykonywana po dwukrotnym naciśnięciu przycisku"
		},
		pressTriple: {
			title: "Przycisk naciśnięty 3 razy",
			description: "Funkcja wykonywana po 3-krotnym naciśnięciu przycisku"
		},
		pressHold: {
			title: "Przytrzymanie przycisku",
			description: "Funkcja wykonywana po przytrzymaniu przycisku przez 3 lub więcej sekund.",
			time: {
				title: "Czas przytrzymania przycisku",
				description: "Czas przytrzymania przycisku, sek."
			}
		},

		functions: {
			0: "Brak funkcji",
			1: "PJCAN: zmień tryb sterowania",
			2: "PJCAN: pokaż wartości silnika",
			3: "PJCAN: pokaż wartości zużycia",
			4: "PJCAN: pokaż wartości ruchu",
			5: "PJCAN: pokaż wartości temperatury",
			6: "PJCAN: pokaż datę i godzinę",
			7: "HU: Przycisk MUTE na kierownicy",
			8: "HU: Przycisk MODE na kierownicy",
			9: "HU: Przycisk SET DOWN na kierownicy",
			10: "HU: Przycisk SET UP na kierownicy",
			11: "HU: Przycisk Vol+ na kierownicy",
			12: "HU: Przycisk Vol- na kierownicy",
			13: "HU: otwórz sterowanie głosowe",
			14: "HU: otwórz korektor",
			15: "HU: otwórz radio",
			16: "HU: szukaj fali radiowej",
			17: "HU: otwórz kamerę",
			18: "HU: otwórz telefon",
			42: "HU: Pauza/Odtwarzaj",
			19: "BC: Przycisk INFO (informacje BC)",
			20: "BC: Przycisk CLOCK (czas na BC)",
			21: "BC: Przycisk CLOCK H (godziny)",
			22: "BC: Przycisk CLOCK M (minuty)",
			23: "BC: Przycisk CLOCK 24/12 (zmiana formatu czasu)",
			24: "BC: resetuj minuty do 0",
			25: "BC: przełącz tryb INFO/CLOCK",
			26: "BC: przytrzymaj INFO (resetuj zużycie)",
			27: "BC: przytrzymaj CLOCK (ustawianie zegara)",
			28: "BOSE: włącz/wyłącz wzmacniacz",
			29: "BOSE: włącz/wyłącz Audio PLT",
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
			41: "BOSE: przełącz tryby CenterPoint (cyklicznie)"
		},

		edit: {
			title: "Edycja przycisku \"{name}\"",
			beginValue: {
				title: "Wartość początkowa",
				titleShort: "Początek",
				description: "Początkowa wartość zakresu rezystancji przycisku w jednostkach."
			},
			endValue: {
				title: "Wartość końcowa",
				titleShort: "Koniec",
				description: "Końcowa wartość zakresu rezystancji przycisku w jednostkach."
			}
		},

		notify: {
			detected: "Naciśnięto przycisk \"{id}\"",
			notDefined: "Naciśnięty przycisk nie jest zdefiniowany!"
		}
	},

	onboardButtons: {
		title: "Przyciski pokładowe",
		buttons: {
			holdClock: "przytrzymaj CLOCK",
			holdInfo: "przytrzymaj SET/INFO",
			holdClockShort: "przytr. CLOCK",
			holdInfoShort: "przytr. INFO",
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
		title: "Testowanie",
		description:
			"Wprowadź tekst (tylko znaki łacińskie i cyfry), wybierz styl i wyrównanie, określ czas wyświetlania i kliknij \"Pokaż\"",
		text: {
			title: "Tekst",
			description: "Tekst wyświetlany na ekranie informacyjnym"
		},
		btnShow: "Pokaż"
	},

	options: {
		title: "Opcje",
		lcd: {
			title: "Ekran pokładowy",
			enabled: {
				title: "Ekran pokładowy",
				description: "Włącz/wyłącz wyświetlanie informacji na ekranie informacyjnym pokładowym"
			},
			logo: {
				title: "Logo",
				description: "Tekst wyświetlany, gdy nie ma danych do wyświetlenia na ekranie pokładowym. Maksymalnie 12 znaków."
			},
			hello: {
				title: "Tekst powitalny",
				description: "Tekst wyświetlany po włączeniu ACC. Maksymalnie 32 znaki.",
				menu: "BC: Tekst powitalny"
			}
		},
		head: {
			title: "Jednostka główna",
			titleShort: "HU",
			protocol: {
				title: "Protokół UART",
				description: "Protokół UART do komunikacji między PJCAN a jednostką główną",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)",
					5: "Hiworld MZF1.2 (GB) 1N4MZF10B"
				}
			},
			reverseUart: {
				title: "Zamień styki UART",
				description: "Zamień styki UART, jeśli nie ma komunikacji między PJCAN a jednostką główną"
			},
			onboardShow: {
				title: "Pokaż informacje o jednostce głównej",
				titleShort: "Pokaż info HU",
				description: "Pokaż tekst jednostki głównej na ekranie pokładowym zamiast logo",
				menu: "LCD: Pokaż tekst jednostki głównej"
			},
			sendButton: {
				title: "Przyciski na kierownicy",
				description: "Obsługa sterowania jednostką główną za pomocą przycisków na kierownicy"
			},
			sendClimate: {
				title: "Pokaż klimatyzację na jednostce głównej",
				description: "Pokaż panel klimatyzacji na jednostce głównej (jeśli protokół obsługuje tę funkcjonalność)"
			},
			sendDoors: {
				title: "Pokaż stan drzwi na jednostce głównej",
				titleShort: "Pokaż drzwi na HU",
				description: "Pokaż stan drzwi samochodu na jednostce głównej (jeśli protokół obsługuje tę funkcjonalność)"
			},
			sendOnboard: {
				title: "Pokaż dane pokładowe na jednostce głównej",
				description: "Pokaż stan drzwi i wartości komputera pokładowego na jednostce głównej (jeśli protokół obsługuje tę funkcjonalność)"
			},
			holdToFlip: {
				title: "Regulacja poziomu głośności",
				titleShort: "Regulacja głośności",
				description: "Płynna zmiana poziomu głośności po przytrzymaniu przycisków Vol+/Vol- (zalecane, jeśli jednostka główna nie obsługuje tej funkcji)."
			}
		},
		datetime: {
			title: "Data i godzina",
			description:
				"Aby wyświetlić datę i godzinę na ekranie pokładowym, należy uruchomić aplikację internetową za każdym razem, gdy włączasz zapłon, aby zsynchronizować dane z adapterem PJCAN.",
			menu: "LCD: Opcje wyświetlania",
			date: {
				title: "Pokaż datę",
				description: "Wyświetlaj bieżącą datę na ekranie pokładowym"
			},
			time: {
				title: "Pokaż godzinę",
				description: "Wyświetlaj bieżącą godzinę na ekranie pokładowym"
			},
			dayWeek: {
				title: "Pokaż dzień tygodnia",
				description: "Wyświetlaj bieżący dzień tygodnia na ekranie pokładowym"
			},
			dateAndDayWeek: {
				title: "Pokaż datę i dzień tygodnia",
				titleShort: "Pokaż datę i dzień",
				description: "Wyświetlaj bieżącą datę i dzień tygodnia na ekranie pokładowym"
			},
			timeAndDayWeek: {
				title: "Pokaż godzinę i dzień tygodnia",
				titleShort: "Pokaż godzinę i dzień",
				description: "Wyświetlaj bieżącą godzinę i dzień tygodnia na ekranie pokładowym"
			},
			fullDatetime: {
				title: "Pokaż pełną datę i godzinę",
				titleShort: "Pokaż pełną datę i godzinę",
				description: "Wyświetlaj bieżącą datę i godzinę w pełnym formacie na ekranie pokładowym"
			}
		},
		onboard: {
			title: "Komputer pokładowy",
			titleShort: "BC",
			description:
				"Lista kart wyświetlanych na ekranie \"Komputer pokładowy\". Kolejność zmienia się, przeciągając bloki. Możesz również włączyć/wyłączyć wyświetlanie na stronie.",
			reset: {
				menu: "Ułóż domyślnie"
			}
		}
	},

	scanner: {
		dialog: {
			title: "Skanowanie magistrali CAN",
			text: "Rozpocząć skanowanie magistrali CAN?\n" + "Dane skanowania zostaną automatycznie wysłane do PJ82."
		},
		btn: {
			start: "Rozpocznij",
			next: "Dalej",
			finish: "Zakończ"
		},
		step: {
			0: {
				title: "Skanowanie wartości silnika",
				text: "Uruchom silnik samochodu i naciśnij przycisk \"Dalej\""
			},
			1: {
				title: "Skanowanie wartości drzwi",
				text:
					"1. Otwórz drzwi kierowcy i zamknij je;\n" +
					"2. Otwórz tylne lewe drzwi i zamknij je;\n" +
					"3. Otwórz bagażnik i zamknij go;\n" +
					"4. Otwórz tylne prawe drzwi i zamknij je;\n" +
					"5. Otwórz przednie prawe drzwi i zamknij je.\n" +
					"\n" +
					"Wróć do kabiny i naciśnij przycisk \"Dalej\""
			},
			2: {
				title: "Skanowanie wartości sygnałów",
				text:
					"1. Zapnij pas bezpieczeństwa kierowcy;\n" +
					"2. Zapnij pas bezpieczeństwa pasażera z przodu;\n" +
					"3. Zapnij pasy bezpieczeństwa pasażerów z tyłu;\n" +
					"4. Włącz lewy kierunkowskaz, potem prawy, a następnie go wyłącz;\n" +
					"5. Włącz sygnał zatrzymania awaryjnego, a następnie go wyłącz.\n" +
					"\n" +
					"Naciśnij przycisk \"Dalej\""
			},
			3: {
				title: "Skanowanie wartości klimatyzacji",
				text:
					"1. Włącz/wyłącz AUTO;\n" +
					"2. Włącz/wyłącz AC;\n" +
					"3. Zmień kierunek nawiewu;\n" +
					"4. Zmień prędkość nawiewu.\n" +
					"\n" +
					"Naciśnij przycisk \"Dalej\""
			},
			4: {
				title: "Skanowanie wartości ruchu",
				text:
					"1. Zwolnij hamulec ręczny;\n" +
					"2. Włącz bieg wsteczny i cofnij trochę;\n" +
					"3. Włącz tryb jazdy w automatycznej skrzyni biegów lub zmień bieg w manualnej skrzyni biegów i zacznij jechać do przodu.\n" +
					"\n" +
					"Gdy samochód się zatrzyma, wyłącz silnik i naciśnij przycisk \"Zakończ\""
			}
		},
		notify: {
			errorStart: "Skanowanie nie zostało uruchomione.\n" + "Sprawdź połączenie z urządzeniem PJCAN.",
			errorSend: "Błąd wysyłania pakietu danych skanowania.",
			warningSend: "Brak danych skanowania do wysłania."
		},
		upload: {
			title: "Wysyłanie na serwer",
			text: "Wysyłanie zeskanowanych wartości na serwer.",
			leftToLoad:
				"Brak pakietów do wysłania | Pozostał {n} pakiet do wysłania | Pozostały {n} pakiety do wysłania | Pozostało {n} pakietów do wysłania"
		}
	},

	choosingCarModel: {
		title: "Wybór modelu samochodu",
		label: "Model samochodu",
		description: "Możliwość zmiany modelu samochodu obsługiwanego przez adapter PJCAN.",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (testowanie)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5"
		}
	},

	help: {
		onboard: {
			notify: "Przesuń w lewo/prawo, aby przewijać bloki informacyjne"
		}
	},
	language: {
		title: "Wybór języka",
		label: "Język interfejsu",
		description: "Wybierz język interfejsu, który Ci odpowiada"
	}
};
