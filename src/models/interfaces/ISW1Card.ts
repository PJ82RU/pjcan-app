import { ISW1ConfigButton } from "../pjcan/buttons";
import { TButtonExec } from "../pjcan/buttons";

export interface ISW1Card {
	id: number;
	title: string;
	icon: string;
	extended: boolean;
	swtch: boolean;
	resistanceTo: number;
	exec: TButtonExec[];
	execMode: TButtonExec[];
	config?: ISW1ConfigButton;
}
