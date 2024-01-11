import onboardCardListDefault from "./onboard-card-list-default";
import { TCarModel } from "@/models/pjcan/mazda";

const state = {
	messages: [],
	visibleMessage: false,
	onboardCardList: onboardCardListDefault,
	carModel: TCarModel.CAR_MODEL_UNKNOWN
};

export default state;
