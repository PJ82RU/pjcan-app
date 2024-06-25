import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { TCarModel } from "@/models/pjcan/mazda";

export default [
	{
		name: "info",
		enabled: true,
		car: [
			TCarModel.CAR_MODEL_MAZDA_3_BK,
			TCarModel.CAR_MODEL_MAZDA_3_BL,
			TCarModel.CAR_MODEL_MAZDA_6_GG,
			TCarModel.CAR_MODEL_MAZDA_6_GH,
			TCarModel.CAR_MODEL_MAZDA_CX7,
			TCarModel.CAR_MODEL_MAZDA_CX7_REST,
			TCarModel.CAR_MODEL_MAZDA_CX9,
			TCarModel.CAR_MODEL_MAZDA_CX9_REST
		]
	},
	{
		name: "bose",
		enabled: true,
		car: [TCarModel.CAR_MODEL_MAZDA_CX7, TCarModel.CAR_MODEL_MAZDA_CX7_REST, TCarModel.CAR_MODEL_MAZDA_CX9]
	},
	{
		name: "engine",
		enabled: true,
		car: [
			TCarModel.CAR_MODEL_MAZDA_3_BK,
			TCarModel.CAR_MODEL_MAZDA_3_BL,
			TCarModel.CAR_MODEL_MAZDA_CX7,
			TCarModel.CAR_MODEL_MAZDA_CX7_REST,
			TCarModel.CAR_MODEL_MAZDA_CX9,
			TCarModel.CAR_MODEL_MAZDA_CX9_REST
		]
	},
	{ name: "fuel", enabled: true, car: [
		TCarModel.CAR_MODEL_MAZDA_3_BK,
		TCarModel.CAR_MODEL_MAZDA_3_BL,
		TCarModel.CAR_MODEL_MAZDA_CX7,
		TCarModel.CAR_MODEL_MAZDA_CX7_REST,
		TCarModel.CAR_MODEL_MAZDA_CX9,
		TCarModel.CAR_MODEL_MAZDA_CX9_REST
	] },
	{ name: "movement", enabled: true, car: [
		TCarModel.CAR_MODEL_MAZDA_3_BK,
		TCarModel.CAR_MODEL_MAZDA_3_BL,
		TCarModel.CAR_MODEL_MAZDA_CX7,
		TCarModel.CAR_MODEL_MAZDA_CX7_REST,
		TCarModel.CAR_MODEL_MAZDA_CX9,
		TCarModel.CAR_MODEL_MAZDA_CX9_REST
	] },
	{ name: "doors", enabled: true, car: [TCarModel.CAR_MODEL_MAZDA_3_BK] },
	{ name: "climate", enabled: true, car: [
		TCarModel.CAR_MODEL_MAZDA_3_BK,
		TCarModel.CAR_MODEL_MAZDA_3_BL,
		TCarModel.CAR_MODEL_MAZDA_6_GG,
		TCarModel.CAR_MODEL_MAZDA_CX7,
		TCarModel.CAR_MODEL_MAZDA_CX7_REST,
		TCarModel.CAR_MODEL_MAZDA_CX9,
		TCarModel.CAR_MODEL_MAZDA_CX9_REST
	] }
] as IOnboardCard[];
