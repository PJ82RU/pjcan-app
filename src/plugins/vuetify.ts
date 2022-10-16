// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "../styles/vuetify.scss";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
	theme: {
		themes: {
			light: {
				colors: {
					primary: "#0b677b",
					secondary: "#25323e",
					accent: "#9c27b0",
					info: "#31ccec",
					warning: "#f2c037"
				}
			}
		}
	}
});
