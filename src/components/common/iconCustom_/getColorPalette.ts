import { colors as quasarColors } from 'quasar';
const { getPaletteColor } = quasarColors;

/**
 * Чтение значение цвета
 * @param color Имя цвета или сам цвет
 */
const getColorPaletteValue = (color: string) => {
	return color.charAt(0) !== '#' ? getPaletteColor(color) : color;
};

export { getColorPaletteValue };
