<template>
	<card class="lcd-card" :title="$t('options.lcd.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="enabled"
						:title="$t('options.lcd.enabled.title')"
						:description="$t('options.lcd.enabled.description')"
						color="success"
						:nodata="!loadedCarConfig"
						:disabled="!loadedCarConfig"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="logo"
						:label="$t('options.lcd.logo.title')"
						:hint="$t('options.lcd.logo.description')"
						variant="underlined"
						:disabled="!loadedCarConfig"
						persistent-hint
						dense
						@blur="onApplyCarConfig"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="hello"
						:label="$t('options.lcd.hello.title')"
						:hint="$t('options.lcd.hello.description')"
						variant="underlined"
						:disabled="!loadedCarConfig"
						persistent-hint
						dense
						@blur="onApplyCarConfig"
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
		:disabled="!loadedCarView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, nextTick, onMounted, onUnmounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/views/onboard/components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_CAR_CONFIG_EVENT,
	API_CAR_CONFIG_EXEC,
	API_CAR_VIEW_EVENT,
	API_CAR_VIEW_EXEC,
	ICarConfig,
	ICarView
} from "@/models/pjcan/car";
import { IViewConfig } from "@/models/pjcan/view";

import canbus from "@/api/canbus";

export default {
	name: "LcdCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const loadedCarConfig = ref(false);
		const loadedCarView = ref(false);
		const enabled = ref(false);
		const logo = ref("");
		const hello = ref("");
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);

		/**
		 * Проверка ввода
		 * @param {Ref<string>} input Объект ввода
		 * @param {number} max Максимальное количество символов
		 */
		const onInput = (input: Ref<string>, max: number): void =>
		{
			const { value } = input;
			const length = value.length;
			if (length > max) input.value = value.substring(0, max);
			else if (!/^[^а-яА-я]*$/.test(value)) input.value = value.substring(0, length - 1);
		};

		watch(enabled, (): void =>
		{
			nextTick(() => onApplyCarConfig());
		});
		watch(logo, (): void =>
		{
			nextTick(() => onInput(logo, 12));
		});
		watch(hello, (): void =>
		{
			nextTick(() => onInput(hello, 32));
		});

		/**
		 * Входящие настройки автомобиля
		 * @param {ICarConfig} res
		 */
		const onReceiveCarConfig = (res: ICarConfig): void =>
		{
			loadedCarConfig.value = res.isData;
			if (res.isData)
			{
				enabled.value = res.lcd;
				logo.value = res.logo;
				hello.value = res.hello;
			}
		};

		/** Применить новые значения конфигурации автомобиля */
		const onApplyCarConfig = (): void =>
		{
			const { car } = canbus.configs;
			car.lcd = enabled.value;
			car.logo = logo.value;
			car.hello = hello.value;
			canbus.queryConfig(API_CAR_CONFIG_EXEC);
		};

		/**
		 * Входящие значения отображения
		 * @param {ICarView} res
		 */
		const onReceiveCarView = (res: ICarView): void =>
		{
			loadedCarView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			canbus.addListener(API_CAR_VIEW_EVENT, onReceiveCarView);
			onReceiveCarConfig(canbus.configs.car);
			onReceiveCarView(canbus.views.car);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			canbus.removeListener(API_CAR_VIEW_EVENT, onReceiveCarView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: t("options.lcd.logo.menu") },
			{ id: 1, title: t("options.lcd.hello.menu") }
		]);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;

			const { car } = canbus.views;
			switch (item.id)
			{
				case 0:
					menuViewConfig.value = car.logo;
					return;

				case 1:
					menuViewConfig.value = car.hello;
					break;
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			const { car } = canbus.views;
			switch (menuSelected.value.id)
			{
				case 0:
					car.logo = data;
					break;

				case 1:
					car.hello = data;
					break;
			}
			canbus.queryView(API_CAR_VIEW_EXEC);
		};

		return {
			loadedCarConfig,
			loadedCarView,
			enabled,
			logo,
			hello,
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			onInput,
			onApplyCarConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
