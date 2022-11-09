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
import { IEngineValue, IEngineView } from "@/models/pjcan/variables/engine";

export default {
	name: "EngineCard",
	components: { Card, InputCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog },
	setup()
	{
		const isLoadedValue = ref(false);
		const isLoadedView = ref(false);

		const enabled = ref(false);
		const rpm = ref("");
		const countRPM = ref("");
		const load = ref(0);
		const motors = ref(0);
		const throttle = ref(0);
		const coolant = ref(0);

		/** Входящие значения ДВС */
		const onReceiveValue = (res: IEngineValue): void =>
		{
			isLoadedValue.value = res.isData;
			enabled.value = res.enabled;
			rpm.value = res.rpm.toFixed();
			countRPM.value = res.countRPM.toFixed();
			load.value = res.load;
			motors.value = res.mseconds;
			throttle.value = res.throttle;
			coolant.value = res.coolant;
		};

		/** Входящие значения отображения ДВС */
		const onReceiveView = (res: IEngineView): void =>
		{
			isLoadedView.value = res.isData;
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

			const { engine } = canbus.views.variable;
			switch (data.index)
			{
				case 0:
					menuItem.value = engine.enabled;
					return;

				case 1:
					menuItem.value = engine.rpm;
					break;

				case 2:
					menuItem.value = engine.totalCountRPM;
					break;

				case 3:
					menuItem.value = engine.load;
					break;

				case 4:
					menuItem.value = engine.totalSeconds;
					break;

				case 5:
					menuItem.value = engine.throttle;
					break;

				case 6:
					menuItem.value = engine.coolant;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { engine } = canbus.views.variable;
			switch (menuSelected.index)
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
			canbus.send(engine);
		};

		return {
			isLoadedValue,
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
