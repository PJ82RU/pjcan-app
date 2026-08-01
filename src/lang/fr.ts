export default {
	BLE: {
		title: "Bluetooth",
		btn: {
			connect: "Connecter",
			disconnect: "Déconnecter"
		},
		dialog: {
			noConnected: "Vous n'êtes connecté à aucun appareil Bluetooth.",
			connected: "Vous êtes connecté à un appareil Bluetooth PJCAN."
		},
		notify: {
			noConnected: "Pas de connexion à l'appareil Bluetooth.",
			connected: "PJCAN connecté",
			disconnected: "PJCAN déconnecté",
			lostConnected: "Connexion perdue avec l'appareil Bluetooth PJCAN. Tentative de reconnexion...",
			noData: "Pas de données à envoyer"
		},
		server: {
			deviceSelected: "Appareil bluetooth {n} sélectionné.",
			deviceDisconnected: "L'appareil Bluetooth {n} est déconnecté.",
			GATTConnect: "Connexion au serveur GATT...",
			getService: "Serveur GATT connecté, lecture du service...",
			getCharacteristic: "Service reçu, lecture de la caractéristique...",
			characteristicDone: "Caractéristique reçue.",
			startNotifications: "Lancement des notifications...",
			notificationsDone: "Notifications lancées.",
			reconnect: "Nouvel essai dans {n} secondes... ({c} tentatives restantes)",
			reconnectRestored: "La connexion à l'appareil Bluetooth PJCAN a été rétablie.",
			connectionLost: "La communication avec l'appareil Bluetooth PJCAN a été perdue.",
			receive: "Recevoir les données: ID {n}",
			send: "Envoi des données: ID {n}",
			versionProtocol: "Version du protocole: {mj}.{mn}.{bl}.{rv}"
		}
	},

	update: {
		title: "Mettre à jour PJCAN",
		warning: "Attention!",
		btn: {
			update: "Mettre à jour",
			rollback: "Restaurer",
			later: "Plus tard"
		},
		dialog: {
			updateTo: "Mettre à jour le firmware de PJCAN vers la version {version}?",
			rollbackTo: "Restaurer le firmware de PJCAN vers la version {version}?",
			browserOutdated: "La version de votre navigateur est obsolète.\n" + "Mettez-la à jour et ouvrez à nouveau l'application web."
		},
		process: {
			preparation: "Préparation au téléversement...",
			upload: "Téléversement du firmware",
			update: "Mise à jour du firmware...",
			timeLeft: "Temps restant"
		},
		notify: {
			newVersion: "Mise à jour {version} disponible",
			completed: "Mise à jour du firmware terminée avec succès",
			warning: "La mise à jour du firmware a échoué. Éteignez et rallumez l'appareil, puis essayez de mettre à jour à nouveau.",
			error: "Erreur de mise à jour du firmware",
			errorDownload: "Erreur de téléchargement du firmware depuis le serveur. Il se peut qu'il n'y ait pas de connexion internet.",
			errorUpload: "Erreur de téléversement du firmware sur l'appareil PJCAN. Il se peut qu'il n'y ait pas de connexion Bluetooth.",
			errorWaitUpdate:
				"Le périphérique PJCAN a expiré. Éteignez et rallumez le périphérique, puis essayez de mettre à jour à nouveau."
		}
	},

	error: {
		title: "Qu'est-ce que tu regardes,\nécris à PJ82",
		version: "Erreur lors de la demande de la version de l'appareil. Reconnectez l'appareil PJCAN."
	},

	rules: {
		required: "Champ obligatoire",
		counter: "Maximum {n} caractères | Maximum {n} caractère | Maximum {n} caractères | Maximum {n} caractères",
		english: "Seuls les caractères latins et les chiffres sont autorisés."
	},

	menu: {
		onboard: "Ordinateur de bord",
		onboardButtons: "Boutons de bord",
		test: "Test",
		language: "Sélection de la langue",
		settings: {
			buttonsSW1: "Boutons du volant",
			buttonsSW3: "Boutons SW3",
			options: "Options"
		},
		update: "Mettre à jour vers {version}",
		rollback: "Restaurer vers {version}",
		install: "Installer",
		about: "À propos"
	},

	activation: {
		success: "Appareil activé avec succès! Redémarrage...",
		error: "Appareil non activé. Contactez le développeur."
	},

	about: {
		title: "À propos",
		version: "Version de l'application web",
		versionFirmware: "Version du firmware PJCAN",
		carSupport: "Support voiture",
		author: "Auteur",
		sha: "Hash de l'appareil"
	},

	deviceInfo: {
		title: "Informations techniques",
		cpuFreqMHz: "Fréquence du CPU, MHz",
		efuseMac: "Adresse MAC",
		freeSketchSpace: "Espace libre pour le firmware",
		sdkVersion: "Version du SDK",
		sketchMD5: "MD5 du firmware",
		sketchSize: "Taille du firmware",
		temperatureChip: "Température de la puce",
		sha: "SHA",
		hardware: "Version de la carte"
	},

	deviceReset: {
		title: "Réinitialiser la configuration de l'appareil",
		config: "Réinitialiser la configuration générale aux paramètres d'usine",
		configShort: "Configuration générale",
		view: "Réinitialiser les paramètres d'affichage aux valeurs par défaut",
		viewShort: "Configuration de l'affichage",
		buttons: "Réinitialiser les paramètres des boutons aux valeurs par défaut",
		buttonsShort: "Configuration des boutons"
	},

	btn: {
		apply: "Appliquer",
		cancel: "Annuler",
		close: "Fermer",
		deviceInfo: "À propos de l'appareil",
		deviceReset: "Réinitialiser la configuration",
		reset: "Réinitialiser",
		ok: "OK"
	},

	onboard: {
		title: "Ordinateur de bord",

		viewSetting: {
			enabled: {
				title: "Afficher les informations",
				titleShort: "Afficher",
				description: "État de l'affichage des informations sur l'écran d'information"
			},
			type: {
				title: "Style d'affichage des informations",
				description: "Afficher du texte statique, clignotant ou défilant",
				items: ["Texte brut", "Texte clignotant", "Texte défilant"]
			},
			time: {
				title: "Temps d'affichage, sec.",
				description: "Afficher sur l'écran d'information pendant le nombre de secondes spécifié"
			},
			delay: {
				title: "Temps de pause de l'affichage, sec.",
				description: "Mettre en pause l'affichage des informations pendant le nombre de secondes spécifié"
			}
		},

		info: {
			title: "Informations",
			acc: {
				title: "ACC",
				description: "Alimentation de la voiture"
			},
			worktime: {
				title: "Temps de travail",
				description: "Temps de fonctionnement de l'appareil depuis la mise sous tension",
				menu: "LCD: Temps de travail"
			},
			voltmeter: {
				title: "Tension",
				description: "Tension du réseau de bord en volts (valeur moyenne sur 10 secondes)",
				menu: "LCD: Tension"
			},
			temperatureIn: {
				title: "Température intérieure",
				description: "Relevés de la température intérieure de la voiture",
				menu: "LCD: Température de l'air"
			},
			temperatureOut: {
				title: "Température extérieure",
				description: "Relevés de la température extérieure de la voiture",
				menu: "LCD: Température de l'air"
			},
			signals: {
				title: "Signaux"
			},
			handbrake: {
				title: "Frein à main",
				description: "Position du frein à main",
				menu: "LCD: Frein à main"
			},
			reverse: {
				title: "Marche arrière",
				description: "Levier de vitesse en position R",
				menu: "LCD: Marche arrière"
			},
			light: {
				title: "Rétroéclairage",
				description: "Contact du rétroéclairage"
			},
			amp: {
				title: "AMP Cont",
				description: "Contact de mise sous tension de Bose"
			},
			safetyBelt: {
				title: "Ceinture de sécurité",
				description: "Ceinture de sécurité du conducteur et du passager",
				menu: "LCD: Ceinture de sécurité"
			},
			signal: {
				title: "Clignotant",
				description: "Clignotant et signal d'arrêt d'urgence",
				menu: "LCD: Clignotant"
			},
			device: {
				title: "Paramètres de l'appareil",
				menu: "Paramètres de l'appareil",
				disableLedWork: {
					title: "Contact LED_WORK",
					description: "Contrôle du contact LED_WORK"
				},
				disableReverse: {
					title: "Contact REVERSE",
					description: "Contrôle du contact REVERSE"
				},
				disableRPosition: {
					title: "Contact R_POSITION",
					description: "Contrôle du contact R_POSITION"
				},
				disableAmpIllum: {
					title: "Contact AMP_ILLUM",
					description: "Contrôle du contact AMP_ILLUM"
				},
				disableVoltmeter: {
					title: "Voltmètre",
					description: "Activer/désactiver le voltmètre"
				},
				calibrationOfVoltmeter: {
					title: "Calibrage du voltmètre",
					titleShort: "Calibrage",
					description: "Un nombre positif diminue la valeur du voltmètre, un nombre négatif l'augmente"
				}
			}
		},

		engine: {
			title: "Moteur",

			enabled: {
				title: "Fonctionnement du moteur",
				description: "État actuel du moteur",
				menu: "LCD: Fonctionnement du moteur"
			},
			RPM: {
				title: "RPM du moteur",
				description: "Nombre actuel de tours complets du vilebrequin du moteur par minute",
				menu: "LCD: RPM du moteur"
			},
			countRPM: {
				title: "Compteur de RPM",
				titleShort: "Compteur de RPM",
				description: "Nombre total de tours complets du vilebrequin du moteur en milliers",
				menu: "LCD: Compteur de RPM"
			},
			load: {
				title: "Charge du moteur",
				description: "Pourcentage de charge du moteur",
				menu: "LCD: Charge du moteur"
			},
			worktime: {
				title: "Heures moteur",
				description: "Temps de fonctionnement total du moteur",
				menu: "LCD: Heures moteur"
			},
			throttle: {
				title: "Position de l'accélérateur",
				description: "Position relative de l'accélérateur",
				menu: "LCD: Position de l'accélérateur"
			},
			coolant: {
				title: "Température du liquide de refroidissement",
				description: "Température du liquide de refroidissement",
				menu: "LCD: Température du liquide de refroidissement"
			},
			oilLifePercent: {
				title: "Durée de vie de l'huile, %",
				titleShort: "Durée de vie, %",
				description: "Durée de vie restante de l'huile en pourcentage",
				menu: "LCD: Durée de vie de l'huile, %"
			},
			oilLifeDistance: {
				title: "Kilométrage avant vidange, km",
				titleShort: "Kilométrage, km",
				description: "Kilométrage restant avant la vidange d'huile en kilomètres",
				menu: "LCD: Kilométrage avant vidange, km"
			},
			statistics: {
				title: "Statistiques"
			},
			settings: {
				title: "Paramètres des statistiques du moteur",
				menu: "Statistiques du moteur",
				showDays: {
					title: "Afficher les jours dans les statistiques",
					titleShort: "Afficher les jours",
					description: "Afficher les heures moteur sur l'écran d'information au format j.hh:mm:ss"
				},
				worktime: {
					title: "Temps de fonctionnement, min.",
					description: "Temps de fonctionnement total du moteur"
				},
				countRPM: {
					title: "Compteur de RPM, milliers",
					description: "Nombre total de tours complets du vilebrequin du moteur en milliers"
				}
			},
			oilSettings: {
				title: "Paramètres des statistiques d'huile",
				menu: "Statistiques d'huile",
				oilDurationHours: {
					title: "Temps de fonctionnement avec l'huile, h.",
					titleShort: "Temps de fonct., h.",
					description: "Temps de fonctionnement total du moteur avec l'huile actuelle"
				},
				oilDistanceKm: {
					title: "Kilométrage avec l'huile, km",
					titleShort: "Kilométrage, km",
					description: "Kilométrage total de la voiture avec l'huile actuelle"
				},
				oilHoursLimit: {
					title: "Limite de vidange d'huile, h.",
					titleShort: "Limite d'huile, h.",
					description: "Limite d'heures moteur pour la vidange d'huile"
				},
				oilHoursLimitItems: [
					"ILSAC / Japon (220 h) — pour Mazda (Défaut)",
					"ACEA / Europe (250 h) — huiles robustes",
					"PAO / Premium (300 h) — synthétiques PAO",
					"Minérale (180 h) — huiles simples",
					"Limite personnalisée..."
				],
				oilHoursLimitCustom: {
					title: "Limite personnalisée, h.",
					description: "Entrez votre limite de vidange d'huile personnalisée (de 150 à 350 heures)"
				}
			}
		},

		fuel: {
			title: "Carburant",

			current: {
				title: "Consommation de carburant",
				description: "Valeur de l'ordinateur de bord, l/100 km",
				menu: "LCD: Consommation de carburant"
			},
			avg: {
				title: "Consommation moyenne",
				description: "Valeur de l'ordinateur de bord, l/100 km",
				menu: "LCD: Consommation moyenne"
			},
			settings: {
				title: "Paramètres de consommation",
				menu: "Paramètres de consommation",
				ratio: {
					title: "Coefficient de consommation de carburant",
					description: "Pour ajuster la consommation de GPL ou d'autres types de carburant"
				}
			}
		},

		movement: {
			title: "Tachymètre",

			speed: {
				title: "Vitesse de la voiture",
				description: "Valeur de l'ordinateur de bord, km/h",
				menu: "LCD: Vitesse de la voiture"
			},
			speedAVG: {
				title: "Vitesse moyenne",
				description: "Valeur de l'ordinateur de bord, km/h",
				menu: "LCD: Vitesse moyenne"
			},
			restWay: {
				title: "Distance restante, km",
				description: "Valeur de l'ordinateur de bord en km",
				menu: "LCD: Distance restante"
			}
		},

		doors: {
			title: "Portes",
			menu: "LCD: Portes",

			doorFL: {
				title: "Avant gauche",
				description: "État actuel de la porte avant gauche"
			},
			doorFR: {
				title: "Avant droite",
				description: "État actuel de la porte avant droite"
			},
			doorBL: {
				title: "Arrière gauche",
				description: "État actuel de la porte arrière gauche"
			},
			doorBR: {
				title: "Arrière droite",
				description: "État actuel de la porte arrière droite"
			},
			trunk: {
				title: "Coffre",
				description: "État actuel du coffre"
			},

			settings: {
				title: "Configuration des portes",
				frontReverse: {
					title: "Inverser les portes avant",
					titleShort: "Portes avant",
					description: "Inverser les portes avant"
				},
				backReverse: {
					title: "Inverser les portes arrière",
					titleShort: "Portes arrière",
					description: "Inverser les portes arrière"
				},
				frontBackReverse: {
					title: "Inverser les portes avant et arrière",
					titleShort: "Avant et arrière",
					description: "Inverser les portes avant et arrière"
				}
			}
		},

		volume: {
			title: "Son",
			menu: "LCD: Son",

			mute: {
				title: "Couper le son",
				description: "Couper temporairement le son sans modifier le niveau actuel"
			},
			level: {
				title: "Niveau sonore",
				description: "Valeur actuelle du niveau sonore"
			}
		},

		climate: {
			title: "Climatisation",
			menu: "LCD: Climatisation",

			enabled: {
				title: "État de fonctionnement",
				description: "État de fonctionnement de l'unité de climatisation"
			},
			autoMode: {
				title: "Auto",
				description: "Mode automatique de l'unité de climatisation"
			},
			ac: {
				title: "AC",
				description: "Fonctionnement de la climatisation"
			},
			temperature: {
				title: "Température",
				description: "Valeur de température définie de l'unité de climatisation"
			},
			air: {
				title: "Ventilation de la cabine",
				description: "Circulation de l'air à l'intérieur de la cabine"
			},
			blow: {
				title: "Flux d'air",
				description: "Direction du flux d'air"
			}
		},

		bose: {
			title: "Bose",
			menu: "LCD: Bose",

			enabled: {
				title: "Activer Bose",
				description: "Activer/désactiver l'amplificateur de son Bose"
			},
			audioPLT: {
				title: "Audio PLT",
				description:
					"C'est un système d'annulation du bruit qui ajuste en continu le son pour compenser le bruit de fond et la vitesse du véhicule"
			},
			radioFM: {
				title: "Radio FM",
				description: "Activer/désactiver la radio FM"
			},
			wow: {
				title: "Wow",
				description: "Bip lors du changement de paramètre"
			},
			balance: {
				title: "Balance",
				description: "Décaler la balance sonore vers la droite ou la gauche"
			},
			bass: {
				title: "Basses",
				description: "Amélioration des basses fréquences"
			},
			fade: {
				title: "Fade",
				description: "Décaler la balance sonore vers l'avant ou l'arrière"
			},
			treble: {
				title: "Aigus",
				description: "Amélioration des hautes fréquences"
			},
			centerPoint: {
				title: "CenterPoint",
				description:
					"La technologie CenterPoint convertit les signaux stéréo en audio multicanal et crée simultanément une scène sonore plus large et plus immersive"
			},

			volumeConfig: {
				title: "Paramètres de démarrage",
				start: {
					title: "Modifier le niveau sonore",
					description: "Régler le niveau sonore spécifié ci-dessous lorsque l'adaptateur PJCAN est allumé"
				},
				level: {
					title: "Niveau sonore",
					description: "Le niveau sonore réglé lorsque l'adaptateur PJCAN est allumé"
				}
			}
		}
	},

	buttons: {
		title: "Paramètres des boutons",
		extendedMode: "Mode étendu",
		hintMode: " (mode étendu)",

		mode: "Bouton MODE",
		setUp: "Bouton SET UP",
		setDown: "Bouton SET DOWN",
		volUp: "Bouton VOL +",
		volDown: "Bouton VOL -",
		volMute: "Bouton VOL MUTE",

		extended: {
			title: "Mode étendu",
			description: "Prise en charge de l'appui double, triple et prolongé d'un bouton"
		},
		resistance: {
			title: "Résistance du bouton",
			description: "Intervalle de résistance du bouton",
			cur: {
				title: "Résistance actuelle",
				description: "Valeur de résistance du bouton enfoncé. Ne peut pas être modifiée"
			},
			min: {
				title: "Résistance minimale",
				description:
					"Spécifiez la valeur minimale du bouton, mais ne laissez pas les valeurs se chevaucher avec d'autres boutons"
			},
			max: {
				title: "Résistance maximale",
				description:
					"Spécifiez la valeur maximale du bouton, mais ne laissez pas les valeurs se chevaucher avec d'autres boutons"
			}
		},
		pressSingle: {
			title: "Bouton appuyé une fois",
			description: "La fonction qui est exécutée lorsque le bouton est appuyé"
		},
		pressDual: {
			title: "Bouton appuyé deux fois",
			description: "La fonction qui est exécutée lorsque le bouton est appuyé deux fois"
		},
		pressTriple: {
			title: "Bouton appuyé 3 fois",
			description: "La fonction qui est exécutée lorsque le bouton est appuyé 3 fois"
		},
		pressHold: {
			title: "Maintien du bouton",
			description: "La fonction qui est exécutée lorsque le bouton est maintenu enfoncé pendant 3 secondes ou plus.",
			time: {
				title: "Temps de maintien du bouton",
				description: "Temps de maintien du bouton, sec."
			}
		},

		functions: {
			0: "Pas de fonction",
			1: "PJCAN: changer le mode de contrôle",
			2: "PJCAN: afficher les valeurs du moteur",
			3: "PJCAN: afficher les valeurs de consommation",
			4: "PJCAN: afficher les valeurs de mouvement",
			5: "PJCAN: afficher les valeurs de température",
			6: "PJCAN: afficher la date et l'heure",
			7: "HU: Bouton MUTE sur le volant",
			8: "HU: Bouton MODE sur le volant",
			9: "HU: Bouton SET DOWN sur le volant",
			10: "HU: Bouton SET UP sur le volant",
			11: "HU: Bouton Vol+ sur le volant",
			12: "HU: Bouton Vol- sur le volant",
			13: "HU: ouvrir la commande vocale",
			14: "HU: ouvrir l'égaliseur",
			15: "HU: ouvrir la radio",
			16: "HU: rechercher une onde radio",
			17: "HU: ouvrir la caméra",
			18: "HU: ouvrir le téléphone",
			42: "HU: Pause/Lecture",
			19: "BC: Bouton INFO (informations BC)",
			20: "BC: Bouton CLOCK (heure sur BC)",
			21: "BC: Bouton CLOCK H (heures)",
			22: "BC: Bouton CLOCK M (minutes)",
			23: "BC: Bouton CLOCK 24/12 (changement de format de l'heure)",
			24: "BC: remettre les minutes à 0",
			25: "BC: changer le mode INFO/CLOCK",
			26: "BC: maintenir INFO (réinitialiser la consommation)",
			27: "BC: maintenir CLOCK (réglage de l'horloge)",
			28: "BOSE: activer/désactiver l'amplificateur",
			29: "BOSE: activer/désactiver Audio PLT",
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
			41: "BOSE: changer les modes CenterPoint (cycliquement)"
		},

		edit: {
			title: "Modification du bouton \"{name}\"",
			beginValue: {
				title: "Valeur initiale",
				titleShort: "Début",
				description: "Valeur initiale de la plage de résistance du bouton en unités."
			},
			endValue: {
				title: "Valeur finale",
				titleShort: "Fin",
				description: "Valeur finale de la plage de résistance du bouton en unités."
			}
		},

		notify: {
			detected: "Bouton \"{id}\" appuyé",
			notDefined: "Le bouton appuyé n'est pas défini!"
		}
	},

	onboardButtons: {
		title: "Boutons de bord",
		buttons: {
			holdClock: "maintenir CLOCK",
			holdInfo: "maintenir SET/INFO",
			holdClockShort: "maint. CLOCK",
			holdInfoShort: "maint. INFO",
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
		title: "Test",
		description:
			"Entrez du texte (caractères latins et chiffres uniquement), sélectionnez le style et l'alignement, spécifiez le temps d'affichage et cliquez sur \"Afficher\"",
		text: {
			title: "Texte",
			description: "Texte affiché sur l'écran d'information"
		},
		btnShow: "Afficher"
	},

	options: {
		title: "Options",
		lcd: {
			title: "Écran de bord",
			enabled: {
				title: "Écran de bord",
				description: "Activer/désactiver l'affichage des informations sur l'écran d'information de bord"
			},
			logo: {
				title: "Logo",
				description: "Texte affiché lorsqu'il n'y a pas de données à afficher sur l'écran de bord. Maximum 12 caractères."
			},
			hello: {
				title: "Texte d'accueil",
				description: "Texte affiché lorsque l'ACC est activé. Maximum 32 caractères.",
				menu: "BC: Texte d'accueil"
			}
		},
		head: {
			title: "Unité principale",
			titleShort: "HU",
			protocol: {
				title: "Protocole UART",
				description: "Protocole UART pour la communication entre PJCAN et l'unité principale",
				list: {
					1: "Raise HM_ND00 2017.12.11 (19200)",
					2: "Raise HM_ND01 2019.06.21 (38400)",
					3: "Raise HM_ND03 2022.11.11 (19200)",
					4: "SimpleSoft RP5_MZ_002 (38400)",
					5: "Hiworld MZF1.2 (GB) 1N4MZF10B"
				}
			},
			reverseUart: {
				title: "Inverser les contacts UART",
				description: "Inverser les contacts UART s'il n'y a pas de communication entre PJCAN et l'unité principale"
			},
			onboardShow: {
				title: "Afficher les informations de l'unité principale",
				titleShort: "Afficher info HU",
				description: "Afficher le texte de l'unité principale sur l'écran de bord à la place du logo",
				menu: "LCD: Afficher le texte de l'unité principale"
			},
			sendButton: {
				title: "Boutons du volant",
				description: "Prise en charge de la commande de l'unité principale avec les boutons du volant"
			},
			sendClimate: {
				title: "Afficher la climatisation sur l'unité principale",
				description: "Afficher le panneau de climatisation sur l'unité principale (si le protocole prend en charge cette fonctionnalité)"
			},
			sendDoors: {
				title: "Afficher l'état des portes sur l'unité principale",
				titleShort: "Afficher portes sur HU",
				description: "Afficher l'état des portes de la voiture sur l'unité principale (si le protocole prend en charge cette fonctionnalité)"
			},
			sendOnboard: {
				title: "Afficher les données de bord sur l'unité principale",
				description: "Afficher l'état des portes et les valeurs de l'ordinateur de bord sur l'unité principale (si le protocole prend en charge cette fonctionnalité)"
			},
			holdToFlip: {
				title: "Contrôle du niveau de volume",
				titleShort: "Contrôle du volume",
				description: "Changement progressif du niveau sonore en maintenant les boutons Vol+/Vol- (recommandé si l'unité principale ne prend pas en charge cette fonction)."
			}
		},
		datetime: {
			title: "Date et heure",
			description:
				"Pour afficher la date et l'heure sur l'écran de bord, vous devez lancer l'application web à chaque fois que vous mettez le contact pour synchroniser les données avec l'adaptateur PJCAN.",
			menu: "LCD: Options d'affichage",
			date: {
				title: "Afficher la date",
				description: "Afficher la date actuelle sur l'écran de bord"
			},
			time: {
				title: "Afficher l'heure",
				description: "Afficher l'heure actuelle sur l'écran de bord"
			},
			dayWeek: {
				title: "Afficher le jour de la semaine",
				description: "Afficher le jour de la semaine actuel sur l'écran de bord"
			},
			dateAndDayWeek: {
				title: "Afficher la date et le jour de la semaine",
				titleShort: "Afficher date et jour",
				description: "Afficher la date et le jour de la semaine actuels sur l'écran de bord"
			},
			timeAndDayWeek: {
				title: "Afficher l'heure et le jour de la semaine",
				titleShort: "Afficher heure et jour",
				description: "Afficher l'heure et le jour de la semaine actuels sur l'écran de bord"
			},
			fullDatetime: {
				title: "Afficher la date et l'heure complètes",
				titleShort: "Afficher date et heure complètes",
				description: "Afficher la date et l'heure actuelles en format complet sur l'écran de bord"
			}
		},
		onboard: {
			title: "Ordinateur de bord",
			titleShort: "BC",
			description:
				"Liste des cartes affichées sur l'écran \"Ordinateur de bord\". L'ordre est modifié en faisant glisser les blocs. Vous pouvez également activer/désactiver l'affichage sur la page.",
			reset: {
				menu: "Organiser par défaut"
			}
		}
	},

	scanner: {
		dialog: {
			title: "Analyse du bus CAN",
			text: "Démarrer l'analyse du bus CAN?\n" + "Les données de l'analyse seront automatiquement envoyées à PJ82."
		},
		btn: {
			start: "Démarrer",
			next: "Suivant",
			finish: "Terminer"
		},
		step: {
			0: {
				title: "Analyse des valeurs du moteur",
				text: "Démarrez le moteur de la voiture et appuyez sur le bouton \"Suivant\""
			},
			1: {
				title: "Analyse des valeurs des portes",
				text:
					"1. Ouvrez la porte du conducteur et fermez-la;\n" +
					"2. Ouvrez la porte arrière gauche et fermez-la;\n" +
					"3. Ouvrez le coffre et fermez-le;\n" +
					"4. Ouvrez la porte arrière droite et fermez-la;\n" +
					"5. Ouvrez la porte avant droite et fermez-la.\n" +
					"\n" +
					"Retournez dans l'habitacle et appuyez sur le bouton \"Suivant\""
			},
			2: {
				title: "Analyse des valeurs des signaux",
				text:
					"1. Attachez la ceinture de sécurité du conducteur;\n" +
					"2. Attachez la ceinture de sécurité du passager avant;\n" +
					"3. Attachez les ceintures de sécurité des passagers arrière;\n" +
					"4. Allumez le clignotant gauche, puis le droit, puis éteignez-le;\n" +
					"5. Allumez le signal d'arrêt d'urgence, puis éteignez-le.\n" +
					"\n" +
					"Appuyez sur le bouton \"Suivant\""
			},
			3: {
				title: "Analyse des valeurs de la climatisation",
				text:
					"1. Allumez/éteignez AUTO;\n" +
					"2. Allumez/éteignez AC;\n" +
					"3. Changez la direction du flux d'air;\n" +
					"4. Changez la vitesse du flux d'air.\n" +
					"\n" +
					"Appuyez sur le bouton \"Suivant\""
			},
			4: {
				title: "Analyse des valeurs de mouvement",
				text:
					"1. Desserrez le frein à main;\n" +
					"2. Passez la marche arrière et reculez un peu;\n" +
					"3. Passez en mode conduite dans une transmission automatique ou changez de vitesse dans une transmission manuelle et commencez à avancer.\n" +
					"\n" +
					"Une fois que la voiture s'est arrêtée, coupez le moteur et appuyez sur le bouton \"Terminer\""
			}
		},
		notify: {
			errorStart: "Analyse non démarrée.\n" + "Vérifiez la connexion à l'appareil PJCAN.",
			errorSend: "Erreur lors de l'envoi du paquet de données d'analyse.",
			warningSend: "Pas de données d'analyse à envoyer."
		},
		upload: {
			title: "Téléversement sur le serveur",
			text: "Téléversement des valeurs analysées sur le serveur.",
			leftToLoad:
				"Pas de paquets à téléverser | {n} paquet restant à téléverser | {n} paquets restants à téléverser | {n} paquets restants à téléverser"
		}
	},

	choosingCarModel: {
		title: "Choix d'un modèle de voiture",
		label: "Modèle de voiture",
		description: "Possibilité de changer le modèle de voiture pris en charge par l'adaptateur PJCAN.",
		carModels: {
			0: "Mazda",
			1: "Mazda 3 BK",
			2: "Mazda 3 BL",
			3: "Mazda 6 GG",
			4: "Mazda 6 GH (en test)",
			5: "Mazda CX-7",
			6: "Mazda CX-7 rest",
			7: "Mazda CX-9 (gen1)",
			8: "Mazda CX-9 (gen1) rest",
			9: "Mazda 5"
		}
	},

	help: {
		onboard: {
			notify: "Balayez vers la gauche/droite pour faire défiler les blocs d'informations"
		}
	},
	language: {
		title: "Sélection de la langue",
		label: "Langue de l'interface",
		description: "Choisissez la langue de l'interface qui vous convient"
	}
};
