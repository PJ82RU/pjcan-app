import { IOnboardCard } from "@/models/interfaces/IOnboardCard";

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
 * Модель автомобиля
 * @param {any} state
 */
export const carModel = (state: any) => state.carModel;
