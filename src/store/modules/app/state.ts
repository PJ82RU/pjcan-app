import onboardCardListDefault from "./onboard-card-list-default";
import listButtonsDefault from "./list-buttons-default";
import { TCarModel } from "@/models/pjcan/mazda";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

const state = {
	messages: [],
	visibleMessage: false,
	onboardCardList: onboardCardListDefault,
	carModel: TCarModel.CAR_MODEL_UNKNOWN,
	listButtonsSW1: listButtonsDefault,
	listButtonsSW3: [] as IButtonCard[]
};

export default state;
