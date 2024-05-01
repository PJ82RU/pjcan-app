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
		:view="menuSelected.view"
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";
import EngineConfigDialog from "./EngineConfigDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { IViewConfig } from "@/models/pjcan/view";
import { IEngineConfig } from "@/models/pjcan/engine";
import { TCarModel } from "@/models/pjcan/mazda";

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

		const engineConfigLoaded = computed((): boolean => store.getters["config/engine"].isData);
		const engineValueLoaded = computed((): boolean => store.getters["value/engine"].isData);
		const engineViewLoaded = computed((): boolean => store.getters["view/engine"].isData);

		const showDays = computed((): boolean => store.getters["config/engine"].showDays);
		const totalWorktime = computed((): number =>
		{
			const res = store.getters["config/engine"];
			return res.totalWorktime > 0 ? Math.round(Number(res.totalWorktime / 60n)) : 0;
		});
		const totalCountRPM = computed((): number =>
		{
			const res = store.getters["config/engine"];
			return res.totalCountRPM > 0 ? Math.round(Number(res.totalCountRPM / 1000n)) : 0;
		});
		const enabled = computed((): boolean => store.getters["value/engine"].on);
		const rpm = computed((): string => store.getters["value/engine"].rpm.toFixed());
		const countRPM = computed((): string => store.getters["value/engine"].viewCountRPM.toString());
		const load = computed((): number => store.getters["value/engine"].load / 1000);
		const worktime = computed((): string =>
		{
			const res = store.getters["value/engine"];
			const viewHours = !showDays.value ? res.viewHours + res.viewDays * 24 : res.viewHours;
			let result = showDays.value && res.viewDays > 0 ? res.viewDays + "." : "";
			result += (viewHours < 10 ? "0" : "") + viewHours + ":";
			result += (res.viewMinutes < 10 ? "0" : "") + res.viewMinutes + ":";
			result += (res.viewSeconds < 10 ? "0" : "") + res.viewSeconds;
			return result;
		});
		const throttle = computed((): number => store.getters["value/engine"].throttle / 100);
		const coolant = computed((): number => store.getters["value/engine"].coolant);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.engine.settings.menu") },
			{
				title: t("onboard.engine.enabled.menu"),
				view: store.getters["view/engine"].enabled,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.RPM.menu"),
				view: store.getters["view/engine"].rpm,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.countRPM.menu"),
				view: store.getters["view/engine"].totalCountRPM,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.load.menu"),
				view: store.getters["view/engine"].load,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.worktime.menu"),
				view: store.getters["view/engine"].totalWorktime,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.throttle.menu"),
				view: store.getters["view/engine"].throttle,
				disabled: !engineViewLoaded.value
			},
			{
				title: t("onboard.engine.coolant.menu"),
				view: store.getters["view/engine"].coolant,
				disabled: !engineViewLoaded.value
			}
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

		/** Применить конфигурацию ДВС
		 * @param {IEngineConfig} data Новая конфигурация ДВС
		 */
		const onEngineConfigApply = (data: IEngineConfig): void =>
		{
			canbus.query(data);
		};

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
