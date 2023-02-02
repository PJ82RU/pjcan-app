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
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import ProgressCardItem from "@/components/cards/ProgressCardItem.vue";
import ViewSettingDialog from "./ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import canbus, { API_EVENT_VARIABLE_ENGINE, API_EVENT_VARIABLE_ENGINE_VIEW } from "@/api/canbus";

import { IViewConfig } from "@/models/pjcan/view";
import { API_EXEC_VARIABLE_ENGINE_VIEW, IEngineValue, IEngineView } from "@/models/pjcan/variables/engine";

export default {
	name: "EngineCard",
	components: { Card, InputCardItem, IconCardItem, ProgressCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

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
			if (res.isData)
			{
				enabled.value = res.enabled;
				rpm.value = res.rpm.toFixed();
				countRPM.value = (res.totalCountRPM / 1000).toFixed();
				load.value = res.load;
				motors.value = res.totalSeconds;
				throttle.value = res.throttle;
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
			canbus.addListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			canbus.addListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
			onReceiveValue(canbus.values.variable.engine);
			onReceiveView(canbus.views.variable.engine);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			canbus.removeListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: t("onboard.engine.enabled.menu") },
			{ id: 1, title: t("onboard.engine.RPM.menu") },
			{ id: 2, title: t("onboard.engine.countRPM.menu") },
			{ id: 3, title: t("onboard.engine.load.menu") },
			{ id: 4, title: t("onboard.engine.motors.menu") },
			{ id: 5, title: t("onboard.engine.throttle.menu") },
			{ id: 6, title: t("onboard.engine.coolant.menu") }
		]);
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
			canbus.queryView(API_EXEC_VARIABLE_ENGINE_VIEW);
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
			menuSelected,
			menuViewConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
