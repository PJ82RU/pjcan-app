import { IMovementValue } from "./IMovementValue";
import { IMovementView } from "./IMovementView";

export interface IMovement {
	value: IMovementValue;
	views: IMovementView;
}
