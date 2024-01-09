/* eslint-disable */

/** Список ID функций кнопки */
export enum TButtonExec {
	BUTTON_EXEC_NONE,                       // кнопка отпущена
	BUTTON_EXEC_ENTERING_MODE,              // перейти в режим mode
	BUTTON_EXEC_EXITING_MODE,               // выход из режима mode
	BUTTON_EXEC_PRESS_MODE,                 // нажатие кнопки mode
	BUTTON_EXEC_PRESS_SET_UP,               // нажатие кнопки set up
	BUTTON_EXEC_PRESS_SET_DOWN,             // нажатие кнопки set down
	BUTTON_EXEC_PRESS_VOLUME_UP,            // нажатие кнопки уровень звука +
	BUTTON_EXEC_PRESS_VOLUME_DOWN,          // нажатие кнопки уровень звука -
	BUTTON_EXEC_PRESS_MUTE,                 // нажатие кнопки вкл/выкл звука
	BUTTON_EXEC_HOLD_CLOCK,                 // удержание кнопки Clock
	BUTTON_EXEC_PRESS_CLOCK,                // нажатие кнопки Clock
	BUTTON_EXEC_PRESS_CLOCK_H,              // нажатие кнопки Clock H
	BUTTON_EXEC_PRESS_CLOCK_M,              // нажатие кнопки Clock M
	BUTTON_EXEC_PRESS_CLOCK_24,             // нажатие кнопки Clock 24/12
	BUTTON_EXEC_HOLD_INFO,                  // удержание кнопки Info
	BUTTON_EXEC_PRESS_INFO,                 // нажатие кнопки Info
	BUTTON_EXEC_VIEW_ENGINE,                // показать значения ДВС
	BUTTON_EXEC_VIEW_FUEL,                  // показать значения расхода
	BUTTON_EXEC_VIEW_MOVEMENT,              // показать значения движения
	BUTTON_EXEC_VIEW_TEMPERATURE,           // показать значения температуры
	BUTTON_EXEC_TEYES_VOICE,                // голосовое управление ГУ
	BUTTON_EXEC_TEYES_RADIO,                // радио ГУ
	BUTTON_EXEC_TEYES_CAMERA,               // камера ГУ
	BUTTON_EXEC_TEYES_RADIO_SEARCH,         // радио ГУ: поиск
	BUTTON_EXEC_TEYES_EQUALIZER,            // эквалайзер ГУ
	BUTTON_EXEC_TEYES_DISPLAY_ON_OFF,       // вкл/выкл дисплея ГУ
	BUTTON_EXEC_TEYES_PHONE                 // телефон ГУ
}
