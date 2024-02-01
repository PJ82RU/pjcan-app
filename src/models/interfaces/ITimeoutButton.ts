import { Timeout } from "@/models/types/Timeout";

export interface ITimeoutButton {
	press: boolean;
	timeUp: boolean;
	timeout: Timeout;
}
