<template>
	<div class="icon-custom">
		<div v-if="html" class="d-flex" v-html="html" />
		<v-icon v-else-if="mdi" :size="size" :color="color">{{ name }}</v-icon>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
const svgIconTemplate: any = require("./svg-icon-template");

export default {
	name: "IconCustom",
	props: {
		name: {
			type: String,
			required: true
		},
		size: {
			type: [Number, String],
			default: 26
		},
		color: String,
		colors: {
			type: Object,
			default: () => ({ primary: "#0b677b", secondary: "#25323e" })
		}
	},
	setup(props: any)
	{
		const { name, size, color, colors } = toRefs(props);

		const mdi = computed((): boolean => /^mdi-.*$/i.test(name.value));
		const svg = computed((): boolean => /^<svg.*\/svg>$/i.test(name.value));
		const html = computed((): string =>
		{
			let src = svg.value ? name.value : svgIconTemplate[name.value] ?? undefined;
			if (src)
			{
				src = src.replaceAll("{size}", size.value);
				if (color.value) src = src.replaceAll("{primary}", color.value);
				if (colors.value)
				{
					for (const key in colors.value)
					{
						src = src.replaceAll("{" + key + "}", colors.value[key]);
					}
				}
				// заменяем значения на дефолтные, если они небыли заменены
				src = src.replaceAll("{primary}", "white");
				src = src.replaceAll("{stroke}", "black");
			}
			return src;
		});

		return {
			mdi,
			svg,
			html
		};
	}
};
</script>
