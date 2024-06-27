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
		@click:apply="onViewApply"
	/>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { TCarModel } from "@/models/pjcan/mazda";

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

		const movementValueLoaded = computed((): boolean => store.getters["value/movement"].isData);
		const movementViewLoaded = computed((): boolean => store.getters["view/movement"].isData);

		const speed = computed((): string => (store.getters["value/movement"].speed / 100).toFixed(2));
		const speedAVG = computed((): string => store.getters["value/movement"].speedAVG.toFixed(0));
		const restWay = computed((): string => (store.getters["value/movement"].restWay / 100).toFixed(0));
		const isSpeed = computed((): boolean => store.getters["value/engine"].on);
		const isSpeedAVG = computed((): boolean => store.getters["value/movement"].speedAVG > 0);
		const isRestWay = computed((): boolean => store.getters["value/movement"].restWay > 0);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const menu = computed((): IMenuItem[] => [
			{
				title: t("onboard.movement.speed.menu"),
				view: store.getters["view/movement"].speed,
				disabled: !movementViewLoaded.value
			},
			{
				title: t("onboard.movement.speedAVG.menu"),
				view: store.getters["view/movement"].speedAVG,
				disabled: !movementViewLoaded.value
			},
			{
				title: t("onboard.movement.restWay.menu"),
				view: store.getters["view/movement"].restWay,
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
         * @param {any} value Новые параметры отображения
         */
		const onViewApply = (value: any): void =>
		{
			store.commit("view/setView", value);
		};

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
			onViewApply
		};
	}
};
</script>
