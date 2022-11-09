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
						:value="motors"
						:title="$t('onboard.engine.motors.title')"
						:description="$t('onboard.engine.motors.description')"
						type="time"
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

import canbus, { API_EVENT_VARIABLE_ENGINE, API_EVENT_VARIABLE_ENGINE_VIEW } from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";

import { IMenuItem } from "@/models/IMenuItem";
import { IViewConfig } from "@/models/pjcan/view";
import { EngineValue, EngineView, IEngineValue, IEngineView } from "@/models/pjcan/variables/engine";

export default {
	name: "EngineCard",
	components: { Card, InputCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog },
	setup()
	{
		// ПАРАМЕТРЫ ДВС

		const isLoadedView = ref(false);

		const engineValue = ref(new EngineValue());
		const engineView = new EngineView();

		// входящие значения ДВС
		const onReceiveValue = (res: IEngineValue): void =>
		{
			engineValue.value.setModel(res);
		};
		// входящие значения отображения ДВС
		const onReceiveView = (res: IEngineView): void =>
		{
			isLoadedView.value = true;
			engineView.setModel(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
		});

		const enabled = computed((): boolean => engineValue.value.enabled);
		const rpm = computed((): string => engineValue.value.rpm.toFixed());
		const countRPM = computed((): string => engineValue.value.countRPM.toFixed());
		const load = computed((): number => engineValue.value.load);
		const motors = computed((): number => engineValue.value.mseconds);
		const throttle = computed((): number => engineValue.value.throttle);
		const coolant = computed((): number => engineValue.value.coolant);

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): string[] => [
			$t("onboard.engine.enabled.menu"),
			$t("onboard.engine.RPM.menu"),
			$t("onboard.engine.countRPM.menu"),
			$t("onboard.engine.load.menu"),
			$t("onboard.engine.motors.menu"),
			$t("onboard.engine.throttle.menu"),
			$t("onboard.engine.coolant.menu")
		]);
		const menuVisible = ref(false);
		const menuTitle = ref("");
		const menuItem = ref({} as IViewConfig);

		let menuSelected = {} as IMenuItem;

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} data Выбранный пункт меню
		 */
		const onMenuClick = (data: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuTitle.value = data.item;
			menuSelected = data;
			switch (data.index)
			{
				case 0:
					menuItem.value = engineView.enabled;
					return;

				case 1:
					menuItem.value = engineView.rpm;
					break;

				case 2:
					menuItem.value = engineView.totalCountRPM;
					break;

				case 3:
					menuItem.value = engineView.load;
					break;

				case 4:
					menuItem.value = engineView.totalSeconds;
					break;

				case 5:
					menuItem.value = engineView.throttle;
					break;

				case 6:
					menuItem.value = engineView.coolant;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			switch (menuSelected.index)
			{
				case 0:
					engineView.enabled = data;
					break;

				case 1:
					engineView.rpm = data;
					break;

				case 2:
					engineView.totalCountRPM = data;
					break;

				case 3:
					engineView.load = data;
					break;

				case 4:
					engineView.totalSeconds = data;
					break;

				case 5:
					engineView.throttle = data;
					break;

				case 6:
					engineView.coolant = data;
					break;
			}
			canbus.send(engineView);
		};

		return {
			isLoadedView,
			enabled,
			rpm,
			countRPM,
			load,
			motors,
			throttle,
			coolant,
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
