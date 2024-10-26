/* eslint-disable */

/** Список ID функций кнопки */
export enum TButtonExec {
	BUTTON_EXEC_NONE,                           // Функция отсутствует
	BUTTON_EXEC_CHANGE_CONTROL_MODE,            // PJCAN: сменить режим управления
	BUTTON_EXEC_VIEW_ENGINE,                    // PJCAN: показать значения ДВС
	BUTTON_EXEC_VIEW_FUEL,                      // PJCAN: показать значения расхода
	BUTTON_EXEC_VIEW_MOVEMENT,                  // PJCAN: показать значения движения
	BUTTON_EXEC_VIEW_TEMPERATURE,               // PJCAN: показать значения температуры
	BUTTON_EXEC_VIEW_DATE_TIME,                 // PJCAN: показать дату и время
	BUTTON_EXEC_HEAD_UNIT_BUTTON_MUTE,          // ГУ: кнопка Mute на руле
	BUTTON_EXEC_HEAD_UNIT_BUTTON_MODE,          // ГУ: кнопка Mode на руле
	BUTTON_EXEC_HEAD_UNIT_BUTTON_SET_DOWN,      // ГУ: кнопка Set down на руле
	BUTTON_EXEC_HEAD_UNIT_BUTTON_SET_UP,        // ГУ: кнопка Set up на руле
	BUTTON_EXEC_HEAD_UNIT_BUTTON_VOL_UP,        // ГУ: кнопка Vol+ на руле
	BUTTON_EXEC_HEAD_UNIT_BUTTON_VOL_DOWN,      // ГУ: кнопка Vol- на руле
	BUTTON_EXEC_HEAD_UNIT_VOICE,                // ГУ: открыть голосовое управление
	BUTTON_EXEC_HEAD_UNIT_EQUALIZER,            // ГУ: открыть эквалайзер
	BUTTON_EXEC_HEAD_UNIT_RADIO,                // ГУ: открыть радио
	BUTTON_EXEC_HEAD_UNIT_RADIO_SEARCH,         // ГУ: поиск волны радио
	BUTTON_EXEC_HEAD_UNIT_CAMERA,               // ГУ: открыть камеру
	BUTTON_EXEC_HEAD_UNIT_PHONE,                // ГУ: открыть телефон
	BUTTON_EXEC_ON_BOARD_BUTTON_INFO,           // БК: кнопка Info (информация БК)
	BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK,          // БК: кнопка Clock (время на БК)
	BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_H,        // БК: кнопка Clock H (часы)
	BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_M,        // БК: кнопка Clock M (минуты)
	BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_24,       // БК: кнопка Clock 24/12 (смена формата времени)
	BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_RM,       // БК: кнопка сброса минут в 0
	BUTTON_EXEC_ON_BOARD_CHANGE_INFO_CLOCK,     // БК: сменить режим Info на Clock и обратно
	BUTTON_EXEC_ON_BOARD_LONG_PRESS_INFO,       // БК: нажатие и удержание кнопки Info (сброс расхода)
	BUTTON_EXEC_ON_BOARD_LONG_PRESS_CLOCK,      // БК: нажатие и удержание кнопки Clock (настройка часов)
	BUTTON_EXEC_BOSE_ON,                        // BOSE: вкл/выкл усилителя
	BUTTON_EXEC_BOSE_AUDIO_PLT,                 // BOSE: вкл/выкл Audio PLT
	BUTTON_EXEC_BOSE_MUTE,                      // BOSE: mute
	BUTTON_EXEC_BOSE_VOL_UP,                    // BOSE: vol+
	BUTTON_EXEC_BOSE_VOL_DOWN,                  // BOSE: vol-
	BUTTON_EXEC_BOSE_BALANCE_UP,                // BOSE: balance +
	BUTTON_EXEC_BOSE_BALANCE_DOWN,              // BOSE: balance -
	BUTTON_EXEC_BOSE_BASS_UP,                   // BOSE: bass +
	BUTTON_EXEC_BOSE_BASS_DOWN,                 // BOSE: bass -
	BUTTON_EXEC_BOSE_FADE_UP,                   // BOSE: fade +
	BUTTON_EXEC_BOSE_FADE_DOWN,                 // BOSE: fade -
	BUTTON_EXEC_BOSE_TREBLE_UP,                 // BOSE: treble +
	BUTTON_EXEC_BOSE_TREBLE_DOWN,               // BOSE: treble -
	BUTTON_EXEC_BOSE_CENTER_POINT               // BOSE: переключение режимов Center Point (циклично)
}
