/** Очистить сообщения */
export const clearMessages = ({ commit }: { commit: any }) =>
{
	commit("setMessages", []);
};
