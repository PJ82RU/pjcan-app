import onboardCardsDefault from "./onboard-cards-default";
import sw1Default from "./sw1-default";
import { IOnboardConfig } from "@/models/pjcan/onboard";

const state = {
	language: "ru",

	messages: [],
	messageVisible: false,
	notify: false,

	onboard: null as IOnboardConfig | null,
	onboardCards: onboardCardsDefault,

	sw1: sw1Default
};

export default state;
