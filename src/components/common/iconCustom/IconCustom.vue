<!--suppress JSCheckFunctionSignatures -->
<template>
	<q-icon class="icon-custom q-icon" :draggable="false" :name="src" :size="iconSize" :color="iconColor" />
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
		size: {
			type: [Number, String],
			default: 24
		},
		color: String,
		colors: {
			type: Object,
			default: { primary: 'primary', secondary: 'secondary' }
		}
	},
	setup(props) {
		const prefix = 'img:data:image/svg+xml;charset=utf-8,';
		const { name, size, color, colors } = toRefs(props);

		// размер иконки
		const iconSize = computed(() => (typeof size.value === 'number' ? size.value + 'px' : size.value));
		// цвет
		const iconColor = computed(() => getColorPaletteValue(color.value ?? 'dark'));
		// ссылка на иконку
		const src = computed(() => {
			let template = svgIconTemplate(name.value, color.value, colors.value);
			return template ? prefix + encodeURIComponent(template) : name.value;
		});

		return {
			iconSize,
			iconColor,
			src
		};
	}
};
</script>
