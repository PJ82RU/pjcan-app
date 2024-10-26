import { t } from "@/lang";
import { ISW1Card } from "@/models/interfaces/ISW1Card";

export default [
	{
		id: 2,
		title: t("buttons.mode"),
		icon: "mdi-menu"
	},
	{
		id: 5,
		title: t("buttons.volUp"),
		icon: "mdi-volume-plus"
	},
	{
		id: 6,
		title: t("buttons.volDown"),
		icon: "mdi-volume-minus"
	},
	{
		id: 1,
		title: t("buttons.volMute"),
		icon: "mdi-volume-mute"
	},
	{
		id: 4,
		title: t("buttons.setUp"),
		icon: "mdi-play"
	},
	{
		id: 3,
		title: t("buttons.setDown"),
		icon: "mdi-play"
	}
] as ISW1Card[];
