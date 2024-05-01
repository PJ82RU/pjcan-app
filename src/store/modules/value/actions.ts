import canbus from "@/api/canbus";
import { Timeout } from "@/models/types/Timeout";
import { ChoiceValue } from "@/models/pjcan/choice";

let loop: Timeout;
/**
 * Циклическое обновление значений, каждые 250 мс
 * @param {any} state
 * @param {number[]} list Список ID
 */
export const updateLoop = ({ getters }: { getters: any }, list: number[] | undefined) =>
{
	if (list?.length)
	{
		const query = (): void =>
		{
			const choice = new ChoiceValue();
			choice.listID = list;
			canbus.query(choice, true);
		};
		if (!loop) loop = setInterval(query, 250);
		query();
	}
	else
	{
		clearInterval(loop);
		loop = undefined;
	}
};
