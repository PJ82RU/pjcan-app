import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { ISW1Card } from "@/models/interfaces/ISW1Card";

/**
 * Язык интерфейса
 * @param state
 */
export const language = (state: any): boolean => state.language;

/**
 * Сообщение из очереди сообщений
 * @param {any} state
 */
export const message = (state: any) => state.messages?.[0];

/**
 * Отображение диалога сообщения
 * @param {any} state
 */
export const messageVisible = (state: any) => state.messageVisible;

/**
 * Уведомления
 * @param {any} state
 */
export const notify = (state: any): boolean => state.notify;

/**
 * Список карточек бортового компьютера
 * @param {any} state
 */
export const onboardCards = (state: any): IOnboardCard[] => state.onboardCards;

/**
 * Список кнопок SW1
 * @param {any} state
 */
export const sw1 = (state: any): ISW1Card[] => state.sw1;
