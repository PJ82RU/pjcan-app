<template>
	<card class="doors-card" :title="$t('onboard.doors.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<switch-card-item
						:model-value="doorFL"
						:title="$t('onboard.doors.doorFL.title')"
						:description="$t('onboard.doors.doorFL.description')"
						color="error"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorFR"
						:title="$t('onboard.doors.doorFR.title')"
						:description="$t('onboard.doors.doorFR.description')"
						color="error"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorBL"
						:title="$t('onboard.doors.doorBL.title')"
						:description="$t('onboard.doors.doorBL.description')"
						color="error"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorBR"
						:title="$t('onboard.doors.doorBR.title')"
						:description="$t('onboard.doors.doorBR.description')"
						color="error"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="trunk"
						:title="$t('onboard.doors.trunk.title')"
						:description="$t('onboard.doors.trunk.description')"
						color="error"
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
import i18n from "@/lang";

import canbus, { API_EVENT_VARIABLE_DOORS, API_EVENT_VARIABLE_DOORS_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { DoorsValue, DoorsView, IDoorsValue, IDoorsView } from "@/models/pjcan/variables/doors";

export default {
	name: "DoorsCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		// ПАРАМЕТРЫ ОТКРЫТЫХ ДВЕРЕЙ

		const isLoadedView = ref(false);
		const isLoadedValue = ref(false);

		const doorsValue = ref(new DoorsValue());
		const doorsView = new DoorsView();

		// входящие значения открытых дверей
		const onReceiveValue = (res: IDoorsValue): void =>
		{
			isLoadedValue.value = true;
			doorsValue.value.setModel(res);
		};
		// входящие значения отображения открытых дверей
		const onReceiveView = (res: IDoorsView): void =>
		{
			isLoadedView.value = true;
			doorsView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
		});

		const doorFL = computed((): boolean => doorsValue.value.frontLeft);
		const doorFR = computed((): boolean => doorsValue.value.frontRight);
		const doorBL = computed((): boolean => doorsValue.value.backLeft);
		const doorBR = computed((): boolean => doorsValue.value.backRight);
		const trunk = computed((): boolean => doorsValue.value.trunk);

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [i18n.global.t("onboard.doors.menu")]);
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
			menuItem.value = doorsView.doors;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			doorsView.doors = data;
			canbus.send(doorsView);
		};

		return {
			isLoadedView,
			isLoadedValue,
			doorFL,
			doorFR,
			doorBL,
			doorBR,
			trunk,
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
