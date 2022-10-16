import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Onboard",
		component: () => import("@/views/onboard/index.vue"),
		meta: {
			title: "PJ CAN",
			subtitle: "Onboard"
		}

	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) =>
{
	document.title = "PJCAN: %s".replace("%s", (to.meta?.subtitle ?? "") as string);
	next();
});

export default router;
