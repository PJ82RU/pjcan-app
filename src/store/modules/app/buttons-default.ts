import { t } from "@/lang";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

export default [
	{
		id: 1,
		title: t("buttons.mode"),
		icon: "mdi-menu"
	},
	{
		id: 2,
		title: t("buttons.setUp"),
		icon: "mdi-play"
	},
	{
		id: 3,
		title: t("buttons.setDown"),
		icon: "mdi-play"
	},
	{
		id: 4,
		title: t("buttons.volUp"),
		icon: "mdi-volume-plus"
	},
	{
		id: 5,
		title: t("buttons.volDown"),
		icon: "mdi-volume-minus"
	},
	{
		id: 6,
		title: t("buttons.volMute"),
		icon: "mdi-volume-mute"
	}
] as IButtonCard[];
