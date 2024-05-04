import store from "@/store";
import { IMessage } from "@/models/interfaces/message/IMessage";
import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { IButtonCard } from "@/models/interfaces/IButtonCard";
import { createDebounce } from "@/utils/debounce";
const debounce = createDebounce();

/**
 * Записать новое сообщение
 * @param state
 * @param {IMessage} msg Сообщение
 */
export const setMessage = (state: any, msg: IMessage) =>
{
	state.messages.push(msg);
	state.visibleMessage = true;
};

export const setVisibleMessage = (state: any, value: boolean) =>
{
	state.visibleMessage = value;
	if (!value)
	{
		debounce(() => store.commit("app/freeMessage"), 400);
	}
};

/**
 * Удалить первое сообщение из очереди сообщений
 * @param state
 */
export const freeMessage = (state: any) =>
{
	if (state.messages?.[0])
	{
		state.messages.splice(0, 1);
	}
};

/**
 * Очистить очередь сообщений
 * @param state
 */
export const clearMessages = (state: any) =>
{
	debounce(() => {}, 0);
	state.messages = [];
};

/**
 * Изменить список карточек бортового компьютера
 * @param {any} state
 * @param {IOnboardCard[]} value Новый список
 */
export const setOnboardCardList = (state: any, value: IOnboardCard[]) =>
{
	state.onboardCardList = [...value].map((x: IOnboardCard) => ({ ...x }));
};

/**
 * Записать список кнопок SW1
 * @param {any} state
 * @param {IButtonCard[]} value Новый список
 */
export const setSW1 = (state: any, value: IButtonCard[]) =>
{
	state.sw1 = [...value].map((x: IButtonCard) => ({
		id: x.id,
		title: x.title,
		icon: x.icon
	}));
};

/**
 * Записать уведомление
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setNotify = (state: any, value: boolean) =>
{
	state.notify = value;
};
