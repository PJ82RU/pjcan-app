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
import { $t } from "@/lang";

import canbus, { API_EVENT_VARIABLE_DOORS, API_EVENT_VARIABLE_DOORS_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { IDoorsValue, IDoorsView } from "@/models/pjcan/variables/doors";

export default {
	name: "DoorsCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedView = ref(false);
		const isLoadedValue = ref(false);

		const doorFL = ref(false);
		const doorFR = ref(false);
		const doorBL = ref(false);
		const doorBR = ref(false);
		const trunk = ref(false);

		/** Входящие значения открытых дверей */
		const onReceiveValue = (res: IDoorsValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				doorFL.value = res.frontLeft;
				doorFR.value = res.frontRight;
				doorBL.value = res.backLeft;
				doorBR.value = res.backRight;
				trunk.value = res.trunk;
			}
		};
		/** Входящие значения отображения открытых дверей */
		const onReceiveView = (res: IDoorsView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
			onReceiveValue(canbus.variables.doors);
			onReceiveView(canbus.views.variable.doors);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [$t("onboard.doors.menu")]);
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
			menuItem.value = canbus.views.variable.doors.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.doors.view = data;
			canbus.send(canbus.views.variable.doors);
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
