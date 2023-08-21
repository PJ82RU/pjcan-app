import { IOnboardCard } from "@/models/interfaces/IOnboardCard";

export default [
	{ name: "info", enabled: true, car: [1, 2, 3] },
	{ name: "bose", enabled: true, car: [2, 3] },
	{ name: "engine", enabled: true, car: [1, 2, 3] },
	{ name: "fuel", enabled: true, car: [1, 2, 3] },
	{ name: "movement", enabled: true, car: [1, 2, 3] },
	{ name: "doors", enabled: true, car: [1] },
	{ name: "climate", enabled: true, car: [1, 2] }
] as IOnboardCard[];
