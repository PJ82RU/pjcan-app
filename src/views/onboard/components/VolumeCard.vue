<template>
	<card class="volume-card" :title="$t('onboard.volume.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<slider-card-item
						v-model="volume"
						:title="$t('onboard.volume.level.title')"
						:description="$t('onboard.volume.level.description')"
						:max="max"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<!--<v-col cols="12" class="pt-0 pb-0">-->
				<!--	<switch-card-item-->
				<!--		v-model="mute"-->
				<!--		:title="$t('onboard.volume.mute.title')"-->
				<!--		:description="$t('onboard.volume.mute.description')"-->
				<!--		color="warning"-->
				<!--		:nodata="!isLoadedValue"-->
				<!--		:disabled="!isLoadedView"-->
				<!--	/>-->
				<!--</v-col>-->
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
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { $t } from "@/lang";

import canbus, {
	API_EVENT_VARIABLE_VOLUME,
	API_EVENT_VARIABLE_VOLUME_CONFIG,
	API_EVENT_VARIABLE_VOLUME_VIEW
} from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IViewConfig } from "@/models/pjcan/view";
import { IVolumeConfig, IVolumeValue, IVolumeView } from "@/models/pjcan/variables/volume";
import { IMenuItem } from "@/components/MenuDots.vue";

export default {
	name: "VolumeCard",
	components: { Card, SwitchCardItem, SliderCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedValue = ref(false);
		const isLoadedView = ref(false);

		const mute = ref(false);
		const volume = ref(0);
		const max = ref(0);

		let queryValueVolumeDisabled: boolean = false;

		watch(mute, (val: boolean) =>
		{
			if (isLoadedValue.value && canbus.values.variable.volume.mute !== val)
			{
				canbus.values.variable.volume.mute = val;
				canbus.queryValueVolume();
			}
		});
		watch(volume, (val: number) =>
		{
			if (isLoadedValue.value && canbus.values.variable.volume.volume !== val)
			{
				canbus.values.variable.volume.volume = val;
				if (!queryValueVolumeDisabled)
				{
					queryValueVolumeDisabled = true;
					setTimeout(() =>
					{
						queryValueVolumeDisabled = false;
						canbus.queryValueVolume();
					}, 250);
					canbus.queryValueVolume();
				}
			}
		});
		// watch(max, (val: number) =>
		// {
		// 	if (isLoadedValue.value && canbus.configs.variable.volume.max !== val)
		// 	{
		// 		canbus.configs.variable.volume.max = val;
		// 	}
		// });

		/** Входящие значения звука */
		const onReceiveValue = (res: IVolumeValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				mute.value = res.mute;
				volume.value = res.volume;
			}
		};

		/** Входящие конфигурация звука */
		const onReceiveConfig = (res: IVolumeConfig): void =>
		{
			if (res.isData)
			{
				max.value = res.max;
			}
		};

		/** Входящие значения отображения звука */
		const onReceiveView = (res: IVolumeView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_VOLUME, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_VOLUME_CONFIG, onReceiveConfig);
			canbus.addListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
			onReceiveValue(canbus.values.variable.volume);
			onReceiveConfig(canbus.configs.variable.volume);
			onReceiveView(canbus.views.variable.volume);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME_CONFIG, onReceiveConfig);
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [{ id: 0, title: $t("onboard.volume.menu") }]);
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
			menuViewConfig.value = canbus.views.variable.volume.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.volume.view = data;
			canbus.queryViewsVolume();
		};

		return {
			isLoadedValue,
			isLoadedView,
			mute,
			volume,
			max,
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
