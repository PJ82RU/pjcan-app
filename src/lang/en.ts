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
			updateTo: "Update PJCAN firmware to version {version} ?",
			rollbackTo: "Rollback PJCAN firmware to version {version} ?",
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
		title: "What are you watching,\nwrite PJ82",
		version: "Error requesting the device version. Reconnect the PJCAN device"
	},

	rules: {
		required: "Required",
		counter: "Max {n} characters | Max {n} character | Max {n} characters | Max {n} characters",
		english: "Invalid English"
	},

	menu: {
		onboard: "On-board",
		onboardButtons: "On-board buttons",
		test: "Testing",
		language: "Language",
		settings: {
			buttonsSW1: "Steering wheel buttons",
			buttonsSW3: "SW3 buttons",
			options: "Options"
		},
		update: "Upgrade to {version}",
		rollback: "Rollback to {version}",
		install: "Install",
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
		sha: "SHA",
		hardware: "Board version"
	},

	deviceReset: {
		title: "Reset device configuration",
		config: "Reset the general default configuration",
		configShort: "The general configuration",
		view: "Reset the default display configuration",
		viewShort: "Display configuration",
		buttons: "Reset the default button configuration",
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
		title: "On-board",

		viewSetting: {
			enabled: {
				title: "Display information",
				titleShort: "Display information",
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
			voltmeter: {
				title: "Voltage",
				description: "On-board mains voltage in volts (the average value for 10 sec.)",
				menu: "LCD: Voltage"
			},
			temperatureIn: {
				title: "Air temperature",
				description: "Temperature readings in the car interior",
				menu: "LCD: Air temperature"
			},
			temperatureOut: {
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
			light: {
				title: "Backlight",
				description: "Backlight pin"
			},
			amp: {
				title: "AMP Cont",
				description: "Bose power on pin"
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
			},
			device: {
				title: "Device parameters",
				menu: "Device parameters",
				disableLedWork: {
					title: "Pin LED_WORK",
					description: "Control the LED_WORK pin"
				},
				disableReverse: {
					title: "Pin REVERSE",
					description: "Control the REVERSE pin"
				},
				disableRPosition: {
					title: "Pin R_POSITION",
					description: "Control the R_POSITION pin"
				},
				disableAmpIllum: {
					title: "Pin AMP_ILLUM",
					description: "Control the AMP_ILLUM pin"
				},
				disableVoltmeter: {
					title: "Voltmeter",
					description: "Turn on/off the voltmeter"
				},
				calibrationOfVoltmeter: {
					title: "Calibration of the voltmeter",
					titleShort: "Calibration",
					description: "A positive number decreases the value of the voltmeter, a negative number increases"
				}
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
					titleShort: "Show days in statistics",
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
			},

			settings: {
				title: "Door configuration",
				frontReverse: {
					title: "Change the front doors",
					titleShort: "Change the front doors",
					description: "Swap the front doors"
				},
				backReverse: {
					title: "Change the rear doors",
					titleShort: "Change the rear doors",
					description: "Swap the rear doors"
				},
				frontBackReverse: {
					title: "Swap the front with the rear doors",
					titleShort: "The front with the rear",
					description: "Swap the left and right doors"
				}
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
			},

			volumeConfig: {
				title: "Setting up the startup",
				start: {
					title: "Change the sound level",
					description: "Set the sound level specified below when turning on the PJCAN adapter"
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
		seekUp: "SET UP button",
		seekDown: "SET DOWN button",
		volUp: "VOL + button",
		volDown: "VOL - button",
		volMute: "VOL MUTE button",

		extended: {
			title: "Extended mode",
			description: "Support for double, triple button pressing and holding"
		},
		resistance: {
			title: "Button resistance",
			description: "The resistance interval of the button in units",
			cur: {
				title: "Current resistance",
				description: "The value of the resistance of the pressed button. You can't change it"
			},
			min: {
				title: "Minimum resistance",
				description:
					"Specify the minimum value of the button, but do not allow the values to overlap with other buttons"
			},
			max: {
				title: "Maximum resistance",
				description:
					"Specify the maximum value of the button, but do not allow the values to overlap with other buttons"
			}
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
			description: "A function that is performed when the button is pressed and held for 3 or more seconds.",
			time: {
				title: "Button holding time",
				description: "Button holding time, sec."
			}
		},

		functions: {
			0: "Function is missing",
			1: "PJCAN: change the control mode",
			2: "PJCAN: show engine values",
			3: "PJCAN: show fuel consumption values",
			4: "PJCAN: show vehicle movement values",
			5: "PJCAN: show temperature values",
			6: "PJCAN: show date and time",
			7: "Head Unit: MUTE button on the steering wheel",
			8: "Head Unit: MODE button on the steering wheel",
			9: "Head Unit: SET DOWN button on the steering wheel",
			10: "Head Unit: SET UP button on the steering wheel",
			11: "Head Unit: Vol+ button on the steering wheel",
			12: "Head Unit: Vol- button on the steering wheel",
			13: "Head Unit: open voice control",
			14: "Head Unit: open the equalizer",
			15: "Head Unit: open the radio",
			16: "Head Unit: search for a radio wave",
			17: "Head Unit: open the camera",
			18: "Head Unit: open the phone",
			19: "On-board: INFO button (on-board information)",
			20: "On-board: CLOCK button (time on the on-board)",
			21: "On-board: CLOCK H button (hour)",
			22: "On-board: CLOCK M button (minutes)",
			23: "On-board: CLOCK 24/12 button (time format change)",
			24: "On-board: Reset button for minutes to 0",
			25: "On-board: change the INFO mode to CLOCK and back",
			26: "On-board: pressing and holding the INFO button (flow reset)",
			27: "On-board: pressing and holding the CLOCK button (setting the clock)",
			28: "BOSE: on/off the amplifier",
			29: "BOSE: on/off Audio PLT",
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
			41: "BOSE: switching Center Point modes (cyclically)"
		},

		edit: {
			title: "Editing a button \"{name}\"",
			beginValue: {
				title: "Begin value",
				titleShort: "Begin value",
				description: "The initial value of the resistance range of the button in units."
			},
			endValue: {
				title: "Final value",
				titleShort: "Final value",
				description: "The final value of the resistance range of the button in units."
			}
		},

		notify: {
			detected: "Button \"{id}\" is pressed",
			notDefined: "The button is not defined!"
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
			title: "On-board screen",
			enabled: {
				title: "On-board screen",
				description: "Turn on/off the output of the information on the information screen"
			},
			logo: {
				title: "Logo",
				description:
					"The test displayed at the time of the absence of data for output to On-board screen. Maximum 12 characters"
			},
			hello: {
				title: "Hello",
				description: "Displayed test when switched by ACC. Maximum 32 characters",
				menu: "On-board: Hello"
			}
		},
		head: {
			title: "Head Unit",
			titleShort: "Head Unit",
			protocol: {
				title: "UART Protocol",
				description: "UART protocol for PJCAN communication with Head Unit",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)"
				}
			},
			reverseUart: {
				title: "Change UART contacts",
				description: "Enable if there is no PJCAN connection with multimedia"
			},
			onboardShow: {
				title: "Show the text Head Unit",
				titleShort: "Show the text Head Unit",
				description: "Show the text of the Head Unit on the On-board screen of the logo",
				menu: "LCD: Show the text Head Unit"
			},
			sendButton: {
				title: "Steering wheel buttons",
				description: "Control of Head Unit by buttons on the steering wheel"
			},
			sendClimate: {
				title: "Show climate on Head Unit",
				description: "Show climate control values on Head Unit (if the protocol supports this functionality)"
			},
			sendDoors: {
				title: "Show the status of doors on Head Unit",
				titleShort: "Show the doors on Head Unit",
				description: "Show the status of the car doors on Head Unit (if the protocol supports this functionality)"
			},
			sendOnboard: {
				title: "Show on-board data on the Head Unit",
				description: "Show the status of the doors and the values of the vehicle's on-board computer on the Head Unit (if the protocol supports this functionality)"
			},
			holdToFlip: {
				title: "Volume control",
				titleShort: "Volume control",
				description: "Smooth change of sound level when holding the Vol+/Vol- button (recommended if the Head Unit does not support this functionality)"
			}
		},
		datetime: {
			title: "Date and time",
			description:
				"To display the date and time on the LCD screen, it is necessary to launch a web application to synchronize data with the PJCAN adapter every time the car ignition is turned on.",
			menu: "LCD: Display options",
			date: {
				title: "Show date",
				description: "Display the current date on the LCD screen"
			},
			time: {
				title: "Show time",
				description: "Display the current time on the LCD screen"
			},
			dayWeek: {
				title: "Show day of week",
				description: "Display the current day of the week on the LCD screen"
			},
			dateAndDayWeek: {
				title: "Show date and day of week",
				titleShort: "Show date and day of week",
				description: "Display the current date and day of the week on the LCD screen"
			},
			timeAndDayWeek: {
				title: "Show time and day of week",
				titleShort: "Show time and day of week",
				description: "Display the current time and day of the week on the LCD screen"
			},
			fullDatetime: {
				title: "Show full date and time",
				titleShort: "Show full date and time",
				description: "Display the current date and time on the LCD screen in full format"
			}
		},
		onboard: {
			title: "On-board",
			titleShort: "On-board",
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
			2: "Mazda 3 BL (tested)",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (tested)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5 (tested)"
		}
	},

	help: {
		buttons: {
			notify: "Warning! In this section of the menu, the steering wheel buttons operate in programming mode"
		},
		onboard: {
			notify: "Swipe left/right allows you to scroll through the blocks with information",
			noModelSelected: "Warning! The car model is not selected. Go to the menu - About the program - Car support"
		}
	},
	language: {
		title: "Language",
		label: "Interface language",
		description: "Choose the interface language that suits you"
	}
};
