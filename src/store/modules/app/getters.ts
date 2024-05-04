import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

/**
 * Сообщение из очереди сообщений
 * @param {any} state
 */
export const message = (state: any) => state.messages?.[0];

/**
 * Отображение диалога сообщения
 * @param {any} state
 */
export const visibleMessage = (state: any) => state.visibleMessage;

/**
 * Список карточек бортового компьютера
 * @param {any} state
 */
export const onboardCardList = (state: any): IOnboardCard[] => state.onboardCardList;

/**
 * Список кнопок SW1
 * @param {any} state
 */
export const sw1 = (state: any): IButtonCard[] => state.sw1;

/**
 * Уведомления
 * @param {any} state
 */
export const notify = (state: any): boolean => state.notify;
