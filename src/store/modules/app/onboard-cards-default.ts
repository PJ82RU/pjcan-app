import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { TCarModel } from "@/models/pjcan/onboard";

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
			TCarModel.CAR_MODEL_MAZDA_CX9_REST,
			TCarModel.CAR_MODEL_MAZDA_5
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
			TCarModel.CAR_MODEL_MAZDA_5
		]
	},
	{
		name: "fuel",
		enabled: true,
		car: [
			TCarModel.CAR_MODEL_MAZDA_3_BK,
			TCarModel.CAR_MODEL_MAZDA_3_BL,
			TCarModel.CAR_MODEL_MAZDA_CX7,
			TCarModel.CAR_MODEL_MAZDA_CX7_REST,
			TCarModel.CAR_MODEL_MAZDA_CX9,
			TCarModel.CAR_MODEL_MAZDA_CX9_REST,
			TCarModel.CAR_MODEL_MAZDA_5
		]
	},
	{
		name: "movement",
		enabled: true,
		car: [
			TCarModel.CAR_MODEL_MAZDA_3_BK,
			TCarModel.CAR_MODEL_MAZDA_3_BL,
			TCarModel.CAR_MODEL_MAZDA_CX7,
			TCarModel.CAR_MODEL_MAZDA_CX7_REST,
			TCarModel.CAR_MODEL_MAZDA_CX9,
			TCarModel.CAR_MODEL_MAZDA_CX9_REST,
			TCarModel.CAR_MODEL_MAZDA_5
		]
	},
	{ name: "doors", enabled: true, car: [TCarModel.CAR_MODEL_MAZDA_3_BK, TCarModel.CAR_MODEL_MAZDA_3_BL] },
	{
		name: "climate",
		enabled: true,
		car: [
			TCarModel.CAR_MODEL_MAZDA_3_BK,
			TCarModel.CAR_MODEL_MAZDA_3_BL,
			TCarModel.CAR_MODEL_MAZDA_6_GG,
			TCarModel.CAR_MODEL_MAZDA_CX7,
			TCarModel.CAR_MODEL_MAZDA_CX7_REST,
			TCarModel.CAR_MODEL_MAZDA_5
		]
	}
] as IOnboardCard[];
