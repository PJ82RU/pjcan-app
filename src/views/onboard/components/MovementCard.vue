<template>
	<card class="movement-card" :title="$t('onboard.movement.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<input-card-item
						:value="speed"
						:title="$t('onboard.movement.speed.title')"
						:description="$t('onboard.movement.speed.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="speedAVG"
						:title="$t('onboard.movement.speedAVG.title')"
						:description="$t('onboard.movement.speedAVG.description')"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="restWay"
						:title="$t('onboard.movement.restWay.title')"
						:description="$t('onboard.movement.restWay.description')"
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

import canbus, { API_EVENT_VARIABLE_MOVEMENT, API_EVENT_VARIABLE_MOVEMENT_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IMovementValue, IMovementView } from "@/models/pjcan/variables/movement";

export default {
	name: "MovementCard",
	components: { Card, InputCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedView = ref(false);
		const isLoadedValue = ref(false);

		const speed = ref("");
		const speedAVG = ref("");
		const restWay = ref("");

		/** Входящие значения движения */
		const onReceiveValue = (res: IMovementValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				speed.value = res.speed.toFixed(2);
				speedAVG.value = res.speedAVG.toString();
				restWay.value = res.restWay.toFixed(2);
			}
		};

		/** Входящие значения отображения движения */
		const onReceiveView = (res: IMovementView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_MOVEMENT, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_MOVEMENT_VIEW, onReceiveView);
			onReceiveValue(canbus.values.variable.movement);
			onReceiveView(canbus.views.variable.movement);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_MOVEMENT, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_MOVEMENT_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			$t("onboard.movement.speed.menu"),
			$t("onboard.movement.speedAVG.menu"),
			$t("onboard.movement.restWay.menu")
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

			const { movement } = canbus.views.variable;
			switch (data.index)
			{
				case 0:
					menuItem.value = movement.speed;
					return;

				case 1:
					menuItem.value = movement.speedAVG;
					break;

				case 2:
					menuItem.value = movement.restWay;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { movement } = canbus.views.variable;
			switch (menuSelected.index)
			{
				case 0:
					movement.speed = data;
					break;

				case 1:
					movement.speedAVG = data;
					break;

				case 2:
					movement.restWay = data;
					break;
			}
			canbus.queryViewsMovement();
		};

		return {
			isLoadedView,
			isLoadedValue,
			speed,
			speedAVG,
			restWay,
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
