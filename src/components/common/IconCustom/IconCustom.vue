<template>
	<q-icon class="IconCustom q-icon" :draggable="false" :name="src" :size="iconSize" :color="fontIconColor" />
</template>

<script>
import { QIcon } from 'quasar';
import { toRefs, computed } from 'vue';

import { getColorPaletteValue } from './getColorPalette';
import svgIconTemplate from './svgIconTemplate';

export default {
	name: 'IconCustom',
	components: {
		QIcon
	},
	props: {
		name: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: false,
			default: 'dark'
		},
		colorSecondary: {
			type: String,
			required: false,
			default: 'dark'
		},
		size: {
			type: [Number, String],
			required: false,
			default: 24
		}
	},
	setup(props) {
		const prefix = 'img:data:image/svg+xml;charset=utf-8,';
		const { name, color, colorSecondary, size } = toRefs(props);

		// размер иконки
		const iconSize = computed(() => (typeof size.value === 'number' ? size.value + 'px' : size.value));
		// ссылка на иконку
		const src = computed(() => {
			let template = svgIconTemplate(name.value, color.value, colorSecondary.value);
			return template ? prefix + encodeURIComponent(template) : name.value;
		});
		// цвет
		const fontIconColor = computed(() => getColorPaletteValue(color.value));

		return {
			iconSize,
			src,
			fontIconColor
		};
	}
};
</script>
