export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Connect",
			disconnect: "Disconnect"
		},
		dialog: {
			noConnected: "You are not connected to any Bluetooth device.",
			connected: "You are connected to a PJCAN Bluetooth device."
		},
		notify: {
			noConnected: "No connection to Bluetooth device.",
			connected: "PJCAN connected",
			disconnected: "PJCAN disabled",
			lostConnected: "Lost connection with PJCAN Bluetooth device. Trying to reconnect...",
			noData: "No data to send"
		},
		server: {
			deviceSelected: "{n} bluetooth device selected.",
			deviceDisconnected: "Bluetooth device {n} is disconnected.",
			GATTConnect: "Connecting to GATT server...",
			getService: "GATT server connected, reading service...",
			getCharacteristic: "Service received, read the characteristic ...",
			characteristicDone: "Characteristic received.",
			startNotifications: "Launching notifications...",
			notificationsDone: "Notifications started.",
			reconnect: "Retrying in {n} seconds... ({c} attempts remaining)",
			reconnectRestored: "The connection to the PJCAN Bluetooth device has been re-established.",
			connectionLost: "Communication with the PJCAN Bluetooth device has been lost.",
			receive: "Receive data: ID {n}",
			send: "Sending data: ID {n}",
			versionProtocol: "Protocol version: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "Update PJCAN",
		warning: "Attention!",
		btn: {
			update: "Update",
			rollback: "Rollback",
			later: "Later"
		},
		dialog: {
			updateTo: "Update PJCAN firmware to version {version}?",
			rollbackTo: "Rollback PJCAN firmware to version {version}?",
			browserOutdated: "Your browser version is outdated.\n" + "Update it and open the web application again."
		},
		process: {
			preparation: "Preparing to upload...",
			upload: "Uploading Firmware",
			update: "Firmware update...",
			timeLeft: "Time left"
		},
		notify: {
			newVersion: "Update available {version}",
			completed: "Firmware update completed successfully",
			warning: "The firmware update failed. Turn the device off and on, then try updating again.",
			error: "Firmware update error",
			errorDownload: "Error downloading firmware from the server. There may be no internet connection.",
			errorUpload: "Error uploading firmware to PJCAN device. There may be no Bluetooth connection.",
			errorWaitUpdate:
				"The PJCAN device has timed out. Turn the device off and on, and then try updating again."
		}
	},

	error: {
		title: "What are you looking at,\nwrite to PJ82",
		version: "Error requesting device version. Reconnect the PJCAN device."
	},

	rules: {
		required: "Required field",
		counter: "Maximum {n} characters | Maximum {n} character | Maximum {n} characters | Maximum {n} characters",
		english: "Only Latin characters and numbers are allowed."
	},

	menu: {
		onboard: "On-board computer",
		onboardButtons: "On-board buttons",
		test: "Testing",
		language: "Language selection",
		settings: {
			buttonsSW1: "Steering wheel buttons",
			buttonsSW3: "SW3 buttons",
			options: "Options"
		},
		update: "Update to {version}",
		rollback: "Rollback to {version}",
		install: "Install",
		about: "About"
	},

	activation: {
		success: "Device activated successfully! Rebooting...",
		error: "Device not activated. Contact the developer."
	},

	about: {
		title: "About",
		version: "Web application version",
		versionFirmware: "PJCAN firmware version",
		carSupport: "Car support",
		author: "Author",
		sha: "Device hash"
	},

	deviceInfo: {
		title: "Technical information",
		cpuFreqMHz: "CPU freq, MHz",
		efuseMac: "MAC address",
		freeSketchSpace: "Free space for firmware",
		sdkVersion: "SDK version",
		sketchMD5: "Firmware MD5",
		sketchSize: "Firmware size",
		temperatureChip: "Chip temperature",
		sha: "SHA",
		hardware: "Board version"
	},

	deviceReset: {
		title: "Reset device configuration",
		config: "Reset general configuration to factory settings",
		configShort: "General configuration",
		view: "Reset display settings to factory defaults",
		viewShort: "Display configuration",
		buttons: "Reset button settings to factory defaults",
		buttonsShort: "Button configuration"
	},

	btn: {
		apply: "Apply",
		cancel: "Cancel",
		close: "Close",
		deviceInfo: "About device",
		deviceReset: "Reset configuration",
		reset: "Reset",
		ok: "OK"
	},

	onboard: {
		title: "On-board computer",

		viewSetting: {
			enabled: {
				title: "Display information",
				titleShort: "Display",
				description: "Information display status on the information screen"
			},
			type: {
				title: "Information display style",
				description: "Display static, blinking, or scrolling text",
				items: ["Plain text", "Blinking text", "Scrolling text"]
			},
			time: {
				title: "Display time, sec.",
				description: "Show on the information screen for the specified number of seconds"
			},
			delay: {
				title: "Display pause time, sec.",
				description: "Pause information display for the specified number of seconds"
			}
		},

		info: {
			title: "Information",
			acc: {
				title: "ACC",
				description: "Car power"
			},
			worktime: {
				title: "Work time",
				description: "Device operating time since power-on",
				menu: "LCD: Work time"
			},
			voltmeter: {
				title: "Voltage",
				description: "On-board network voltage in volts (average value for 10 seconds)",
				menu: "LCD: Voltage"
			},
			temperatureIn: {
				title: "Interior temperature",
				description: "Car interior temperature readings",
				menu: "LCD: Air temperature"
			},
			temperatureOut: {
				title: "Exterior temperature",
				description: "Car exterior temperature readings",
				menu: "LCD: Air temperature"
			},
			signals: {
				title: "Signals"
			},
			handbrake: {
				title: "Handbrake",
				description: "Handbrake position",
				menu: "LCD: Handbrake"
			},
			reverse: {
				title: "Reverse gear",
				description: "Gear lever in R position",
				menu: "LCD: Reverse gear"
			},
			light: {
				title: "Backlight",
				description: "Backlight contact"
			},
			amp: {
				title: "AMP Cont",
				description: "Bose power on contact"
			},
			safetyBelt: {
				title: "Seat belt",
				description: "Driver and passenger seat belt",
				menu: "LCD: Seat belt"
			},
			signal: {
				title: "Turn signal",
				description: "Turn signal and emergency stop signal",
				menu: "LCD: Turn signal"
			},
			device: {
				title: "Device parameters",
				menu: "Device parameters",
				disableLedWork: {
					title: "LED_WORK contact",
					description: "Control of the LED_WORK contact"
				},
				disableReverse: {
					title: "REVERSE contact",
					description: "Control of the REVERSE contact"
				},
				disableRPosition: {
					title: "R_POSITION contact",
					description: "Control of the R_POSITION contact"
				},
				disableAmpIllum: {
					title: "AMP_ILLUM contact",
					description: "Control of the AMP_ILLUM contact"
				},
				disableVoltmeter: {
					title: "Voltmeter",
					description: "Enable/disable voltmeter"
				},
				calibrationOfVoltmeter: {
					title: "Voltmeter calibration",
					titleShort: "Calibration",
					description: "A positive number decreases the voltmeter value, a negative number increases it"
				}
			}
		},

		engine: {
			title: "Engine",

			enabled: {
				title: "Engine operation",
				description: "Current engine status",
				menu: "LCD: Engine operation"
			},
			RPM: {
				title: "Engine RPM",
				description: "Current number of full engine crankshaft revolutions per minute",
				menu: "LCD: Engine RPM"
			},
			countRPM: {
				title: "RPM counter",
				titleShort: "RPM counter",
				description: "Total number of full engine crankshaft revolutions in thousands",
				menu: "LCD: RPM counter"
			},
			load: {
				title: "Engine load",
				description: "Engine load percentage",
				menu: "LCD: Engine load"
			},
			worktime: {
				title: "Engine hours",
				description: "Total engine operating time",
				menu: "LCD: Engine hours"
			},
			throttle: {
				title: "Throttle position",
				description: "Relative throttle position",
				menu: "LCD: Throttle position"
			},
			coolant: {
				title: "Coolant temperature",
				description: "Coolant temperature",
				menu: "LCD: Coolant temperature"
			},
			oilLifePercent: {
				title: "Oil life, %",
				titleShort: "Life, %",
				description: "Remaining oil life in percent",
				menu: "LCD: Oil life, %"
			},
			oilLifeDistance: {
				title: "Mileage to oil change, km",
				titleShort: "Mileage, km",
				description: "Remaining mileage to oil change in kilometers",
				menu: "LCD: Mileage to change, km"
			},
			statistics: {
				title: "Statistics"
			},
			settings: {
				title: "Engine statistics settings",
				menu: "Engine statistics",
				showDays: {
					title: "Show days in statistics",
					titleShort: "Show days",
					description: "Display engine hours on the information screen in d.hh:mm:ss format"
				},
				worktime: {
					title: "Operating time, min.",
					description: "Total engine operating time"
				},
				countRPM: {
					title: "RPM counter, thous.",
					description: "Total number of full engine crankshaft revolutions in thousands"
				}
			},
			oilSettings: {
				title: "Oil statistics settings",
				menu: "Oil statistics",
				oilDurationHours: {
					title: "Operating time on oil, h.",
					titleShort: "Operating time, h.",
					description: "Total engine operating time on the current oil"
				},
				oilDistanceKm: {
					title: "Mileage on oil, km",
					titleShort: "Mileage, km",
					description: "Total car mileage on the current oil"
				},
				oilHoursLimit: {
					title: "Oil change limit, h.",
					titleShort: "Oil limit, h.",
					description: "Engine hours limit for oil change"
				},
				oilHoursLimitItems: [
					"ILSAC / Japan (220 h) — for Mazda (Default)",
					"ACEA / Europe (250 h) — strong oils",
					"PAO / Premium (300 h) — PAO-synthetics",
					"Mineral (180 h) — simple oils",
					"Custom limit..."
				],
				oilHoursLimitCustom: {
					title: "Custom limit, h.",
					description: "Enter your custom oil change limit (from 150 to 350 hours)"
				}
			}
		},

		fuel: {
			title: "Fuel",

			current: {
				title: "Fuel consumption",
				description: "On-board computer value, l/100 km",
				menu: "LCD: Fuel consumption"
			},
			avg: {
				title: "Average consumption",
				description: "On-board computer value, l/100 km",
				menu: "LCD: Average consumption"
			},
			settings: {
				title: "Consumption settings",
				menu: "Consumption settings",
				ratio: {
					title: "Fuel consumption coefficient",
					description: "For adjusting the consumption of LPG or other fuel types"
				}
			}
		},

		movement: {
			title: "Speedometer",

			speed: {
				title: "Car speed",
				description: "On-board computer value, km/h",
				menu: "LCD: Car speed"
			},
			speedAVG: {
				title: "Average speed",
				description: "On-board computer value, km/h",
				menu: "LCD: Average speed"
			},
			restWay: {
				title: "Remaining distance, km",
				description: "On-board computer value in km",
				menu: "LCD: Remaining distance"
			}
		},

		doors: {
			title: "Doors",
			menu: "LCD: Doors",

			doorFL: {
				title: "Front left",
				description: "Current state of the front left door"
			},
			doorFR: {
				title: "Front right",
				description: "Current state of the front right door"
			},
			doorBL: {
				title: "Rear left",
				description: "Current state of the rear left door"
			},
			doorBR: {
				title: "Rear right",
				description: "Current state of the rear right door"
			},
			trunk: {
				title: "Trunk",
				description: "Current state of the trunk"
			},

			settings: {
				title: "Door configuration",
				frontReverse: {
					title: "Swap front doors",
					titleShort: "Front doors",
					description: "Swap the front doors"
				},
				backReverse: {
					title: "Swap rear doors",
					titleShort: "Rear doors",
					description: "Swap the rear doors"
				},
				frontBackReverse: {
					title: "Swap front with rear doors",
					titleShort: "Front with rear",
					description: "Swap the front and rear doors"
				}
			}
		},

		volume: {
			title: "Sound",
			menu: "LCD: Sound",

			mute: {
				title: "Mute sound",
				description: "Temporarily mute the sound without changing the current level"
			},
			level: {
				title: "Sound level",
				description: "Current sound level value"
			}
		},

		climate: {
			title: "Climate control",
			menu: "LCD: Climate control",

			enabled: {
				title: "Operating status",
				description: "Operating status of the climate control unit"
			},
			autoMode: {
				title: "Auto",
				description: "Automatic mode of the climate control unit"
			},
			ac: {
				title: "AC",
				description: "Air conditioner operation"
			},
			temperature: {
				title: "Temperature",
				description: "Set temperature value of the climate control unit"
			},
			air: {
				title: "Cabin ventilation",
				description: "Air circulation inside the cabin"
			},
			blow: {
				title: "Airflow",
				description: "Airflow direction"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Enable Bose",
				description: "Enable/disable the Bose sound amplifier"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"It is a noise cancellation system that continuously adjusts the sound to compensate for background noise and vehicle speed"
			},
			radioFM: {
				title: "Radio FM",
				description: "Enable/disable FM radio"
			},
			wow: {
				title: "Wow",
				description: "Beep on parameter change"
			},
			balance: {
				title: "Balance",
				description: "Shift the sound balance to the right or left"
			},
			bass: {
				title: "Bass",
				description: "Low frequency enhancement"
			},
			fade: {
				title: "Fade",
				description: "Shift the sound balance forward or backward"
			},
			treble: {
				title: "Treble",
				description: "High frequency enhancement"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"CenterPoint technology converts stereo signals into multi-channel audio and simultaneously creates a wider/more immersive soundstage"
			},

			volumeConfig: {
				title: "Startup settings",
				start: {
					title: "Change sound level",
					description: "Set the sound level specified below when the PJCAN adapter is turned on"
				},
				level: {
					title: "Sound level",
					description: "The sound level set when the PJCAN adapter is turned on"
				}
			}
		}
	},

	buttons: {
		title: "Button settings",
		extendedMode: "Extended mode",
		hintMode: " (extended mode)",

		mode: "MODE button",
		setUp: "SET UP button",
		setDown: "SET DOWN button",
		volUp: "VOL + button",
		volDown: "VOL - button",
		volMute: "VOL MUTE button",

		extended: {
			title: "Extended mode",
			description: "Support for double, triple press and hold of a button"
		},
		resistance: {
			title: "Button resistance",
			description: "Button resistance interval",
			cur: {
				title: "Current resistance",
				description: "Resistance value of the pressed button. Cannot be changed"
			},
			min: {
				title: "Minimum resistance",
				description:
					"Specify the minimum button value, but do not allow values to overlap with other buttons"
			},
			max: {
				title: "Maximum resistance",
				description:
					"Specify the maximum button value, but do not allow values to overlap with other buttons"
			}
		},
		pressSingle: {
			title: "Button pressed once",
			description: "The function that is executed when the button is pressed"
		},
		pressDual: {
			title: "Button pressed twice",
			description: "The function that is executed when the button is pressed twice"
		},
		pressTriple: {
			title: "Button pressed 3 times",
			description: "The function that is executed when the button is pressed 3 times"
		},
		pressHold: {
			title: "Button hold",
			description: "The function that is executed when the button is held for 3 or more seconds.",
			time: {
				title: "Button hold time",
				description: "Button hold time, sec."
			}
		},

		functions: {
			0: "No function",
			1: "PJCAN: change control mode",
			2: "PJCAN: show engine values",
			3: "PJCAN: show consumption values",
			4: "PJCAN: show movement values",
			5: "PJCAN: show temperature values",
			6: "PJCAN: show date and time",
			7: "HU: MUTE button on steering wheel",
			8: "HU: MODE button on steering wheel",
			9: "HU: SET DOWN button on steering wheel",
			10: "HU: SET UP button on steering wheel",
			11: "HU: Vol+ button on steering wheel",
			12: "HU: Vol- button on steering wheel",
			13: "HU: open voice control",
			14: "HU: open equalizer",
			15: "HU: open radio",
			16: "HU: search for radio wave",
			17: "HU: open camera",
			18: "HU: open phone",
			42: "HU: Pause/Play",
			19: "BC: INFO button (BC information)",
			20: "BC: CLOCK button (time on BC)",
			21: "BC: CLOCK H button (hours)",
			22: "BC: CLOCK M button (minutes)",
			23: "BC: CLOCK 24/12 button (time format change)",
			24: "BC: reset minutes to 0",
			25: "BC: switch INFO/CLOCK mode",
			26: "BC: hold INFO (reset consumption)",
			27: "BC: hold CLOCK (clock setting)",
			28: "BOSE: enable/disable amplifier",
			29: "BOSE: enable/disable Audio PLT",
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
			41: "BOSE: switch CenterPoint modes (cyclically)"
		},

		edit: {
			title: "Editing button \"{name}\"",
			beginValue: {
				title: "Initial value",
				titleShort: "Start",
				description: "Initial value of the button's resistance range in units."
			},
			endValue: {
				title: "Final value",
				titleShort: "End",
				description: "Final value of the button's resistance range in units."
			}
		},

		notify: {
			detected: "Button \"{id}\" pressed",
			notDefined: "Pressed button is not defined!"
		}
	},

	onboardButtons: {
		title: "On-board buttons",
		buttons: {
			holdClock: "hold CLOCK",
			holdInfo: "hold SET/INFO",
			holdClockShort: "hold CLOCK",
			holdInfoShort: "hold INFO",
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
		title: "Testing",
		description:
			"Enter text (Latin characters and numbers only), select style and alignment, specify display time and click \"Show\"",
		text: {
			title: "Text",
			description: "Text displayed on the information screen"
		},
		btnShow: "Show"
	},

	options: {
		title: "Options",
		lcd: {
			title: "On-board screen",
			enabled: {
				title: "On-board screen",
				description: "Enable/disable information output on the on-board information screen"
			},
			logo: {
				title: "Logo",
				description: "Text displayed when there is no data to output to the on-board screen. Maximum 12 characters."
			},
			hello: {
				title: "Greeting text",
				description: "Text displayed when ACC is turned on. Maximum 32 characters.",
				menu: "BC: Greeting text"
			}
		},
		head: {
			title: "Head unit",
			titleShort: "HU",
			protocol: {
				title: "UART Protocol",
				description: "UART protocol for communication between PJCAN and the head unit",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)",
					5: "Hiworld MZF1.2 (GB) 1N4MZF10B"
				}
			},
			reverseUart: {
				title: "Swap UART contacts",
				description: "Swap UART contacts if there is no communication between PJCAN and the head unit"
			},
			onboardShow: {
				title: "Show head unit information",
				titleShort: "Show HU info",
				description: "Show head unit text on the on-board screen instead of the logo",
				menu: "LCD: Show head unit text"
			},
			sendButton: {
				title: "Steering wheel buttons",
				description: "Support for head unit control with steering wheel buttons"
			},
			sendClimate: {
				title: "Show climate on head unit",
				description: "Show climate panel on the head unit (if the protocol supports this functionality)"
			},
			sendDoors: {
				title: "Show door status on head unit",
				titleShort: "Show doors on HU",
				description: "Show car door status on the head unit (if the protocol supports this functionality)"
			},
			sendOnboard: {
				title: "Show on-board data on head unit",
				description: "Show door status and on-board computer values on the head unit (if the protocol supports this functionality)"
			},
			holdToFlip: {
				title: "Volume level control",
				titleShort: "Volume control",
				description: "Smooth volume level change when holding Vol+/Vol- buttons (recommended if the head unit does not support this function)."
			}
		},
		datetime: {
			title: "Date and time",
			description:
				"To display the date and time on the on-board screen, you need to launch the web application every time you turn on the ignition to synchronize data with the PJCAN adapter.",
			menu: "LCD: Display options",
			date: {
				title: "Show date",
				description: "Display the current date on the on-board screen"
			},
			time: {
				title: "Show time",
				description: "Display the current time on the on-board screen"
			},
			dayWeek: {
				title: "Show day of the week",
				description: "Display the current day of the week on the on-board screen"
			},
			dateAndDayWeek: {
				title: "Show date and day of the week",
				titleShort: "Show date and day",
				description: "Display the current date and day of the week on the on-board screen"
			},
			timeAndDayWeek: {
				title: "Show time and day of the week",
				titleShort: "Show time and day",
				description: "Display the current time and day of the week on the on-board screen"
			},
			fullDatetime: {
				title: "Show full date and time",
				titleShort: "Show full date and time",
				description: "Display the current date and time in full format on the on-board screen"
			}
		},
		onboard: {
			title: "On-board computer",
			titleShort: "BC",
			description:
				"List of cards displayed on the \"On-board computer\" screen. The order is changed by dragging the blocks. You can also enable/disable the display on the page.",
			reset: {
				menu: "Arrange by default"
			}
		}
	},

	scanner: {
		dialog: {
			title: "CAN bus scanning",
			text: "Start CAN bus scanning?\n" + "The scan data will be automatically sent to PJ82."
		},
		btn: {
			start: "Start",
			next: "Next",
			finish: "Finish"
		},
		step: {
			0: {
				title: "Scanning engine values",
				text: "Start the car engine and press the \"Next\" button"
			},
			1: {
				title: "Scanning door values",
				text:
					"1. Open the driver's door and close it;\n" +
					"2. Open the rear left door and close it;\n" +
					"3. Open the trunk and close it;\n" +
					"4. Open the rear right door and close it;\n" +
					"5. Open the front right door and close it.\n" +
					"\n" +
					"Return to the cabin and press the \"Next\" button"
			},
			2: {
				title: "Scanning signal values",
				text:
					"1. Fasten the driver's seat belt;\n" +
					"2. Fasten the front passenger's seat belt;\n" +
					"3. Fasten the rear passengers' seat belts;\n" +
					"4. Turn on the left turn signal, then the right, then turn it off;\n" +
					"5. Turn on the emergency stop signal, then turn it off.\n" +
					"\n" +
					"Press the \"Next\" button"
			},
			3: {
				title: "Scanning climate values",
				text:
					"1. Turn on/off AUTO;\n" +
					"2. Turn on/off AC;\n" +
					"3. Change the airflow direction;\n" +
					"4. Change the airflow speed.\n" +
					"\n" +
					"Press the \"Next\" button"
			},
			4: {
				title: "Scanning movement values",
				text:
					"1. Release the handbrake;\n" +
					"2. Engage reverse gear and back up a little;\n" +
					"3. Engage drive mode in an automatic transmission or shift gears in a manual transmission and start moving forward.\n" +
					"\n" +
					"After the car has stopped, turn off the engine and press the \"Finish\" button"
			}
		},
		notify: {
			errorStart: "Scanning not started.\n" + "Check the connection to the PJCAN device.",
			errorSend: "Error sending scan data packet.",
			warningSend: "No scan data to send."
		},
		upload: {
			title: "Uploading to server",
			text: "Uploading scanned values to the server.",
			leftToLoad:
				"No packages to upload | {n} package left to upload | {n} packages left to upload | {n} packages left to upload"
		}
	},

	choosingCarModel: {
		title: "Choosing a car model",
		label: "Car model",
		description: "Ability to change the car model supported by the PJCAN adapter.",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (testing)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5"
		}
	},

	help: {
		onboard: {
			notify: "Swipe left/right to scroll through the information blocks"
		}
	},
	language: {
		title: "Language selection",
		label: "Interface language",
		description: "Choose the interface language that suits you"
	}
};
