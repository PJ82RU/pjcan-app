import {
	API_SW1_CONFIG_EXEC,
	API_SW1_CONFIG_EVENT,
	SW1_CONFIG_RESISTANCE_MIN,
	SW1_CONFIG_RESISTANCE_MAX,
	SW1Config
} from "./SW1Config";
import { API_SW3_CONFIG_EXEC, API_SW3_CONFIG_EVENT, SW3Config } from "./SW3Config";

import { ISW1Config } from "./ISW1Config";
import { ISW1ConfigButton } from "./ISW1ConfigButton";
import { ISW3Config } from "./ISW3Config";
import { ISW3ConfigButton } from "./ISW3ConfigButton";

import { API_SW1_VALUE_EXEC, API_SW1_VALUE_EVENT, API_SW3_VALUE_EXEC, API_SW3_VALUE_EVENT, SWValue } from "./SWValue";

import { IButtonValue } from "./IButtonValue";

import { API_SW1_ACTION_EXEC, API_SW1_ACTION_EVENT, SW1Action } from "./SW1Action";
import { API_SW3_ACTION_EXEC, API_SW3_ACTION_EVENT, SW3Action } from "./SW3Action";

import { ISW1Action } from "./ISW1Action";
import { ISW3Action } from "./ISW3Action";

import { ISW1Type } from "./ISW1Type";
import { TButtonExec } from "./TButtonExec";
import { TButtonPress } from "./TButtonPress";

export {
	API_SW1_CONFIG_EXEC,
	API_SW1_CONFIG_EVENT,
	SW1_CONFIG_RESISTANCE_MIN,
	SW1_CONFIG_RESISTANCE_MAX,
	SW1Config,
	API_SW3_CONFIG_EXEC,
	API_SW3_CONFIG_EVENT,
	SW3Config,
	API_SW1_VALUE_EXEC,
	API_SW1_VALUE_EVENT,
	API_SW3_VALUE_EXEC,
	API_SW3_VALUE_EVENT,
	SWValue,
	API_SW1_ACTION_EXEC,
	API_SW1_ACTION_EVENT,
	SW1Action,
	API_SW3_ACTION_EXEC,
	API_SW3_ACTION_EVENT,
	SW3Action,
	TButtonExec,
	TButtonPress
};
export type {
	ISW1Config,
	ISW1ConfigButton,
	ISW3Config,
	ISW3ConfigButton,
	IButtonValue,
	ISW1Action,
	ISW3Action,
	ISW1Type
};
