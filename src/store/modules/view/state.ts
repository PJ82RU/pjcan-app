import { ViewConfig } from "@/models/pjcan/view";
import { API_DEVICE_VIEW_VOLTMETER_EXEC, API_DEVICE_VIEW_WORKTIME_EXEC } from "@/models/pjcan/device";
import { API_ONBOARD_VIEW_EXEC } from "@/models/pjcan/onboard";
import { API_HEAD_UNIT_VIEW_EXEC } from "@/models/pjcan/head-unit";
import { API_BOSE_VIEW_EXEC } from "@/models/pjcan/bose";
import { API_CLIMATE_VIEW_EXEC } from "@/models/pjcan/climate";
import { API_DOORS_VIEW_EXEC } from "@/models/pjcan/doors";
import { EngineViews } from "@/models/pjcan/engine";
import { FuelViews } from "@/models/pjcan/fuel";
import { MovementViews } from "@/models/pjcan/movement";
import { SensorsViews } from "@/models/pjcan/sensors";
import { API_TEMPERATURE_VIEW_EXEC } from "@/models/pjcan/temperature";
import { API_DATETIME_VIEW_EXEC } from "@/models/pjcan/datetime";

const state = {
	worktime: new ViewConfig(API_DEVICE_VIEW_WORKTIME_EXEC),
	voltmeter: new ViewConfig(API_DEVICE_VIEW_VOLTMETER_EXEC),
	onboard: new ViewConfig(API_ONBOARD_VIEW_EXEC),
	headText: new ViewConfig(API_HEAD_UNIT_VIEW_EXEC),
	bose: new ViewConfig(API_BOSE_VIEW_EXEC),
	climate: new ViewConfig(API_CLIMATE_VIEW_EXEC),
	doors: new ViewConfig(API_DOORS_VIEW_EXEC),
	engine: new EngineViews(),
	fuel: new FuelViews(),
	movement: new MovementViews(),
	sensors: new SensorsViews(),
	temperature: new ViewConfig(API_TEMPERATURE_VIEW_EXEC),
	datetime: new ViewConfig(API_DATETIME_VIEW_EXEC)
};

export default state;
