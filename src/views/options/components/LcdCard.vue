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
						:nodata="!mazdaConfigLoaded"
						:disabled="!mazdaConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="logo"
						:label="$t('options.lcd.logo.title')"
						:hint="$t('options.lcd.logo.description')"
						variant="underlined"
						:disabled="!mazdaConfigLoaded"
						persistent-hint
						dense
						@blur="onMazdaConfigApply"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="hello"
						:label="$t('options.lcd.hello.title')"
						:hint="$t('options.lcd.hello.description')"
						variant="underlined"
						:disabled="!mazdaConfigLoaded"
						persistent-hint
						dense
						@blur="onMazdaConfigApply"
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
		@click:apply="onMazdaViewApply"
	/>
</template>

<script lang="ts">
import { computed, nextTick, onMounted, onUnmounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/views/onboard/components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_MAZDA_CONFIG_EVENT,
	API_MAZDA_VIEW_EVENT,
	TCarModel,
	IMazdaConfig,
	API_MAZDA_VIEW_EXEC
} from "@/models/pjcan/mazda";
import { IViewConfig, ViewConfig } from "@/models/pjcan/view";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

export default {
	name: "LcdCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
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

		const mazdaConfigLoaded = ref(false);
		const mazdaViewLoaded = ref(false);

		const enabled = ref(false);
		const logo = ref("");
		const hello = ref("");
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);

		let mazdaView: IViewConfig;

		const menu = computed((): IMenuItem[] => [
			{ title: t("options.lcd.hello.menu"), view: mazdaView, disabled: !mazdaViewLoaded }
		]);

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
			nextTick(() => onMazdaConfigApply());
		});
		watch(logo, (): void =>
		{
			nextTick(() => onInput(logo, 12));
		});
		watch(hello, (): void =>
		{
			nextTick(() => onInput(hello, 32));
		});

		/** Применить новые значения конфигурации автомобиля */
		const onMazdaConfigApply = (): void =>
		{
			if (
				canbus.mazda.lcd !== enabled.value ||
				canbus.mazda.logo !== logo.value ||
				canbus.mazda.hello !== hello.value
			)
			{
				canbus.mazda.lcd = enabled.value;
				canbus.mazda.logo = logo.value;
				canbus.mazda.hello = hello.value;
				canbus.query(canbus.mazda);
			}
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onMazdaViewApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		/**
		 * Входящие настройки автомобиля
		 * @param {IMazdaConfig} res
		 */
		const onMazdaConfigReceive = (res: IMazdaConfig): void =>
		{
			mazdaConfigLoaded.value = res.isData;
			if (res.isData)
			{
				enabled.value = res.lcd;
				logo.value = res.logo;
				hello.value = res.hello;
			}
		};

		/**
		 * Входящие значения отображения
		 * @param {IViewConfig} res
		 */
		const onMazdaViewReceive = (res: IViewConfig): void =>
		{
			mazdaViewLoaded.value = res.isData;
			mazdaView = res;
		};

		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				onMazdaConfigReceive(canbus.mazda);
				canbus.query(new ViewConfig(API_MAZDA_VIEW_EXEC));
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_MAZDA_CONFIG_EVENT, onMazdaConfigReceive);
			canbus.addListener(API_MAZDA_VIEW_EVENT, onMazdaViewReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_MAZDA_CONFIG_EVENT, onMazdaConfigReceive);
			canbus.removeListener(API_MAZDA_VIEW_EVENT, onMazdaViewReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			mazdaConfigLoaded,
			mazdaViewLoaded,
			enabled,
			logo,
			hello,
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			onInput,
			onMazdaConfigApply,
			onMenuClick,
			onMazdaViewApply
		};
	}
};
</script>
