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
 * Модель автомобиля
 * @param {any} state
 */
export const carModel = (state: any) => state.carModel;

/**
 * Список кнопок SW1
 * @param {any} state
 */
export const listButtonsSW1 = (state: any): IButtonCard[] => state.listButtonsSW1;

/**
 * Список кнопок SW3
 * @param {any} state
 */
export const listButtonsSW3 = (state: any): IButtonCard[] => state.listButtonsSW3;
