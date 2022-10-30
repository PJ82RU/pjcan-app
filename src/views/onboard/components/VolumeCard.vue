<template>
	<card class="volume-card" :title="$t('onboard.volume.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<slider-card-item
						v-model="volume"
						:title="$t('onboard.volume.level.title')"
						:description="$t('onboard.volume.level.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="mute"
						:title="$t('onboard.volume.mute.title')"
						:description="$t('onboard.volume.mute.description')"
						color="warning"
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

import canbus, { API_EVENT_VARIABLE_VOLUME, API_EVENT_VARIABLE_VOLUME_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IVolumeConfig, IVolumeView, VolumeConfig, VolumeView } from "@/models/pjcan/variables/volume";

export default {
	name: "VolumeCard",
	components: { Card, SwitchCardItem, SliderCardItem, ViewSettingDialog },
	setup()
	{
		// ПАРАМЕТРЫ ЗВУКА

		const isLoadedView = ref(true);

		const volumeConfig = ref(new VolumeConfig());
		const volumeView = new VolumeView();

		// входящие значения звука
		const onReceiveConfig = (res: IVolumeConfig): void =>
		{
			volumeConfig.value.setModel(res);
		};
		// входящие значения отображения звука
		const onReceiveView = (res: IVolumeView): void =>
		{
			isLoadedView.value = true;
			volumeView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			canbus.addListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			canbus.removeListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});

		// исходящие значения звука
		const onSend = () => canbus.send(volumeConfig.value);
		const mute = computed({
			get: (): boolean => volumeConfig.value.mute,
			set: (val: boolean) =>
			{
				volumeConfig.value.mute = val;
				onSend();
			}
		});
		const volume = computed({
			get: (): number => volumeConfig.value.volume,
			set: (val: number) =>
			{
				volumeConfig.value.volume = val;
				onSend();
			}
		});
		const volumeMax = computed({
			get: (): number => volumeConfig.value.max,
			set: (val: number) =>
			{
				volumeConfig.value.max = val;
				onSend();
			}
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [i18n.global.t("onboard.volume.menu")]);
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
			menuItem.value = volumeView.volume;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			volumeView.volume = data;
			canbus.send(volumeView);
		};

		return {
			isLoadedView,
			mute,
			volume,
			volumeMax,
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
