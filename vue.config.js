const { defineConfig } = require("@vue/cli-service");
const path = require("path");

const resolve = (dir) => path.join(__dirname, dir);

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: process.env.VUE_APP_MODE === "test" ? "/pjcan-test/" : "/pjcan-app/",
	outputDir: process.env.VUE_APP_MODE === "test" ? "../pjcan-test/docs" : "./dist",
	productionSourceMap: false,

	configureWebpack: {
		optimization: {
			splitChunks: false,
			minimize: false
		}
	},

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

		config.when(
			process.env.NODE_ENV !== "development",
			config =>
			{
				config.plugin("ScriptExtHtmlWebpackPlugin").after("html").use("script-ext-html-webpack-plugin", [
					{
						inline: /runtime\..*\.js$/
					}
				]).end();
				config.optimization.splitChunks({
					chunks: "all",
					cacheGroups: {
						libs: {
							name: "chunk-libs",
							test: /[\\/]node_modules[\\/]/,
							priority: 10,
							chunks: "initial"
						},
						vuetify: {
							name: "chunk-vuetify",
							priority: 20,
							test: /[\\/]node_modules[\\/]vuetify(.*)/
						},
						commons: {
							name: "chunk-commons",
							test: resolve("src/components"),
							minChunks: 3,
							priority: 5,
							reuseExistingChunk: true
						}
					}
				});
				config.optimization.runtimeChunk("single");
			}
		);
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
	},

	pwa: {
		name: "PJCAN",
		themeColor: "#0b677b",
		msTileColor: "#25323e",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "#0b677b",
		icons: [
			{ "src": "./img/icons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
			{ "src": "./img/icons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" },
			{ "src": "./img/icons/android-chrome-maskable-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
			{ "src": "./img/icons/android-chrome-maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
		],

		// настройки манифеста
		manifestOptions: {
			background_color: "#121517"
		},
		workboxOptions: {
			navigateFallback: "index.html"
		}
	}
});
