<template>
	<card
		class="fuel-card"
		:title="$t('onboard.fuel.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<input-card-item
						:value="current"
						:title="$t('onboard.fuel.current.title')"
						:description="$t('onboard.fuel.current.description')"
						:nodata="!fuelValueLoaded || Number(current) <= 0"
						:disabled="!fuelViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="avg"
						:title="$t('onboard.fuel.avg.title')"
						:description="$t('onboard.fuel.avg.description')"
						:nodata="!fuelValueLoaded || Number(avg) <= 0"
						:disabled="!fuelViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST"
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onFuelViewApply"
	/>

	<fuel-config-dialog
		v-model="fuelConfigVisible"
		:ratio="ratio"
		:disabled="!fuelConfigLoaded"
		@click:apply="onFuelConfigApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "../../../components/ViewSettingDialog.vue";
import FuelConfigDialog from "./FuelConfigDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { TCarModel } from "@/models/pjcan/mazda";
import { IViewConfig } from "@/models/pjcan/view";
import {
	API_FUEL_CONFIG_EVENT,
	API_FUEL_CONFIG_EXEC,
	API_FUEL_VALUE_EVENT,
	API_FUEL_VIEW_EVENT,
	API_FUEL_VIEW_EXEC,
	FuelConfig,
	IFuelConfig,
	IFuelValue,
	IFuelViews
} from "@/models/pjcan/fuel";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { ChoiceValue } from "@/models/pjcan/choice";

export default {
	name: "FuelCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, InputCardItem, ViewSettingDialog, FuelConfigDialog },
	setup()
	{
		const { t } = useI18n();

		const fuelConfigLoaded = ref(false);
		const fuelValueLoaded = ref(false);
		const fuelViewLoaded = ref(false);

		const current = ref("");
		const avg = ref("");
		const ratio = ref(1);
		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		let fuelViews: IFuelViews;

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.fuel.settings.menu"), disabled: !fuelConfigLoaded.value },
			{ title: t("onboard.fuel.current.menu"), view: fuelViews?.current, disabled: !fuelViewLoaded.value },
			{ title: t("onboard.fuel.avg.menu"), view: fuelViews?.avg, disabled: !fuelViewLoaded.value }
		]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const fuelConfigVisible = ref(false);

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
			else fuelConfigVisible.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onFuelViewApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/** Применить конфигурацию расхода */
		const onFuelConfigApply = (res: any): void =>
		{
			const config = new FuelConfig();
			config.ratio = (res?.ratio ?? ratio.value) * 1000;
			canbus.query(config);
		};

		/** Входящие конфигурации расхода топлива */
		const onFuelConfigReceive = (res: IFuelConfig): void =>
		{
			fuelConfigLoaded.value = res.isData;
			if (res.isData) ratio.value = res.ratio / 1000;
		};
		/** Входящие значения расхода топлива */
		const onFuelValueReceive = (res: IFuelValue): void =>
		{
			fuelValueLoaded.value = res.isData;
			if (res.isData)
			{
				current.value = (res.current / 10).toFixed(1);
				avg.value = (res.avg / 10).toFixed(1);
			}
		};
		/** Входящие значения отображения расхода топлива */
		const onFuelViewReceive = (res: IFuelViews): void =>
		{
			fuelViewLoaded.value = res.isData;
			fuelViews = res;
		};

		const choiceId = Math.round(Math.random() * 1000000);
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.id = choiceId;
				choice.listID = [API_FUEL_CONFIG_EXEC, API_FUEL_VIEW_EXEC];
				canbus.query(choice, true);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_FUEL_CONFIG_EVENT, onFuelConfigReceive);
			canbus.addListener(API_FUEL_VALUE_EVENT, onFuelValueReceive);
			canbus.addListener(API_FUEL_VIEW_EVENT, onFuelViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_FUEL_CONFIG_EVENT, onFuelConfigReceive);
			canbus.removeListener(API_FUEL_VALUE_EVENT, onFuelValueReceive);
			canbus.removeListener(API_FUEL_VIEW_EVENT, onFuelViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			fuelConfigLoaded,
			fuelViewLoaded,
			fuelValueLoaded,
			current,
			avg,
			ratio,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			fuelConfigVisible,
			onMenuClick,
			onFuelViewApply,
			onFuelConfigApply
		};
	}
};
</script>
