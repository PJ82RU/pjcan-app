import { createStore } from "vuex";
import app from "./modules/app";
import canbus from "./modules/canbus";

const store = createStore({
	modules: {
		app,
		canbus
	},
	strict: process.env.NODE_ENV === "development"
});

export default store;
