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
			later: "Later"
		},
		dialog: {
			updateTo: "Update PJCAN firmware to version {version} ?",
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
			completed: "Firmware completed successfully",
			warning: "The firmware was not completed successfully. Turn your device off and on and try updating again",
			error: "Firmware update error",
			errorDownload: "Error downloading firmware from the server. You may not be connected to the Internet",
			errorUpload: "Error uploading firmware to PJCAN device. Possibly no Bluetooth connection",
			errorWaitUpdate: "The PJCAN device timed out. Turn your device off and on and try updating again"
		}
	},

	error: {
		title: "What are you watching,\nwrite PJ82"
	},

	rules: {
		required: "Required",
		counter: "Max {n} characters | Max {n} character | Max {n} characters | Max {n} characters",
		english: "Invalid English"
	},

	menu: {
		onboard: "On-board",
		onboardButtons: "On-board computer buttons",
		test: "Testing",
		language: {
			russian: "Русский язык",
			english: "Английский язык"
		},
		settings: {
			buttons: "Steering wheel button settings",
			options: "Options"
		},
		update: "Upgrade to {version}",
		about: "About"
	},

	activation: {
		success: "Device successfully activated! The device is rebooting...",
		error: "The device is not activated. Contact the developer."
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
		cpuFreqMHz: "CPU freq MHz",
		efuseMac: "Efuse MAC",
		freeSketchSpace: "Free sketch space",
		sdkVersion: "SDK version",
		sketchMD5: "Sketch MD5",
		sketchSize: "Sketch size",
		temperatureChip: "Temperature chip",
		sha: "SHA"
	},

	deviceReset: {
		title: "Reset device configuration",
		config: "Reset configuration defaults",
		view: "Reset default display configuration values"
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
		title: "On-board",

		viewSetting: {
			enabled: {
				title: "Display information",
				description: "Status display information on the information screen"
			},
			type: {
				title: "Information display style",
				description: "Display static text, blinking or in a ticker style",
				items: ["Plain text", "Flashing text", "Ticker"]
			},
			time: {
				title: "Display time, sec.",
				description: "Show the specified number of seconds on the information screen"
			},
			delay: {
				title: "Display pause time, sec.",
				description: "Pause the information display for the specified number of seconds"
			}
		},

		info: {
			title: "Information",
			acc: {
				title: "ACC",
				description: "Car power"
			},
			worktime: {
				title: "Worktime",
				description: "Operating time of the device from the moment of switching on",
				menu: "LCD: Worktime"
			},
			temperature: {
				title: "Air temperature",
				description: "Reading the outside temperature of the car",
				menu: "LCD: Air temperature"
			},
			handbrake: {
				title: "Hand brake",
				description: "Handbrake position",
				menu: "LCD: Hand brake"
			},
			reverse: {
				title: "Reverse",
				description: "Gear knob in R",
				menu: "LCD: Reverse"
			},
			safetyBelt: {
				title: "Safety belt",
				description: "Seat belt driver and passenger",
				menu: "LCD: Safety belt"
			},
			signal: {
				title: "Turn signal",
				description: "Turn signal and emergency stop",
				menu: "LCD: Turn signal"
			}
		},

		engine: {
			title: "Engine",

			enabled: {
				title: "Engine operation",
				description: "The current state of the internal combustion engine",
				menu: "LCD: Engine operation"
			},
			RPM: {
				title: "Engine RPM",
				description: "Current number of complete engine revolutions per minute",
				menu: "LCD: Engine RPM"
			},
			countRPM: {
				title: "RPM counter, thous.",
				description: "The total number of complete revolutions of the engine crankshaft in thousands",
				menu: "LCD: RPM counter"
			},
			load: {
				title: "Engine load",
				description: "The load of something on something, I don’t know how it is calculated",
				menu: "LCD: Engine load"
			},
			worktime: {
				title: "Hours",
				description: "Total engine running time",
				menu: "LCD: Hours"
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
			settings: {
				title: "Settings of engine statistics",
				menu: "Statistics settings",
				showDays: {
					title: "Show days in statistics",
					description: "Display the mothers on the information screen in d.hh:mm:ss"
				},
				worktime: {
					title: "Opening time, min.",
					description: "Total engine operating time"
				},
				countRPM: {
					title: "RPM counter, thous.",
					description: "The total number of full speed of the crankshaft of the engine in thousands"
				}
			}
		},

		fuel: {
			title: "Fuel",

			current: {
				title: "Fuel consumption",
				description: "The value of the on-board, l/100 km",
				menu: "LCD: Fuel consumption"
			},
			avg: {
				title: "Average consumption",
				description: "The value of the on-board, l/100 km",
				menu: "LCD: Average consumption"
			},
			settings: {
				title: "Fuel consumption settings",
				menu: "Consumption settings",
				ratio: {
					title: "Fuel consumption coefficient",
					description: "To configure the gas flow rate or other type of fuel"
				}
			}
		},

		movement: {
			title: "Speedometer",

			speed: {
				title: "Car speed",
				description: "On-board value, km/h",
				menu: "LCD: Car speed"
			},
			speedAVG: {
				title: "Average speed",
				description: "On-board value, km/h",
				menu: "LCD: Average speed"
			},
			restWay: {
				title: "The rest of the way, km",
				description: "On-board value, km",
				menu: "LCD: Rest of the way"
			}
		},

		doors: {
			title: "Doors",
			menu: "LCD: Doors",

			doorFL: {
				title: "Front left",
				description: "Current state of front left door"
			},
			doorFR: {
				title: "Front right",
				description: "Current state of front right door"
			},
			doorBL: {
				title: "Rear left",
				description: "The current state of the rear left door"
			},
			doorBR: {
				title: "Rear right",
				description: "The current state of the rear right door"
			},
			trunk: {
				title: "Trunk",
				description: "The current state of the trunk"
			}
		},

		volume: {
			title: "Volume",
			menu: "LCD: Volume",

			mute: {
				title: "Turn on volume",
				description: "Temporarily turn on/off the sound without changing the current level"
			},
			level: {
				title: "Volume level",
				description: "Current sound level value"
			}
		},

		climate: {
			title: "Climate control",
			menu: "LCD: Climate control",

			enabled: {
				title: "Work status",
				description: "Operation status of the climate control unit"
			},
			autoMode: {
				title: "Auto",
				description: "Automatic mode of operation of the climate unit"
			},
			ac: {
				title: "AC",
				description: "Air conditioner operation"
			},
			temperature: {
				title: "Temperature",
				description: "Climate unit temperature setpoint"
			},
			air: {
				title: "Cabin ventilation",
				description: "Air circulation inside the cabin"
			},
			blow: {
				title: "Air flow",
				description: "Airflow direction"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Enabling Bose",
				description: "Turning on/off the Bose sound amplifier"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"It is a noise suppression system that continuously adjusts the sound to compensate for background noise and vehicle speed"
			},
			radioFM: {
				title: "Radio FM",
				description: "Turning on/off the FM radio"
			},
			wow: {
				title: "Wow",
				description: "Sound signal when changing parameters"
			},
			balance: {
				title: "Balance",
				description: "Shifting the sound balance to the right or left"
			},
			bass: {
				title: "Bass",
				description: "Amplification of low frequencies"
			},
			fade: {
				title: "Fade",
				description: "Shifting the sound balance forward or backward"
			},
			treble: {
				title: "Treble",
				description: "Amplification of high frequencies"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"CenterPoint technology converts stereo signals into multi-channel audio and simultaneously creates a wider/surround sound area"
			}
		}
	},

	buttons: {
		title: "Button settings",

		mode: "MODE button",
		seekUp: "SEEK UP button",
		seekDown: "SEEK DOWN button",
		volUp: "VOL UP button",
		volDown: "VOL DOWN button",
		volMute: "VOL MUTE button",

		resistance: {
			title: "Button resistance",
			description: "The resistance of the button in units is allowed an error of ± 300 units."
		},
		pressSingle: {
			title: "Button pressed 1 time",
			description: "The function that is executed when the button is pressed"
		},
		pressDual: {
			title: "Button pressed 2 times",
			description: "Function that is executed when the button is pressed 2 times"
		},
		pressTriple: {
			title: "Button pressed 3 times",
			description: "Function that is executed when the button is pressed 3 times"
		},
		pressHold: {
			title: "Button hold",
			description: "A function that is performed when the button is pressed and held for 3 or more seconds."
		},
		release: {
			title: "Button released",
			description: "Function that is executed when the button is released"
		},
		delayExec: {
			title: "Delayed button pressing",
			description:
				"Allows you to perform only one function.\n" +
				"For example: If it is turned off, then when the button is pressed 3 times, the functions for 1, 2 and 3 clicks are performed sequentially. If enabled, then when the button is pressed 3 times, only one function of 3 clicks will be performed."
		},

		functions: {
			0: "No action",
			1: "Teyes MODE button",
			2: "Teyes SEEK UP button",
			3: "Teyes SEEK DOWN button",
			4: "Teyes VOL UP button",
			5: "Teyes VOL DOWN button",
			6: "Teyes VOL MUTE button",
			7: "Clock button on LCD",
			8: "Clock H button on LCD",
			9: "Clock M button on LCD",
			10: "Info button on LCD",
			11: "Show engine values",
			12: "Show consumption values",
			13: "Show motion values",
			14: "Show temperature values",
			15: "Clock 12/24 button on LCD",
			16: "Voice control",
			17: "Radio",
			18: "Camera",
			19: "Radio: search",
			20: "Equalizer",
			21: "On/off display",
			22: "Phone"
		},

		definition: {
			title: "Button press detected",
			type: {
				title: "Button type",
				description: "Select the button type for further use"
			}
		}
	},

	onboardButtons: {
		title: "On-board buttons",
		buttons: {
			modeClock: "Mode CLOCK",
			modeInfo: "Mode INFO",
			clock: "CLOCK",
			info: "INFO",
			clockH: "H",
			clockM: "M",
			clockRM: "RM",
			clock24: "24/12"
		}
	},

	test: {
		title: "Testing",
		description:
			'Enter the text (only Latin symbols and numbers), select style and leveling, indicate the display time and click "Show"',
		text: {
			title: "Text",
			description: "The text displayed on the information screen"
		},
		btnShow: "Show"
	},

	options: {
		title: "Options",
		lcd: {
			title: "LCD",
			enabled: {
				title: "LCD",
				description: "Turn on/off the output of the information on the information screen"
			},
			logo: {
				title: "Logo",
				description:
					"The test displayed at the time of the absence of data for output to LCD. Maximum 12 characters",
				menu: "LCD: Logo"
			},
			hello: {
				title: "Hello",
				description: "Displayed test when switched by ACC. Maximum 32 characters",
				menu: "LCD: Hello"
			}
		},
		teyes: {
			title: "Teyes",
			protocol: {
				title: "UART Protocol",
				description: "UART protocol for PJCAN communication with Teyes",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "SimpleSoft MZ_SS_07A (38400)",
					4: "SimpleSoft RP5_MZ_002 (38400)"
				}
			},
			reverseUart: {
				title: "Change UART contacts",
				description: "Enable if there is no PJCAN connection with multimedia"
			},
			lcdShow: {
				title: "Show the text Teyes",
				description: "Show the text of the Teyes on the information screen instead of the logo",
				menu: "LCD: Show the text Teyes"
			},
			sendButton: {
				title: "Steering wheel buttons",
				description: "Control of Teyes by buttons on the steering wheel"
			},
			sendClimate: {
				title: "Show climate on Teyes",
				description: "Show climate control values on Teyes (if the protocol supports this functionality)"
			},
			sendDoors: {
				title: "Show the status of doors on Teyes",
				description: "Show the status of the car doors on Teyes (if the protocol supports this functionality)"
			},
			parseVolume: {
				title: "Control the sound level on Teyes",
				description:
					"It is recommended to turn off this parameter to directly control the sound of the Bose amplifier"
			},
			receiveText: {
				title: "Accept Teyes information",
				description: "Accept incoming Teyes values: name of radio stations, etc."
			},
			receiveClock: {
				title: "Teyes time",
				description: "Accept incoming time value from Teyes (if the protocol supports this functionality)"
			},
			receiveButtons: {
				title: "Teyes Buttons",
				description: "Support for Teyes buttons: CLOCK, HOUR, MIN (if the protocol supports this functionality)"
			}
		},
		onboard: {
			title: "On-board",
			description:
				"A list of cards displayed on the On-Board Computer screen. The order is changed by dragging the block up/down. You can also enable/disable the display on the page",
			reset: {
				menu: "Arrange by default"
			}
		}
	},

	scanner: {
		dialog: {
			title: "Scanning canbus",
			text: "Start scanning can-shines?\n" + "Scanning values will be automatically sent PJ82."
		},
		btn: {
			start: "Begin",
			next: "Next",
			finish: "Finish"
		},
		step: {
			0: {
				title: "Scanning of engine values",
				text: 'Run the car engine and press the "Next" button'
			},
			1: {
				title: "Scanning doors",
				text:
					"1. Open the driver's door and close it;\n" +
					"2. Open the passenger door behind the driver and close it;\n" +
					"3. Open the trunk and close it;\n" +
					"4. Open the passenger door behind on the right and close it;\n" +
					"5. Open the passenger door in front on the right and close it.\n" +
					"\n" +
					'Return to the salon and click the "Next" button'
			},
			2: {
				title: "Scanning of signal values",
				text:
					"1. Fasten the driver safety belt;\n" +
					"2. Fasten the front passenger safety belt;\n" +
					"3. Fasten the seat belts of the rear passengers;\n" +
					"4. Turn on the left turn signal, then the right, turn off;\n" +
					"5. Turn on the emergency stop signal, turn it off.\n" +
					"\n" +
					'Click "Next"'
			},
			3: {
				title: "Scanning of climate values",
				text:
					"1. Turn on/off Auto;\n" +
					"2. Turn on/off the AC;\n" +
					"3. Change the direction of the air flow;\n" +
					"4. Change the speed of the air flow.\n" +
					"\n" +
					'Click "Next"'
			},
			4: {
				title: "Scanning of movement values",
				text:
					"1. Remove the car from the hand brake;\n" +
					"2. Turn on the rear gear and hand back a little;\n" +
					"3. Turn on the automatic transmission mode or switch the PMPP transmission and start moving forward.\n" +
					"\n" +
					'After completing the movement of the car, drown out the engine and press the "finish" button'
			}
		},
		notify: {
			errorStart: "Scanning is not running.\n" + "Check the connection to the PJCAN device.",
			errorSend: "Error sending scan data packet.",
			warningSend: "There is no scan data to send."
		},
		upload: {
			title: "Uploading to the server",
			text: "Uploading scanned values to the server.",
			leftToLoad:
				"No packages to download | Left to download {n} package | Left to download {n} package | There are {n} packages left to download"
		}
	},

	choosingCarModel: {
		title: "Choosing a car model",
		label: "Car model",
		description: "The ability to change the car model supported by the PJCAN adapter",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL (not supported)",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (not supported)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9",
			8: "Mazda CX-9 rest"
		}
	}
};
