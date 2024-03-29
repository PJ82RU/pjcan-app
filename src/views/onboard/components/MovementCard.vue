<template>
	<card
		class="movement-card"
		:title="$t('onboard.movement.title')"
		:menu="carModel !== ECarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
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
						:nodata="!isSpeedAVG"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="restWay"
						:title="$t('onboard.movement.restWay.title')"
						:description="$t('onboard.movement.restWay.description')"
						:nodata="!isRestWay"
						:disabled="!isLoadedView"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
        v-if="carModel !== ECarModel.CAR_MODEL_MAZDA_CX9_REST"
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
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";
import { ECarModel } from "@/models/pjcan/car";

import { IViewConfig } from "@/models/pjcan/view";
import {
	API_VARIABLE_MOVEMENT_EVENT,
	API_VARIABLE_MOVEMENT_VIEW_EVENT,
	API_VARIABLE_MOVEMENT_VIEW_EXEC,
	IMovementValue,
	IMovementView
} from "@/models/pjcan/variables/movement";

import canbus from "@/api/canbus";

export default {
	name: "MovementCard",
	computed: {
		ECarModel()
		{
			return ECarModel;
		}
	},
	components: { Card, InputCardItem, ViewSettingDialog },
	props: {
		carModel: {
			type: Number,
			default: 0
		}
	},
	setup()
	{
		const { t } = useI18n();

		const isLoadedView = ref(false);
		const isLoadedValue = ref(false);

		const speed = ref("");
		const speedAVG = ref("");
		const restWay = ref("");

		const isSpeedAVG = computed(() => isLoadedValue.value && canbus.values.variable.movement.speedAVG > 0);
		const isRestWay = computed(() => isLoadedValue.value && canbus.values.variable.movement.restWay > 0);

		/** Входящие значения движения */
		const onReceiveValue = (res: IMovementValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				speed.value = (res.speed / 100).toFixed(2);
				speedAVG.value = res.speedAVG.toFixed(0);
				restWay.value = (res.restWay / 100).toFixed(2);
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
			canbus.addListener(API_VARIABLE_MOVEMENT_EVENT, onReceiveValue);
			canbus.addListener(API_VARIABLE_MOVEMENT_VIEW_EVENT, onReceiveView);
			onReceiveValue(canbus.values.variable.movement);
			onReceiveView(canbus.views.variable.movement);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_VARIABLE_MOVEMENT_EVENT, onReceiveValue);
			canbus.removeListener(API_VARIABLE_MOVEMENT_VIEW_EVENT, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: t("onboard.movement.speed.menu") },
			{ id: 1, title: t("onboard.movement.speedAVG.menu") },
			{ id: 2, title: t("onboard.movement.restWay.menu") }
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
			canbus.queryView(API_VARIABLE_MOVEMENT_VIEW_EXEC);
		};

		return {
			isLoadedView,
			isLoadedValue,
			isSpeedAVG,
			isRestWay,
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
