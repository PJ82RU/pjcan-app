import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "@/lang";

// шрифты
import "./styles/fonts/jura.scss";

createApp(App)
	.use(router)
	.use(store)
	.use(vuetify)
	.use(i18n)
	.mount("#app");
