<template>
	<card
		class="movement-card"
		:title="$t('onboard.movement.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<input-card-item
						:value="speed"
						:title="$t('onboard.movement.speed.title')"
						:description="$t('onboard.movement.speed.description')"
						:nodata="!isSpeed"
						:disabled="!movementViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="speedAVG"
						:title="$t('onboard.movement.speedAVG.title')"
						:description="$t('onboard.movement.speedAVG.description')"
						:nodata="!isSpeedAVG"
						:disabled="!movementViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="restWay"
						:title="$t('onboard.movement.restWay.title')"
						:description="$t('onboard.movement.restWay.description')"
						:nodata="!isRestWay"
						:disabled="!movementViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST"
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onMovementViewApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";
import { TCarModel } from "@/models/pjcan/mazda";

import { IViewConfig } from "@/models/pjcan/view";
import {
	API_MOVEMENT_VALUE_EVENT,
	API_MOVEMENT_VIEW_EVENT,
	IMovementValue,
	IMovementViews,
	MovementViews
} from "@/models/pjcan/movement";

import canbus from "@/api/canbus";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import store from "@/store";

export default {
	name: "MovementCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, InputCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const movementValueLoaded = ref(false);
		const movementViewLoaded = ref(false);

		const speed = ref("");
		const speedAVG = ref("");
		const restWay = ref("");
		const isSpeed = ref(false);
		const isSpeedAVG = ref(false);
		const isRestWay = ref(false);
		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		let movementViews: IMovementViews;

		const menu = computed((): IMenuItem[] => [
			{
				title: t("onboard.movement.speed.menu"),
				view: movementViews?.speed,
				disabled: !movementViewLoaded.value
			},
			{
				title: t("onboard.movement.speedAVG.menu"),
				view: movementViews?.speedAVG,
				disabled: !movementViewLoaded.value
			},
			{
				title: t("onboard.movement.restWay.menu"),
				view: movementViews?.restWay,
				disabled: !movementViewLoaded.value
			}
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
		const onMovementViewApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/** Входящие значения движения */
		const onMovementValueReceive = (res: IMovementValue): void =>
		{
			movementValueLoaded.value = res.isData;
			if (res.isData)
			{
				speed.value = (res.speed / 100).toFixed(2);
				speedAVG.value = res.speedAVG.toFixed(0);
				restWay.value = (res.restWay / 100).toFixed(2);
				isSpeed.value = res.speed > 0;
				isSpeedAVG.value = res.speedAVG > 0;
				isRestWay.value = res.restWay > 0;
			}
		};
		/** Входящие значения отображения движения */
		const onMovementViewReceive = (res: IMovementViews): void =>
		{
			movementViewLoaded.value = res.isData;
			movementViews = res;
		};

		const onBegin = (status: boolean): void =>
		{
			if (status) canbus.query(new MovementViews(), true);
		};
		onMounted(() =>
		{
			canbus.addListener(API_MOVEMENT_VALUE_EVENT, onMovementValueReceive);
			canbus.addListener(API_MOVEMENT_VIEW_EVENT, onMovementViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_MOVEMENT_VALUE_EVENT, onMovementValueReceive);
			canbus.removeListener(API_MOVEMENT_VIEW_EVENT, onMovementViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			movementViewLoaded,
			movementValueLoaded,
			speed,
			speedAVG,
			restWay,
			isSpeed,
			isSpeedAVG,
			isRestWay,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onMovementViewApply
		};
	}
};
</script>
