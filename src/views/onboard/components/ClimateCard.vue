<template>
	<card class="climate-card" :title="$t('onboard.climate.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[enabled]"
						:title="$t('onboard.climate.enabled.title')"
						:description="$t('onboard.climate.enabled.description')"
						:icon-name="['climate']"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="autoMode"
						:title="$t('onboard.climate.autoMode.title')"
						:description="$t('onboard.climate.autoMode.description')"
						color="success"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="ac"
						:title="$t('onboard.climate.ac.title')"
						:description="$t('onboard.climate.ac.description')"
						color="success"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.climate.temperature.title')"
						:description="$t('onboard.climate.temperature.description')"
						type="temperature"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[airEnabled]"
						:title="$t('onboard.climate.air.title')"
						:description="$t('onboard.climate.air.description')"
						:icon-name="[airName]"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[blowWindshield, blowEnabled]"
						:title="$t('onboard.climate.blow.title')"
						:description="$t('onboard.climate.blow.description')"
						:icon-name="['blow-windshield', blowName]"
						:margin="10"
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
import i18n from "@/lang";

import canbus, { API_EVENT_VARIABLE_CLIMATE, API_EVENT_VARIABLE_CLIMATE_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { ClimateValue, ClimateView, IClimateValue, IClimateView, TAir } from "@/models/pjcan/variables/climate";

export default {
	name: "ClimateCard",
	components: { Card, InputCardItem, IconCardItem, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		// КЛИМАТ-КОНТРОЛЬ

		const isLoadedView = ref(false);

		const climateValue = ref(new ClimateValue());
		const climateView = new ClimateView();

		// входящие значения климат-контроля
		const onReceiveValue = (res: IClimateValue): void =>
		{
			climateValue.value.setModel(res);
		};
		// входящие значения отображения климат-контроля
		const onReceiveView = (res: IClimateView): void =>
		{
			isLoadedView.value = true;
			climateView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
		});

		const enabled = computed((): boolean => climateValue.value.enabled);
		const autoMode = computed((): boolean => climateValue.value.automode);
		const ac = computed((): boolean => climateValue.value.ac);
		const temperature = computed((): number => climateValue.value.temperature);

		const airEnabled = computed((): boolean => climateValue.value.airType !== TAir.AIR_NONE);
		const airName = computed((): string =>
			climateValue.value.airType === TAir.AIR_STREET ? "air-fresh" : "air-cabin"
		);
		const blowEnabled = computed((): boolean => climateValue.value.airDBody || climateValue.value.airDLegs);
		const blowName = computed((): string =>
			climateValue.value.airDLegs && climateValue.value.airDBody
				? "blow-feet-body"
				: climateValue.value.airDLegs
					? "blow-feet"
					: climateValue.value.airDBody
						? "blow-body"
						: "blow-none"
		);
		const blowWindshield = computed((): boolean => climateValue.value.airDWindshield);
		const speedRotation = computed((): number =>
			climateValue.value.airRate > 0 ? climateValue.value.airRate + 2 : 0
		);

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [i18n.global.t("onboard.climate.menu")]);
		const menuVisible = ref(false);
		const menuTitle = ref("");
		const menuItem = ref({} as IViewConfig);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} data Выбранный пункт меню
		 */
		const onMenuClick = (data: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuTitle.value = data.item;
			menuItem.value = climateView.climate;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			climateView.climate = data;
			canbus.send(climateView);
		};

		return {
			isLoadedView,
			enabled,
			autoMode,
			ac,
			temperature,
			airEnabled,
			airName,
			blowEnabled,
			blowName,
			blowWindshield,
			speedRotation,
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
