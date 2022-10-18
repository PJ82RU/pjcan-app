import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import i18n from "@/lang";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Onboard",
		component: () => import("@/views/onboard/index.vue"),
		meta: {
			title: i18n.global.t("onboard.title")
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) =>
{
	const title = "PJ CAN: %s".replace("%s", (to.meta?.title ?? "") as string);
	store.commit("app/setTitle", title);
	document.title = title;

	next();
});

export default router;
