<template>
	<card class="fuel-card" :title="$t('onboard.fuel.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<input-card-item
						:value="current"
						:title="$t('onboard.fuel.current.title')"
						:description="$t('onboard.fuel.current.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="avg"
						:title="$t('onboard.fuel.avg.title')"
						:description="$t('onboard.fuel.avg.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="total"
						:title="$t('onboard.fuel.total.title')"
						:description="$t('onboard.fuel.total.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="consumption"
						:title="$t('onboard.fuel.consumption.title')"
						:description="$t('onboard.fuel.consumption.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
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
		:disabled="!isLoadedView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { $t } from "@/lang";

import canbus, { API_EVENT_VARIABLE_FUEL, API_EVENT_VARIABLE_FUEL_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IFuelValue, IFuelView } from "@/models/pjcan/variables/fuel";

export default {
	name: "FuelCard",
	components: { Card, InputCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedValue = ref(false);
		const isLoadedView = ref(false);

		const current = ref("");
		const avg = ref("");
		const total = ref("");
		const consumption = ref("");

		/** Входящие значения расхода топлива */
		const onReceiveValue = (res: IFuelValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				current.value = res.current.toFixed(1);
				avg.value = res.avg.toFixed(1);
				total.value = res.total.toFixed(2);
				consumption.value = res.consumption.toFixed(2);
			}
		};

		/** Входящие значения отображения расхода топлива */
		const onReceiveView = (res: IFuelView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
			onReceiveValue(canbus.values.variable.fuel);
			onReceiveView(canbus.views.variable.fuel);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			$t("onboard.fuel.current.menu"),
			$t("onboard.fuel.avg.menu"),
			$t("onboard.fuel.total.menu"),
			$t("onboard.fuel.consumption.menu")
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

			const { fuel } = canbus.views.variable;
			switch (data.index)
			{
				case 0:
					menuItem.value = fuel.current;
					return;

				case 1:
					menuItem.value = fuel.avg;
					break;

				case 2:
					menuItem.value = fuel.total;
					break;

				case 3:
					menuItem.value = fuel.consumption;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { fuel } = canbus.views.variable;
			switch (menuSelected.index)
			{
				case 0:
					fuel.current = data;
					break;

				case 1:
					fuel.avg = data;
					break;

				case 2:
					fuel.total = data;
					break;

				case 3:
					fuel.consumption = data;
					break;
			}
			canbus.queryViewsFuel();
		};

		return {
			isLoadedView,
			isLoadedValue,
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
