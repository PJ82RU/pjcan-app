import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { $t } from "@/lang";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Onboard",
		component: () => import("@/views/onboard/Loader.vue"),
		meta: {
			title: $t("onboard.title")
		}
	},
	{
		path: "/buttons",
		name: "Buttons",
		component: () => import("@/views/buttons/Loader.vue"),
		meta: {
			title: $t("buttons.title")
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
