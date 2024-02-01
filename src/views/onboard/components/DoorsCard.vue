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
						:nodata="!doorsValueLoaded"
						:disabled="!doorsViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorFR"
						:title="$t('onboard.doors.doorFR.title')"
						:description="$t('onboard.doors.doorFR.description')"
						color="error"
						:nodata="!doorsValueLoaded"
						:disabled="!doorsViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorBL"
						:title="$t('onboard.doors.doorBL.title')"
						:description="$t('onboard.doors.doorBL.description')"
						color="error"
						:nodata="!doorsValueLoaded"
						:disabled="!doorsViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="doorBR"
						:title="$t('onboard.doors.doorBR.title')"
						:description="$t('onboard.doors.doorBR.description')"
						color="error"
						:nodata="!doorsValueLoaded"
						:disabled="!doorsViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="trunk"
						:title="$t('onboard.doors.trunk.title')"
						:description="$t('onboard.doors.trunk.description')"
						color="error"
						:nodata="!doorsValueLoaded"
						:disabled="!doorsViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onDoorsViewApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "../../../components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { IViewConfig, ViewConfig } from "@/models/pjcan/view";
import { API_DOORS_VALUE_EVENT, API_DOORS_VIEW_EVENT, API_DOORS_VIEW_EXEC, IDoorsValue } from "@/models/pjcan/doors";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

export default {
	name: "DoorsCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const doorsValueLoaded = ref(false);
		const doorsViewLoaded = ref(false);

		const doorFL = ref(false);
		const doorFR = ref(false);
		const doorBL = ref(false);
		const doorBR = ref(false);
		const trunk = ref(false);

		let doorsView: IViewConfig;

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.doors.menu"), view: doorsView, disabled: !doorsViewLoaded.value }
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
		const onDoorsViewApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/** Входящие значения открытых дверей */
		const onDoorsValueReceive = (res: IDoorsValue): void =>
		{
			doorsValueLoaded.value = res.isData;
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
		const onDoorsViewReceive = (res: IViewConfig): void =>
		{
			doorsViewLoaded.value = res.isData;
			doorsView = res;
		};

		const onBegin = (status: boolean): void =>
		{
			if (status) canbus.query(new ViewConfig(API_DOORS_VIEW_EXEC), true);
		};
		onMounted(() =>
		{
			canbus.addListener(API_DOORS_VALUE_EVENT, onDoorsValueReceive);
			canbus.addListener(API_DOORS_VIEW_EVENT, onDoorsViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_DOORS_VALUE_EVENT, onDoorsValueReceive);
			canbus.removeListener(API_DOORS_VIEW_EVENT, onDoorsViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			doorsViewLoaded,
			doorsValueLoaded,
			doorFL,
			doorFR,
			doorBL,
			doorBR,
			trunk,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onDoorsViewApply
		};
	}
};
</script>
