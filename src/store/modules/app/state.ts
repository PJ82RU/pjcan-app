import onboardCardListDefault from "./onboard-card-list-default";
import buttonsDefault from "./buttons-default";
import { IMazdaConfig } from "@/models/pjcan/mazda";

const state = {
	messages: [],
	visibleMessage: false,
	mazda: null as IMazdaConfig | null,
	onboardCardList: onboardCardListDefault,
	sw1: buttonsDefault
};

export default state;
