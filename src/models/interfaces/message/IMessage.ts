import { IMessageBtn } from "./IMessageBtn";

export interface IMessage {
	title: string;
	icon?: string;
	text: string;
	btns?: IMessageBtn[];
	timeout?: number;
	width?: number | string;
}
