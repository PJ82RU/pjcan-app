import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { t } from "@/lang";

import Onboard from "@/views/onboard/index.vue";
import Buttons from "@/views/buttons/index.vue";
import Options from "@/views/options/index.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Onboard",
		component: Onboard,
		meta: {
			title: "onboard.title"
		}
	},
	{
		path: "/buttons",
		name: "Buttons",
		component: Buttons,
		meta: {
			title: "buttons.title"
		}
	},
	{
		path: "/options",
		name: "Options",
		component: Options,
		meta: {
			title: "options.title"
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) =>
{
	const title = to.meta?.title as string;
	document.title = "PJCAN: " + (title?.length > 0 ? t(title) : "");
	next();
});

export default router;
