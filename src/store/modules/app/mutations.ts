import { IMessage } from "@/models/interfaces/message/IMessage";

/**
 * Записать новое сообщение
 * @param state
 * @param {IMessage} msg Сообщение
 */
export const setMessage = (state: any, msg: IMessage) => (state.messages.push(msg));

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
export const clearMessages = (state: any) => (state.messages = []);
