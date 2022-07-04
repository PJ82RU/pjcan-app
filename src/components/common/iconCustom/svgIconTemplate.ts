import { getColorPaletteValue } from './getColorPalette';
import svgIcons from './svgIcons';

/**
 * @description Утилита для шаблонизации цветов в кастомных svg иконках, которые хранятся в файле svgIcons.
 * @param {string} icon Имя иконки (ключ, под которым иконка лежит в svgIcons).
 * @param {string} primary Основной цвет иконки
 * @param {string} secondary Второй цвет иконки, если есть
 * @returns {string} Возвращает строку с svg.
 */
const svgIconTemplate = (icon: keyof typeof svgIcons, primary?: string, secondary?: string): string | undefined => {
	let template: string = svgIcons[icon];
	if (!template) return;

	primary = getColorPaletteValue(primary ?? 'dark');
	secondary = getColorPaletteValue(secondary ?? 'dark');

	template = template.replace('{{ primary }}', primary);
	template = template.replace('{{ secondary }}', secondary);

	return template;
};

export default svgIconTemplate;
