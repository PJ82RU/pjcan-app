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

import canbus, { API_EVENT_VARIABLE_MOVEMENT, API_EVENT_VARIABLE_MOVEMENT_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IViewConfig } from "@/models/pjcan/view";
import { IMovementValue, IMovementView } from "@/models/pjcan/variables/movement";
import { IMenuItem } from "@/components/MenuDots.vue";

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

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: $t("onboard.movement.speed.menu") },
			{ id: 1, title: $t("onboard.movement.speedAVG.menu") },
			{ id: 2, title: $t("onboard.movement.restWay.menu") }
		]);
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

			const { movement } = canbus.views.variable;
			switch (item.id)
			{
				case 0:
					menuViewConfig.value = movement.speed;
					return;

				case 1:
					menuViewConfig.value = movement.speedAVG;
					break;

				case 2:
					menuViewConfig.value = movement.restWay;
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
			switch (menuSelected.value.id)
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
			menuSelected,
			menuViewConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
