import { getColorPaletteValue } from './getColorPalette';
import svgIcons from './svgIcons';

/**
 * @description Утилита для шаблонизации цветов в кастомных svg иконках, которые хранятся в файле svgIcons.
 * @param {string} icon Имя иконки (ключ, под которым иконка лежит в svgIcons).
 * @param {string} color Основной цвет иконки.
 * @param {object} colors Выборочные цвет иконки.
 * @returns {string} Возвращает строку с svg.
 */
const svgIconTemplate = (
	icon: keyof typeof svgIcons,
	color?: string,
	colors?: Record<string, string>
): string | undefined => {
	let template: string = svgIcons[icon];
	if (!template) return;

	if (color) template = template.replace('{{ primary }}', getColorPaletteValue(color));
	else if (colors) {
		for (const key in colors) {
			template = template.replace('{{ ' + key + ' }}', getColorPaletteValue(colors[key]));
		}
	} else {
		// заменяем значения на дефолтные, если они небыли заменены
		template = template.replace('{{ primary }}', getColorPaletteValue('dark'));
		template = template.replace('{{ secondary }}', getColorPaletteValue('dark'));
	}

	return template;
};

export default svgIconTemplate;
