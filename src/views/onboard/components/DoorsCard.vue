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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { IViewConfig } from "@/models/pjcan/view";

export default {
	name: "DoorsCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const doorsValueLoaded = computed((): boolean => store.getters["value/doors"].isData);
		const doorsViewLoaded = computed((): boolean => store.getters["view/doors"].isData);

		const doorFL = computed((): boolean => store.getters["value/doors"].frontLeft);
		const doorFR = computed((): boolean => store.getters["value/doors"].frontRight);
		const doorBL = computed((): boolean => store.getters["value/doors"].backLeft);
		const doorBR = computed((): boolean => store.getters["value/doors"].backRight);
		const trunk = computed((): boolean => store.getters["value/doors"].trunk);

		const menu = computed((): IMenuItem[] => [
			{ title: t("onboard.doors.menu"), view: store.getters["view/doors"], disabled: !doorsViewLoaded.value }
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
