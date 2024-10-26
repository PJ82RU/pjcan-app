import store from "@/store";
import { IMessage } from "@/models/interfaces/message/IMessage";
import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { ISW1Card } from "@/models/interfaces/ISW1Card";
import { createDebounce } from "@/utils/debounce";
const debounce = createDebounce();

/**
 * Записать значение языка интерфейса
 * @param {any} state
 * @param {boolean} value Значение
 */
export const setLanguage = (state: any, value: string) =>
{
	state.language = value;
};

/**
 * Записать новое сообщение
 * @param state
 * @param {IMessage} msg Сообщение
 */
export const setMessage = (state: any, msg: IMessage) =>
{
	state.messages.push(msg);
	state.messageVisible = true;
};

/**
 * Записать статус отображения сообщения
 * @param state
 * @param {boolean} value Статус
 */
export const setMessageVisible = (state: any, value: boolean) =>
{
	state.messageVisible = value;
	if (!value)
	{
		debounce(() => store.commit("app/messageFree"), 400);
	}
};

/**
 * Удалить первое сообщение из очереди сообщений
 * @param state
 */
export const messageFree = (state: any) =>
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
export const messagesClear = (state: any) =>
{
	debounce(() => {}, 0);
	state.messages = [];
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

/**
 * Записать список карточек бортового компьютера
 * @param {any} state
 * @param {IOnboardCard[]} value Новый список
 */
export const setOnboardCards = (state: any, value: IOnboardCard[]) =>
{
	state.onboardCards = [...value].map((x: IOnboardCard) => ({ ...x }));
};

/**
 * Записать список кнопок SW1
 * @param {any} state
 * @param {ISW1Card[]} value Новый список
 */
export const setSW1 = (state: any, value: ISW1Card[]) =>
{
	state.sw1 = [...value].map((x: ISW1Card) => ({
		id: x.id,
		title: x.title,
		icon: x.icon
	}));
};
