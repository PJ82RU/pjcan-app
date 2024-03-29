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
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { IViewConfig } from "@/models/pjcan/view";
import {
	API_VARIABLE_DOORS_EVENT,
	API_VARIABLE_DOORS_VIEW_EXEC,
	API_VARIABLE_DOORS_VIEW_EVENT,
	IDoorsValue,
	IDoorsView
} from "@/models/pjcan/variables/doors";

import canbus from "@/api/canbus";

export default {
	name: "DoorsCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
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
			canbus.addListener(API_VARIABLE_DOORS_EVENT, onReceiveValue);
			canbus.addListener(API_VARIABLE_DOORS_VIEW_EVENT, onReceiveView);
			onReceiveValue(canbus.values.variable.doors);
			onReceiveView(canbus.views.variable.doors);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_VARIABLE_DOORS_EVENT, onReceiveValue);
			canbus.removeListener(API_VARIABLE_DOORS_VIEW_EVENT, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [{ id: 0, title: t("onboard.doors.menu") }]);
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
			menuViewConfig.value = canbus.views.variable.doors.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.doors.view = data;
			canbus.queryView(API_VARIABLE_DOORS_VIEW_EXEC);
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
			menuSelected,
			menuViewConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
