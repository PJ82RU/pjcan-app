import { ViewConfig } from "@/models/pjcan/view";
import { API_DEVICE_VIEW_VOLTMETER_EXEC, API_DEVICE_VIEW_WORKTIME_EXEC } from "@/models/pjcan/device";
import { API_MAZDA_VIEW_EXEC } from "@/models/pjcan/mazda";
import { API_BOSE_VIEW_EXEC } from "@/models/pjcan/bose";
import { API_CLIMATE_VIEW_EXEC } from "@/models/pjcan/climate";
import { API_DOORS_VIEW_EXEC } from "@/models/pjcan/doors";
import { EngineViews } from "@/models/pjcan/engine";
import { FuelViews } from "@/models/pjcan/fuel";
import { MovementViews } from "@/models/pjcan/movement";
import { SensorsViews } from "@/models/pjcan/sensors";
import { API_TEMPERATURE_VIEW_EXEC } from "@/models/pjcan/temperature";
import { API_VOLUME_VIEW_EXEC } from "@/models/pjcan/volume";

const state = {
	worktime: new ViewConfig(API_DEVICE_VIEW_WORKTIME_EXEC),
	voltmeter: new ViewConfig(API_DEVICE_VIEW_VOLTMETER_EXEC),
	mazda: new ViewConfig(API_MAZDA_VIEW_EXEC),
	bose: new ViewConfig(API_BOSE_VIEW_EXEC),
	climate: new ViewConfig(API_CLIMATE_VIEW_EXEC),
	doors: new ViewConfig(API_DOORS_VIEW_EXEC),
	engine: new EngineViews(),
	fuel: new FuelViews(),
	movement: new MovementViews(),
	sensors: new SensorsViews(),
	temperature: new ViewConfig(API_TEMPERATURE_VIEW_EXEC),
	volume: new ViewConfig(API_VOLUME_VIEW_EXEC)
};

export default state;
