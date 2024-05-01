import { createStore } from "vuex";
import app from "./modules/app";
import config from "./modules/config";
import value from "./modules/value";
import view from "./modules/view";

const store = createStore({
	modules: {
		app,
		config,
		value,
		view
	},
	strict: process.env.NODE_ENV === "development"
});

export default store;
