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
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="mute"
						:title="$t('onboard.volume.mute.title')"
						:description="$t('onboard.volume.mute.description')"
						color="warning"
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
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { $t } from "@/lang";

import canbus, { API_EVENT_VARIABLE_VOLUME, API_EVENT_VARIABLE_VOLUME_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IVolumeConfig, IVolumeView } from "@/models/pjcan/variables/volume";

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

		/** Исходящие значения звука */
		const onSend = () => canbus.send(canbus.configs.variable.volume);

		watch(mute, (val: boolean) =>
		{
			if (isLoadedValue.value && canbus.configs.variable.volume.mute !== val)
			{
				canbus.configs.variable.volume.mute = val;
				onSend();
			}
		});
		watch(volume, (val: number) =>
		{
			if (isLoadedValue.value && canbus.configs.variable.volume.volume !== val)
			{
				canbus.configs.variable.volume.volume = val;
				onSend();
			}
		});
		watch(max, (val: number) =>
		{
			if (isLoadedValue.value && canbus.configs.variable.volume.max !== val)
			{
				canbus.configs.variable.volume.max = val;
				onSend();
			}
		});

		/** Входящие значения звука */
		const onReceiveConfig = (res: IVolumeConfig): void =>
		{
			isLoadedValue.value = res.isData;
			mute.value = res.mute;
			volume.value = res.volume;
			max.value = res.max;
		};

		/** Входящие значения отображения звука */
		const onReceiveView = (res: IVolumeView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			canbus.addListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
			onReceiveConfig(canbus.configs.variable.volume);
			onReceiveView(canbus.views.variable.volume);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [$t("onboard.volume.menu")]);
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
			menuItem.value = canbus.views.variable.volume.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.volume.view = data;
			canbus.send(canbus.views.variable.volume);
		};

		return {
			isLoadedValue,
			isLoadedView,
			mute,
			volume,
			max,
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
