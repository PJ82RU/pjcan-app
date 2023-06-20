import { IOnboardCard } from "@/models/interfaces/IOnboardCard";

const state = {
	messages: [],
	visibleMessage: false,
	onboardCardList: [
		{ name: "info", enabled: true, car: [0, 1, 2] },
		{ name: "bose", enabled: false, car: [2] },
		{ name: "engine", enabled: true, car: [0, 1, 2] },
		{ name: "fuel", enabled: true, car: [0, 1, 2] },
		{ name: "movement", enabled: true, car: [0, 1, 2] },
		{ name: "doors", enabled: true, car: [0, 1] },
		{ name: "climate", enabled: true, car: [0, 1, 2] }
	] as IOnboardCard[]
};

export default state;
