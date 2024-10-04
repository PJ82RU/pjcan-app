const { defineConfig } = require("@vue/cli-service");
const path = require("path");

const resolve = (dir) => path.join(__dirname, dir);

let pathApp, outApp;
switch (process.env.VUE_APP_MODE)
{
	case "test":
		pathApp = "/pjcan-test/";
		outApp = "../pjcan-test/docs";
		break;
	case "pjcan41":
		pathApp = "/pjcan41-app/";
		outApp = "../pjcan41-app/docs";
		break;
	default:
		pathApp = "/pjcan-app/";
		outApp = "./dist";
		break;
}

module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: pathApp,
	outputDir: outApp,
	productionSourceMap: false,

	configureWebpack: {
		optimization: {
			splitChunks: {
				minSize: 20000,
				maxSize: 250000
			},
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

		config.when(process.env.NODE_ENV !== "development", (config) =>
		{
			config
				.plugin("ScriptExtHtmlWebpackPlugin")
				.after("html")
				.use("script-ext-html-webpack-plugin", [
					{
						inline: /runtime\..*\.js$/
					}
				])
				.end();
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
	},

	pwa: {
		lang: "ru",
		name: "PJCAN",
		short_name: "PJCAN",
		description: "CANBUS адаптер",
		themeColor: "#0b677b",
		msTileColor: "#25323e",
		appleMobileWebAppCapable: "yes",
		appleMobileWebAppStatusBarStyle: "#0b677b",
		id: pathApp,
		icons: [
			{ "src": "./img/icons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
			{ "src": "./img/icons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" },
			{
				"src": "./img/icons/android-chrome-maskable-192x192.png",
				"sizes": "192x192",
				"type": "image/png",
				"purpose": "maskable"
			},
			{
				"src": "./img/icons/android-chrome-maskable-512x512.png",
				"sizes": "512x512",
				"type": "image/png",
				"purpose": "maskable"
			}
		],

		// настройки манифеста
		manifestOptions: {
			background_color: "#121517"
		},
		workboxOptions: {
			navigateFallback: "index.html",
			exclude: [/runtime/]
		}
	}
});
