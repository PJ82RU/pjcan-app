/** Список ID функций кнопки */
export enum TButtonExec {
	TEYES_NONE = 0, // кнопка отпущена
	TEYES_MODE = 1, // кнопка mode
	TEYES_SEEK_UP = 2, // кнопка set up
	TEYES_SEEK_DOWN = 3, // кнопка set down
	TEYES_VOL_UP = 4, // кнопка уровень звука +
	TEYES_VOL_DOWN = 5, // кнопка уровень звука -
	TEYES_VOL_MUTE = 6, // кнопка выкл. звука
	LCD_CLOCK_PRESS = 7, // кнопка Clock на LCD (нажата)
	LCD_CLOCK_RELEASE = 8, // кнопка Clock на LCD (отпущена)
	LCD_CLOCK_H_PRESS = 9, // кнопка Clock H на LCD (нажата)
	LCD_CLOCK_H_RELEASE = 10, // кнопка Clock H на LCD (отпущена)
	LCD_CLOCK_M_PRESS = 11, // кнопка Clock M на LCD (нажата)
	LCD_CLOCK_M_RELEASE = 12, // кнопка Clock M на LCD (отпущена)
	LCD_INFO_PRESS = 13, // кнопка Info на LCD (нажата)
	LCD_INFO_RELEASE = 14, // кнопка Info на LCD (отпущена)
	VARIABLE_ENGINE = 15, // кнопка показать значения ДВС
	VARIABLE_FUEL = 16, // кнопка показать значения расхода
	VARIABLE_MOVEMENT = 17, // кнопка показать значения движения
	VARIABLE_TEMPERATURE = 18 // кнопка показать значения температуру
}
