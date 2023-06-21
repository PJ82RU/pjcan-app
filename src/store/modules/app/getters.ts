import { IOnboardCard } from "@/models/interfaces/IOnboardCard";

/**
 * Сообщение из очереди сообщений
 * @param state
 */
export const message = (state: any) => state.messages?.[0];

/**
 * Отображение диалога сообщения
 * @param state
 */
export const visibleMessage = (state: any) => state.visibleMessage;

/**
 * Список карточек бортового компьютера
 * @param state
 */
export const onboardCardList = (state: any): IOnboardCard[] => state.onboardCardList;
