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
import { computed, ref } from "vue";
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
import { IFuelConfig } from "@/models/pjcan/fuel";

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

		const fuelConfigLoaded = computed((): boolean => store.getters["config/fuel"].isData);
		const fuelValueLoaded = computed((): boolean => store.getters["value/fuel"].isData);
		const fuelViewLoaded = computed((): boolean => store.getters["view/fuel"].isData);

		const ratio = computed((): number => store.getters["config/fuel"].ratio / 1000);
		const current = computed((): string => (store.getters["value/fuel"].current / 10).toFixed(1));
		const avg = computed((): string => (store.getters["value/fuel"].avg / 10).toFixed(1));
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.fuel.settings.menu"), disabled: !fuelConfigLoaded.value },
			{
				title: t("onboard.fuel.current.menu"),
				view: store.getters["view/fuel"].current,
				disabled: !fuelViewLoaded.value
			},
			{ title: t("onboard.fuel.avg.menu"), view: store.getters["view/fuel"].avg, disabled: !fuelViewLoaded.value }
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

		/** Применить конфигурацию расхода
		 * @param {IFuelConfig} data Новая конфигурация расхода
		 * */
		const onFuelConfigApply = (data: IFuelConfig): void =>
		{
			canbus.query(data);
		};

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
