<template>
	<card class="engine-card" :title="$t('onboard.engine.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[enabled]"
						:title="$t('onboard.engine.enabled.title')"
						:description="$t('onboard.engine.enabled.description')"
						:icon-name="['start-stop']"
						:nodata="!isLoadedValue"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="rpm"
						:title="$t('onboard.engine.RPM.title')"
						:description="$t('onboard.engine.RPM.description')"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="countRPM"
						:title="$t('onboard.engine.countRPM.title')"
						:description="$t('onboard.engine.countRPM.description')"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="worktime"
						:title="$t('onboard.engine.worktime.title')"
						:description="$t('onboard.engine.worktime.description')"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<progress-card-item
						:value="load"
						:title="$t('onboard.engine.load.title')"
						:description="$t('onboard.engine.load.description')"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<progress-card-item
						:value="throttle"
						:title="$t('onboard.engine.throttle.title')"
						:description="$t('onboard.engine.throttle.description')"
						:nodata="!enabled"
						:disabled="!isLoadedView"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="coolant"
						:title="$t('onboard.engine.coolant.title')"
						:description="$t('onboard.engine.coolant.description')"
						type="temperature"
						:nodata="!enabled"
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

	<engine-config-dialog v-model="settingsVisible" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import EngineConfigDialog from "./EngineConfigDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import { IViewConfig } from "@/models/pjcan/view";
import {
	API_VARIABLE_ENGINE_EVENT,
	API_VARIABLE_ENGINE_VIEW_EXEC,
	API_VARIABLE_ENGINE_VIEW_EVENT,
	IEngineValue,
	IEngineView
} from "@/models/pjcan/variables/engine";

import canbus from "@/api/canbus";

export default {
	name: "EngineCard",
	components: { Card, InputCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog, EngineConfigDialog },
	setup()
	{
		const { t } = useI18n();

		const isLoadedValue = ref(false);
		const isLoadedView = ref(false);

		const enabled = ref(false);
		const rpm = ref("");
		const countRPM = ref("");
		const load = ref(0);
		const worktime = ref("");
		const throttle = ref(0);
		const coolant = ref(0);

		/** Входящие значения ДВС */
		const onReceiveValue = (res: IEngineValue): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				enabled.value = res.enabled;
				rpm.value = res.rpm.toFixed();
				countRPM.value = res.viewCountRPM.toString();
				load.value = res.load / 1000;

				let wt = res.viewDays > 0 ? res.viewDays + "." : "";
				wt += (res.viewHours < 10 ? "0" : "") + res.viewHours + ":";
				wt += (res.viewMinutes < 10 ? "0" : "") + res.viewMinutes + ":";
				wt += (res.viewSeconds < 10 ? "0" : "") + res.viewSeconds;
				worktime.value = wt;

				throttle.value = res.throttle / 100;
				coolant.value = res.coolant;
			}
		};

		/** Входящие значения отображения ДВС */
		const onReceiveView = (res: IEngineView): void =>
		{
			isLoadedView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_VARIABLE_ENGINE_EVENT, onReceiveValue);
			canbus.addListener(API_VARIABLE_ENGINE_VIEW_EVENT, onReceiveView);
			onReceiveValue(canbus.values.variable.engine);
			onReceiveView(canbus.views.variable.engine);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_VARIABLE_ENGINE_EVENT, onReceiveValue);
			canbus.removeListener(API_VARIABLE_ENGINE_VIEW_EVENT, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [
			{ id: 10, title: t("onboard.engine.settings.menu") },
			{ id: 0, title: t("onboard.engine.enabled.menu") },
			{ id: 1, title: t("onboard.engine.RPM.menu") },
			{ id: 2, title: t("onboard.engine.countRPM.menu") },
			{ id: 3, title: t("onboard.engine.load.menu") },
			{ id: 4, title: t("onboard.engine.worktime.menu") },
			{ id: 5, title: t("onboard.engine.throttle.menu") },
			{ id: 6, title: t("onboard.engine.coolant.menu") }
		]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);
		const settingsVisible = ref(false);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			if (item.id < 10)
			{
				menuVisible.value = true;
				menuSelected.value = item;

				const { engine } = canbus.views.variable;
				switch (item.id)
				{
					case 0:
						menuViewConfig.value = engine.enabled;
						return;

					case 1:
						menuViewConfig.value = engine.rpm;
						break;

					case 2:
						menuViewConfig.value = engine.totalCountRPM;
						break;

					case 3:
						menuViewConfig.value = engine.load;
						break;

					case 4:
						menuViewConfig.value = engine.totalSeconds;
						break;

					case 5:
						menuViewConfig.value = engine.throttle;
						break;

					case 6:
						menuViewConfig.value = engine.coolant;
						break;
				}
			}
			else
			{
				settingsVisible.value = true;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { engine } = canbus.views.variable;
			switch (menuSelected.value.id)
			{
				case 0:
					engine.enabled = data;
					break;

				case 1:
					engine.rpm = data;
					break;

				case 2:
					engine.totalCountRPM = data;
					break;

				case 3:
					engine.load = data;
					break;

				case 4:
					engine.totalSeconds = data;
					break;

				case 5:
					engine.throttle = data;
					break;

				case 6:
					engine.coolant = data;
					break;
			}
			canbus.queryView(API_VARIABLE_ENGINE_VIEW_EXEC);
		};

		return {
			isLoadedValue,
			isLoadedView,
			enabled,
			rpm,
			countRPM,
			load,
			worktime,
			throttle,
			coolant,
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			settingsVisible,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
