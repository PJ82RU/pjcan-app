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
						:rotation="rotation"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="autoMode"
						:title="$t('onboard.climate.autoMode.title')"
						:description="$t('onboard.climate.autoMode.description')"
						color="success"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="ac"
						:title="$t('onboard.climate.ac.title')"
						:description="$t('onboard.climate.ac.description')"
						color="success"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.climate.temperature.title')"
						:description="$t('onboard.climate.temperature.description')"
						type="temperature"
						:nodata="!climateValueLoaded || temperature <= 0"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[airEnabled]"
						:title="$t('onboard.climate.air.title')"
						:description="$t('onboard.climate.air.description')"
						:icon-name="[airIconName]"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[blowWindshield, blowEnabled]"
						:title="$t('onboard.climate.blow.title')"
						:description="$t('onboard.climate.blow.description')"
						:icon-name="['blow-windshield', blowName]"
						:margin="10"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
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
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { IViewConfig, ViewConfig } from "@/models/pjcan/view";
import {
	API_CLIMATE_VIEW_EXEC,
	API_CLIMATE_VIEW_EVENT,
	IClimateValue,
	API_CLIMATE_VALUE_EVENT
} from "@/models/pjcan/climate";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

export default {
	name: "ClimateCard",
	components: { Card, InputCardItem, IconCardItem, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const climateValueLoaded = ref(false);
		const climateViewLoaded = ref(false);

		const enabled = ref(false);
		const rotation = ref(0);
		const autoMode = ref(false);
		const ac = ref(false);
		const temperature = ref(0);
		const airEnabled = ref(false);
		const airIconName = ref("");
		const blowEnabled = ref(false);
		const blowName = ref("");
		const blowWindshield = ref(false);

		let climateView: IViewConfig;

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.climate.menu"), view: climateView, disabled: !climateViewLoaded.value }
		]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/** Входящие значения климат-контроля */
		const onClimateValueReceive = (res: IClimateValue): void =>
		{
			climateValueLoaded.value = res.isData;
			if (res.isData)
			{
				enabled.value = res.on;
				rotation.value = res.airRate > 0 && res.airRate < 8 ? 7 - res.airRate : 0;
				autoMode.value = res.automode;
				ac.value = res.ac;
				temperature.value = res.temperature > 0 ? res.temperature / 10 : 0;
				airEnabled.value = res.airInside || res.airOutside;
				airIconName.value = res.airInside ? "air-inside" : "air-outside";
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
			}
		};
		/** Входящие значения отображения климат-контроля */
		const onClimateViewReceive = (res: IViewConfig): void =>
		{
			climateViewLoaded.value = res.isData;
			climateView = res;
		};

		const onBegin = (status: boolean): void =>
		{
			if (status) canbus.query(new ViewConfig(API_CLIMATE_VIEW_EXEC), true);
		};
		onMounted(() =>
		{
			canbus.addListener(API_CLIMATE_VALUE_EVENT, onClimateValueReceive);
			canbus.addListener(API_CLIMATE_VIEW_EVENT, onClimateViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CLIMATE_VALUE_EVENT, onClimateValueReceive);
			canbus.removeListener(API_CLIMATE_VIEW_EVENT, onClimateViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			climateValueLoaded,
			climateViewLoaded,
			enabled,
			rotation,
			autoMode,
			ac,
			temperature,
			airEnabled,
			airIconName,
			blowEnabled,
			blowName,
			blowWindshield,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
