/* eslint-disable */

/** Список ID функций кнопки */
export enum TButtonExec {
	TEYES_NONE = 0, // кнопка отпущена
	TEYES_MODE = 1, // кнопка mode
	TEYES_SEEK_UP = 2, // кнопка set up
	TEYES_SEEK_DOWN = 3, // кнопка set down
	TEYES_VOL_UP = 4, // кнопка уровень звука +
	TEYES_VOL_DOWN = 5, // кнопка уровень звука -
	TEYES_VOL_MUTE = 6, // кнопка выкл. звука
	LCD_CLOCK = 7, // кнопка Clock на LCD (нажата)
	LCD_CLOCK_H = 8, // кнопка Clock H на LCD (нажата)
	LCD_CLOCK_M = 9, // кнопка Clock M на LCD (нажата)
	LCD_INFO = 10, // кнопка Info на LCD (нажата)
	VARIABLE_ENGINE = 11, // кнопка показать значения ДВС
	VARIABLE_FUEL = 12, // кнопка показать значения расхода
	VARIABLE_MOVEMENT = 13, // кнопка показать значения движения
	VARIABLE_TEMPERATURE = 14, // кнопка показать значения температуру
	LCD_CLOCK_24 = 15, // кнопка Clock 24/12 на LCD (нажата)
}
