import { createStore } from "vuex";
import app from "./modules/app";

const store = createStore({
	modules: {
		app
	},
	strict: process.env.NODE_ENV === "development"
});

export default store;
