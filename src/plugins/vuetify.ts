// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "../styles/vuetify.scss";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";

const customDarkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		background: "#121517",
		surface: "#21262a",
		primary: "#0b677b",
		secondary: "#25323e",
		accent: "#9c27b0",
		error: "#B00020",
		info: "#31ccec",
		success: "#4caf50",
		warning: "#f2c037",
		menu: "#3f6e90"
	}
};
export default createVuetify({
	theme: {
		defaultTheme: "customDarkTheme",
		themes: {
			customDarkTheme
		}
	}
});
