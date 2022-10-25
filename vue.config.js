const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,

	chainWebpack: (config) =>
	{
		// set environment variables
		config.plugin("define").tap((definitions) =>
		{
			Object.assign(definitions[0], {
				// get rid of vue-i18 warning
				__VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
				__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
				__VUE_I18N_LEGACY_API__: JSON.stringify(false)
			});

			return definitions;
		});
	},

	pluginOptions: {
		vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
	},

	css: {
		loaderOptions: {
			// sass: {
			// 	additionalData: `@import "@/styles/variables.sass";`
			// },
			scss: {
				additionalData: `@import "@/styles/variables.scss";`
			}
		}
	}
});
