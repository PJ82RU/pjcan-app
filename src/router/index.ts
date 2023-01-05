import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { t } from "@/lang";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Onboard",
		component: () => import("@/views/onboard/Loader.vue"),
		meta: {
			title: "onboard.title"
		}
	},
	{
		path: "/buttons",
		name: "Buttons",
		component: () => import("@/views/buttons/Loader.vue"),
		meta: {
			title: "buttons.title"
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
	document.title = "PJ CAN: " + (title?.length > 0 ? t(title) : "");
	next();
});

export default router;
