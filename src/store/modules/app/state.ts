import onboardCardListDefault from "./onboard-card-list-default";
import listButtonsDefault from "./list-buttons-default";
import { IMazdaConfig } from "@/models/pjcan/mazda";

const state = {
	messages: [],
	visibleMessage: false,
	mazda: null as IMazdaConfig | null,
	onboardCardList: onboardCardListDefault,
	listButtonsSW1: listButtonsDefault
};

export default state;
