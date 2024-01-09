import { IEngineConfig } from "./IEngineConfig";
import { IEngineValue } from "./IEngineValue";
import { IEngineView } from "./IEngineView";

export interface IEngine {
	config: IEngineConfig;
	value: IEngineValue;
	view: IEngineView;
}
