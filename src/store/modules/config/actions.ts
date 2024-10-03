import canbus from "@/api/canbus";
import { Timeout } from "@/models/types/Timeout";

let loop: Timeout;
/**
 * Циклическое обновление информацию об устройстве, каждые 10 сек.
 * @param getters
 * @param {boolean} enabled Запустить цикл обновления
 */
export const infoUpdateLoop = ({ getters }: { getters: any }, enabled: Boolean) =>
{
	if (enabled)
	{
		if (!loop) loop = setInterval(() => canbus.query(getters.info, true), 10000);
		canbus.query(getters.info, true);
	}
	else
	{
		clearInterval(loop);
		loop = undefined;
	}
};
