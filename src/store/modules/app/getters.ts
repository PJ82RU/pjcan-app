/**
 * Сообщение из очереди сообщений
 * @param state
 */
export const message = (state: any) => state.messages?.[0];

/**
 * Список карточек бортового компьютера
 * @param state
 */
export const onboardCardList = (state: any): string[] => state.onboardCardList;
