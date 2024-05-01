import { createStore } from "vuex";
import app from "./modules/app";
import config from "./modules/config";
import value from "./modules/value";

const store = createStore({
	modules: {
		app,
		config,
		value
	},
	strict: process.env.NODE_ENV === "development"
});

export default store;
