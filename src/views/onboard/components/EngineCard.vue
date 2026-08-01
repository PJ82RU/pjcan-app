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
						:value="coolant"
						:title="$t('onboard.engine.coolant.title')"
						:description="$t('onboard.engine.coolant.description')"
						type="temperature"
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

				<v-col cols="12" class="pt-6 pb-0">
					<span class="settings-card__mode-title">{{ $t('onboard.engine.statistics.title') }}</span>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="countRPM"
						:title="$t('onboard.engine.countRPM.title')"
						:description="$t('onboard.engine.countRPM.description')"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="worktime"
						:title="$t('onboard.engine.worktime.title')"
						:description="$t('onboard.engine.worktime.description')"
						:disabled="!engineViewLoaded"
					/>
				</v-col>
				<template v-if="hasOilFeatures">
					<v-col cols="12" class="pt-0 pb-0">
						<input-card-item
							:value="distanceLeftKm"
							:title="$t('onboard.engine.oilLifeDistance.title')"
							:description="$t('onboard.engine.oilLifeDistance.description')"
							:disabled="!engineViewLoaded"
						/>
					</v-col>
					<v-col cols="12" class="pt-0 pb-0">
						<progress-card-item
							:value="oilLifePercent"
							:title="$t('onboard.engine.oilLifePercent.title')"
							:description="$t('onboard.engine.oilLifePercent.description')"
							:disabled="!engineViewLoaded"
						/>
					</v-col>
				</template>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onViewApply"
	/>

	<engine-config-dialog
		v-model="engineConfigVisible"
		:show-days="showDays"
		:total-worktime="totalWorktime"
		:total-count-r-p-m="totalCountRPM"
		:disabled="!engineConfigLoaded"
		@click:apply="onEngineConfigApply"
		@click:resetConfig="onEngineConfigReset"
	/>

	<engine-oil-config-dialog
		v-model="engineOilConfigVisible"
		:oil-duration-hours="oilDurationHours"
		:oil-distance-km="oilDistanceKm"
		:oil-hours-limit="oilHoursLimit"
		:disabled="!engineConfigLoaded"
		@click:apply="onEngineOilConfigApply"
		@click:resetOil="onEngineOilConfigReset"
	/>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";
import EngineConfigDialog from "./EngineConfigDialog.vue";
import EngineOilConfigDialog from "./EngineOilConfigDialog.vue";

import { IMenuItem } from "@/components/IMenuItem";
import { TCarModel } from "@/models/pjcan/onboard";
import { EngineAction } from "@/models/pjcan/engine/EngineAction";
import canbus from "@/api/canbus";

export default {
	name: "EngineCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: {
		Card,
		InputCardItem,
		IconCardItem,
		ProgressCardItem,
		ViewSettingDialog,
		EngineConfigDialog,
		EngineOilConfigDialog
	},
	setup()
	{
		const { t } = useI18n();

		const engineConfigLoaded = computed((): boolean => store.getters["config/engine"].isData);
		const engineValueLoaded = computed((): boolean => store.getters["value/engine"].isData);
		const engineViewLoaded = computed((): boolean => store.getters["view/engine"].isData);

		const hasOilFeatures = computed((): boolean =>
		{
			const version = canbus.version;
			return version.major > 4 || (version.major === 4 && version.minor >= 2);
		});

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
		const oilDurationHours = computed((): number =>
		{
			const res = store.getters["config/engine"];
			return res.oilDurationSec > 0 ? Math.round(res.oilDurationSec / 3600) : 0;
		});
		const oilDistanceKm = computed((): number =>
		{
			const res = store.getters["config/engine"];
			return res.oilDistanceMeters > 0 ? Math.round(res.oilDistanceMeters / 1000) : 0;
		});
		const oilHoursLimit = computed((): number => store.getters["config/engine"].oilHoursLimit);

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
		const distanceLeftKm = computed((): string => store.getters["value/engine"].distanceLeftKm.toString());
		const oilLifePercent = computed((): number => store.getters["value/engine"].oilLifePercent);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		// Новые вычисляемые свойства для скорости
		// const currentSpeed = computed((): number => store.getters["value/engine"].speed);
		// const averageSpeed = computed((): number => store.getters["value/engine"].speedAVG);

		watch(enabled, (val: boolean): void =>
		{
			if (!val) canbus.query(store.getters["config/engine"], true);
		});

		const menu = computed((): IMenuItem[] =>
		{
			const result: IMenuItem[] = [
				{ id: 1, title: t("onboard.engine.settings.menu") },
				{
					id: 10,
					title: t("onboard.engine.enabled.menu"),
					view: store.getters["view/engine"].enabled,
					disabled: !engineViewLoaded.value
				},
				{
					id: 11,
					title: t("onboard.engine.RPM.menu"),
					view: store.getters["view/engine"].rpm,
					disabled: !engineViewLoaded.value
				},
				{
					id: 12,
					title: t("onboard.engine.countRPM.menu"),
					view: store.getters["view/engine"].totalCountRPM,
					disabled: !engineViewLoaded.value
				},
				{
					id: 13,
					title: t("onboard.engine.load.menu"),
					view: store.getters["view/engine"].load,
					disabled: !engineViewLoaded.value
				},
				{
					id: 14,
					title: t("onboard.engine.worktime.menu"),
					view: store.getters["view/engine"].totalWorktime,
					disabled: !engineViewLoaded.value
				},
				{
					id: 15,
					title: t("onboard.engine.throttle.menu"),
					view: store.getters["view/engine"].throttle,
					disabled: !engineViewLoaded.value
				},
				{
					id: 16,
					title: t("onboard.engine.coolant.menu"),
					view: store.getters["view/engine"].coolant,
					disabled: !engineViewLoaded.value
				}
			];

			if (hasOilFeatures.value)
			{
				result.splice(1, 0, { id: 2, title: t("onboard.engine.oilSettings.menu") });
				result.push(
					{
						id: 17,
						title: t("onboard.engine.oilLifePercent.menu"),
						view: store.getters["view/engine"].oilLifePercent,
						disabled: !engineViewLoaded.value
					},
					{
						id: 18,
						title: t("onboard.engine.oilLifeDistance.menu"),
						view: store.getters["view/engine"].oilLifeDistance,
						disabled: !engineViewLoaded.value
					}
				);
			}
			return result;
		});
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const engineConfigVisible = ref(false);
		const engineOilConfigVisible = ref(false);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			if (item.id === 1) engineConfigVisible.value = true;
			else if (item.id === 2) engineOilConfigVisible.value = true;
			else
			{
				menuVisible.value = true;
				menuSelected.value = item;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {any} value Новые параметры отображения
		 */
		const onViewApply = (value: any): void =>
		{
			store.commit("view/setView", value);
		};

		/** Применить конфигурацию ДВС
		 * @param {any} value Новая конфигурация ДВС
		 */
		const onEngineConfigApply = (value: any): void =>
		{
			store.commit("config/setEngineConfig", {
				showDays: value.showDays,
				totalWorktime: BigInt(value.totalWorktime) * 60n,
				totalCountRPM: BigInt(value.totalCountRPM) * 1000n
			});
		};

		/** Применить конфигурацию масла ДВС
		 * @param {any} value Новая конфигурация ДВС
		 */
		const onEngineOilConfigApply = (value: any): void =>
		{
			store.commit("config/setEngineOilConfig", {
				oilDurationSec: value.oilDurationHours * 3600,
				oilDistanceMeters: value.oilDistanceKm * 1000,
				oilHoursLimit: value.oilHoursLimit
			});
		};

		/** Сбросить конфигурацию масла ДВС */
		const onEngineOilConfigReset = (): void =>
		{
			const action = new EngineAction();
			action.resetOilLife = true;
			canbus.query(action);
			canbus.query(store.getters["config/engine"], true);
		};

		/** Сбросить конфигурацию ДВС */
		const onEngineConfigReset = (): void =>
		{
			const action = new EngineAction();
			action.resetWorktime = true;
			action.resetCountRPM = true;
			canbus.query(action);
			canbus.query(store.getters["config/engine"], true);
		};

		return {
			engineConfigLoaded,
			engineValueLoaded,
			engineViewLoaded,
			hasOilFeatures,
			enabled,
			rpm,
			countRPM,
			load,
			worktime,
			throttle,
			coolant,
			distanceLeftKm,
			oilLifePercent,
			showDays,
			totalWorktime,
			totalCountRPM,
			oilDurationHours,
			oilDistanceKm,
			oilHoursLimit,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			engineConfigVisible,
			engineOilConfigVisible,
			onMenuClick,
			onViewApply,
			onEngineConfigApply,
			onEngineOilConfigApply,
			onEngineOilConfigReset,
			onEngineConfigReset
		};
	}
};
</script>

<style lang="scss" scoped>
.settings-card {
	&__mode-title {
		text-transform: uppercase;
		color: $success;
	}
}
</style>
