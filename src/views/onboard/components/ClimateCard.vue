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
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="autoMode"
						:title="$t('onboard.climate.autoMode.title')"
						:description="$t('onboard.climate.autoMode.description')"
						color="success"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="ac"
						:title="$t('onboard.climate.ac.title')"
						:description="$t('onboard.climate.ac.description')"
						color="success"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.climate.temperature.title')"
						:description="$t('onboard.climate.temperature.description')"
						type="temperature"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[airEnabled]"
						:title="$t('onboard.climate.air.title')"
						:description="$t('onboard.climate.air.description')"
						:icon-name="[airName]"
						:nodata="!isLoadedValue"
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
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:enabled="menuViewConfig.enabled"
		:type="menuViewConfig.type"
		:time="menuViewConfig.time"
		:disabled="!isLoadedView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { $t } from "@/lang";

import canbus, { API_EVENT_VARIABLE_CLIMATE, API_EVENT_VARIABLE_CLIMATE_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IViewConfig } from "@/models/pjcan/view";
import { IClimateValue, IClimateView, TAir } from "@/models/pjcan/variables/climate";
import { IMenuItem } from "@/components/MenuDots.vue";

export default {
	name: "ClimateCard",
	components: { Card, InputCardItem, IconCardItem, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedValue = ref(false);
		const isLoadedView = ref(false);

		const enabled = ref(false);
		const autoMode = ref(false);
		const ac = ref(false);
		const temperature = ref(0);
		const airEnabled = ref(false);
		const airName = ref("");
		const blowEnabled = ref(false);
		const blowName = ref("");
		const blowWindshield = ref(false);
		const speedRotation = ref(0);

		/** Входящие значения климат-контроля */
		const onReceiveValue = (res: IClimateValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				enabled.value = res.enabled;
				autoMode.value = res.automode;
				ac.value = res.ac;
				temperature.value = res.temperature;
				airEnabled.value = res.airType !== TAir.AIR_NONE;
				airName.value = res.airType === TAir.AIR_STREET ? "air-fresh" : "air-cabin";
				blowEnabled.value = res.airDBody || res.airDLegs;
				blowName.value =
					res.airDLegs && res.airDBody
						? "blow-feet-body"
						: res.airDLegs
							? "blow-feet"
							: res.airDBody
								? "blow-body"
								: "blow-none";
				blowWindshield.value = res.airDWindshield;
				speedRotation.value = res.airRate > 0 ? res.airRate + 2 : 0;
			}
		};

		/** Входящие значения отображения климат-контроля */
		const onReceiveView = (res: IClimateView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
			onReceiveValue(canbus.values.variable.climate);
			onReceiveView(canbus.views.variable.climate);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [{ id: 0, title: $t("onboard.climate.menu") }]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
			menuViewConfig.value = canbus.views.variable.climate.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.climate.view = data;
			canbus.queryViewsClimate();
		};

		return {
			isLoadedValue,
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
			menuSelected,
			menuViewConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
