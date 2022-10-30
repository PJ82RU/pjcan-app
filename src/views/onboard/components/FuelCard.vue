<template>
	<card class="fuel-card" :title="$t('onboard.fuel.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<input-card-item
						:value="current"
						:title="$t('onboard.fuel.current.title')"
						:description="$t('onboard.fuel.current.description')"
						:nodata="!isData"
						:disabled="!isLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="avg"
						:title="$t('onboard.fuel.avg.title')"
						:description="$t('onboard.fuel.avg.description')"
						:nodata="!isData"
						:disabled="!isLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="total"
						:title="$t('onboard.fuel.total.title')"
						:description="$t('onboard.fuel.total.description')"
						:nodata="!isData"
						:disabled="!isLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="consumption"
						:title="$t('onboard.fuel.consumption.title')"
						:description="$t('onboard.fuel.consumption.description')"
						:nodata="!isData"
						:disabled="!isLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuTitle"
		:enabled="menuItem.enabled"
		:type="menuItem.type"
		:time="menuItem.time"
		:disabled="!isLoaded"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import i18n from "@/lang";

import canbus, {
	API_EVENT_VARIABLE_FUEL, API_EVENT_VARIABLE_FUEL_VIEW
} from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { FuelValue, FuelView, IFuelValue } from "@/models/pjcan/variables/fuel";

export default {
	name: "FuelCard",
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog },
	setup()
	{
		// РАСХОД ТОПЛИВА

		const isLoaded = ref(false);
		const isData = ref(false);
		const fuelValue = ref(new FuelValue());
		const fuelView = new FuelView();

		// входящие значения расхода топлива
		const onReceiveValue = (res: IFuelValue): void =>
		{
			isData.value = true;
			fuelValue.value.setModel(res);
		};
		// входящие значения отображения расхода топлива
		const onReceiveView = (res: IFuelValue): void =>
		{
			isLoaded.value = true;
			fuelView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
		});

		const current = computed((): string => fuelValue.value.current.toFixed(1));
		const avg = computed((): string => fuelValue.value.avg.toFixed(1));
		const total = computed((): string => fuelValue.value.total.toFixed(2));
		const consumption = computed((): string => fuelValue.value.consumption.toFixed(2));

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			i18n.global.t("onboard.fuel.current.menu"),
			i18n.global.t("onboard.fuel.avg.menu"),
			i18n.global.t("onboard.fuel.total.menu"),
			i18n.global.t("onboard.fuel.consumption.menu")
		]);
		const menuVisible = ref(false);
		const menuTitle = ref("");
		const menuItem = ref({} as IViewConfig);

		let menuSelected = {} as IMenuItem;

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} data Выбранный пункт меню
		 */
		const onMenuClick = (data: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuTitle.value = data.item;
			menuSelected = data;
			switch (data.index)
			{
				case 0:
					menuItem.value = fuelView.current;
					return;

				case 1:
					menuItem.value = fuelView.avg;
					break;

				case 2:
					menuItem.value = fuelView.total;
					break;

				case 3:
					menuItem.value = fuelView.consumption;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			switch (menuSelected.index)
			{
				case 0:
					fuelView.current = data;
					break;

				case 1:
					fuelView.avg = data;
					break;

				case 2:
					fuelView.total = data;
					break;

				case 3:
					fuelView.consumption = data;
					break;
			}
			canbus.send(fuelView);
		};

		return {
			isLoaded,
			isData,
			current,
			avg,
			total,
			consumption,
			menu,
			menuVisible,
			menuTitle,
			menuItem,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
