import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "@/lang";

// шрифты
import "./styles/fonts/jura.scss";
import "./styles/fonts/roboto.scss";

// уведомления Vue3Toasity
import Vue3Toasity, { toast } from "vue3-toastify";
import "./styles/vue3-toasity.scss";
const Vue3ToasityOptions = {
	autoClose: 3000,
	theme: toast.THEME.COLORED,
	hideProgressBar: true,
	position: toast.POSITION.BOTTOM_RIGHT,
	pauseOnHover: true,
	newestOnTop: true
};

createApp(App)
	.use(router)
	.use(store)
	.use(vuetify)
	.use(i18n)
	.use(Vue3Toasity, Vue3ToasityOptions)
	.mount("#app");
