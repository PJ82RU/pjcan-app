export const setTitle = (state: any, value: string) => (state.title = value);
export const setMessage = (state: any, value: string) => (state.messages.push(value));
export const setMessages = (state: any, value: string[]) => (state.messages = value);
