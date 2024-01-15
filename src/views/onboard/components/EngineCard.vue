<template>
	<card class="engine-card" :title="$t('onboard.engine.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[enabled]"
						:title="$t('onboard.engine.enabled.title')"
						:description="$t('onboard.engine.enabled.description')"
						:icon-name="['start-stop']"
						:nodata="!engineValueLoaded"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="rpm"
						:title="$t('onboard.engine.RPM.title')"
						:description="$t('onboard.engine.RPM.description')"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="countRPM"
						:title="$t('onboard.engine.countRPM.title')"
						:description="$t('onboard.engine.countRPM.description')"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="worktime"
						:title="$t('onboard.engine.worktime.title')"
						:description="$t('onboard.engine.worktime.description')"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<progress-card-item
						:value="load"
						:title="$t('onboard.engine.load.title')"
						:description="$t('onboard.engine.load.description')"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<progress-card-item
						:value="throttle"
						:title="$t('onboard.engine.throttle.title')"
						:description="$t('onboard.engine.throttle.description')"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="coolant"
						:title="$t('onboard.engine.coolant.title')"
						:description="$t('onboard.engine.coolant.description')"
						type="temperature"
						:nodata="!enabled"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:enabled="menuSelected.view?.enabled"
		:type="menuSelected.view?.type"
		:time="menuSelected.view?.time"
		:delay="menuSelected.view?.delay"
		:disabled="menuSelected.disabled"
		@click:apply="onEngineViewApply"
	/>

	<engine-config-dialog
		v-model="engineConfigVisible"
		:show-days="showDays"
		:total-worktime="totalWorktime"
		:total-count-r-p-m="totalCountRPM"
		:disabled="!engineConfigLoaded"
		@click:apply="onEngineConfigApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import EngineConfigDialog from "./EngineConfigDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { IViewConfig } from "@/models/pjcan/view";
import {
	API_ENGINE_CONFIG_EVENT,
	API_ENGINE_CONFIG_EXEC,
	API_ENGINE_VALUE_EVENT,
	API_ENGINE_VIEW_EVENT,
	API_ENGINE_VIEW_EXEC,
	EngineConfig,
	IEngineConfig,
	IEngineValue,
	IEngineViews
} from "@/models/pjcan/engine";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { TCarModel } from "@/models/pjcan/mazda";
import { ChoiceValue } from "@/models/pjcan/choice";

export default {
	name: "EngineCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, InputCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog, EngineConfigDialog },
	setup()
	{
		const { t } = useI18n();

		const engineConfigLoaded = ref(false);
		const engineValueLoaded = ref(false);
		const engineViewLoaded = ref(false);

		const enabled = ref(false);
		const rpm = ref("");
		const countRPM = ref("");
		const load = ref(0);
		const worktime = ref("");
		const throttle = ref(0);
		const coolant = ref(0);
		const showDays = ref(false);
		const totalWorktime = ref(0);
		const totalCountRPM = ref(0);
		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		let engineViews: IEngineViews;

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.engine.settings.menu") },
			{
				title: t("onboard.engine.enabled.menu"),
				view: engineViews?.enabled,
				disabled: !engineViewLoaded.value
			},
			{ title: t("onboard.engine.RPM.menu"), view: engineViews?.rpm, disabled: !engineViewLoaded.value },
			{
				title: t("onboard.engine.countRPM.menu"),
				view: engineViews?.totalCountRPM,
				disabled: !engineViewLoaded.value
			},
			{ title: t("onboard.engine.load.menu"), view: engineViews?.load, disabled: !engineViewLoaded.value },
			{
				title: t("onboard.engine.worktime.menu"),
				view: engineViews?.totalWorktime,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.throttle.menu"),
				view: engineViews?.throttle,
				disabled: !engineViewLoaded.value
			},
			{ title: t("onboard.engine.coolant.menu"), view: engineViews?.coolant, disabled: !engineViewLoaded.value }
		]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const engineConfigVisible = ref(false);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			if (item.view)
			{
				menuVisible.value = true;
				menuSelected.value = item;
			}
			else engineConfigVisible.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onEngineViewApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/** Применить конфигурацию ДВС */
		const onEngineConfigApply = (res: any): void =>
		{
			const config = new EngineConfig();
			config.showDays = res?.showDays ?? showDays.value;
			config.totalWorktime = BigInt(res?.totalWorktime ?? totalWorktime.value) * 60n;
			config.totalCountRPM = BigInt(res?.totalCountRPM ?? totalCountRPM.value) * 1000n;
			canbus.query(config);
		};

		/** Входящие значения ДВС */
		const onEngineValueReceive = (res: IEngineValue): void =>
		{
			engineValueLoaded.value = res.isData;
			if (res.isData)
			{
				enabled.value = true; // res.on;
				rpm.value = res.rpm.toFixed();
				countRPM.value = res.viewCountRPM.toString();
				load.value = res.load / 1000;

				if (!showDays.value)
				{
					res.viewHours += res.viewDays * 24;
					res.viewDays = 0;
				}
				let wt = res.viewDays > 0 ? res.viewDays + "." : "";
				wt += (res.viewHours < 10 ? "0" : "") + res.viewHours + ":";
				wt += (res.viewMinutes < 10 ? "0" : "") + res.viewMinutes + ":";
				wt += (res.viewSeconds < 10 ? "0" : "") + res.viewSeconds;
				worktime.value = wt;

				throttle.value = res.throttle / 100;
				coolant.value = res.coolant;
			}
		};
		const onEngineConfigReceive = (res: IEngineConfig): void =>
		{
			engineConfigLoaded.value = res.isData;
			if (res.isData)
			{
				showDays.value = res.showDays;
				totalWorktime.value = res.totalWorktime > 0 ? Math.round(Number(res.totalWorktime / 60n)) : 0;
				totalCountRPM.value = res.totalCountRPM > 0 ? Math.round(Number(res.totalCountRPM / 1000n)) : 0;
			}
		};

		/** Входящие значения отображения ДВС */
		const onEngineViewReceive = (res: IEngineViews): void =>
		{
			engineViewLoaded.value = res.isData;
			engineViews = res;
		};

		const choiceId = Math.round(Math.random() * 1000000);
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.id = choiceId;
				choice.listID = [API_ENGINE_CONFIG_EXEC, API_ENGINE_VIEW_EXEC];
				canbus.query(choice, true);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_ENGINE_CONFIG_EVENT, onEngineConfigReceive);
			canbus.addListener(API_ENGINE_VALUE_EVENT, onEngineValueReceive);
			canbus.addListener(API_ENGINE_VIEW_EVENT, onEngineViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_ENGINE_CONFIG_EVENT, onEngineConfigReceive);
			canbus.removeListener(API_ENGINE_VALUE_EVENT, onEngineValueReceive);
			canbus.removeListener(API_ENGINE_VIEW_EVENT, onEngineViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			engineConfigLoaded,
			engineValueLoaded,
			engineViewLoaded,
			enabled,
			rpm,
			countRPM,
			load,
			worktime,
			throttle,
			coolant,
			showDays,
			totalWorktime,
			totalCountRPM,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			engineConfigVisible,
			onMenuClick,
			onEngineViewApply,
			onEngineConfigApply
		};
	}
};
</script>
