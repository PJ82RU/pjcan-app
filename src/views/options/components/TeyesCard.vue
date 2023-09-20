<template>
	<card class="teyes-card" :title="$t('options.teyes.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<v-select
						v-model="uartBaud"
						:label="$t('options.teyes.uartBaud.title')"
						:items="listUartBaud"
						:hint="$t('options.teyes.uartBaud.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!loadedTeyesConfig || typeof uartBaud !== 'number'"
					/>
				</v-col>
				<v-col v-if="carModel !== ECarModel.CAR_MODEL_MAZDA_CX9_REST" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="lcdShow"
						:title="$t('options.teyes.lcdShow.title')"
						:description="$t('options.teyes.lcdShow.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendButton"
						:title="$t('options.teyes.sendButton.title')"
						:description="$t('options.teyes.sendButton.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col
					v-if="carModel !== ECarModel.CAR_MODEL_MAZDA_CX9 && carModel !== ECarModel.CAR_MODEL_MAZDA_CX9_REST"
					cols="12"
					class="pt-0 pb-0"
				>
					<switch-card-item
						v-model="sendClimate"
						:title="$t('options.teyes.sendClimate.title')"
						:description="$t('options.teyes.sendClimate.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col v-if="carModel === ECarModel.CAR_MODEL_MAZDA3" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendDoors"
						:title="$t('options.teyes.sendDoors.title')"
						:description="$t('options.teyes.sendDoors.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="parseVolume"
						:title="$t('options.teyes.parseVolume.title')"
						:description="$t('options.teyes.parseVolume.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="receiveText"
						:title="$t('options.teyes.receiveText.title')"
						:description="$t('options.teyes.receiveText.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="receiveButtons"
						:title="$t('options.teyes.receiveButtons.title')"
						:description="$t('options.teyes.receiveButtons.description')"
						color="success"
						:nodata="!loadedTeyesConfig"
						:disabled="!loadedTeyesConfig"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<!--<v-col cols="12" class="pt-0 pb-0">-->
				<!--	<switch-card-item-->
				<!--		v-model="receiveClock"-->
				<!--		:title="$t('options.teyes.receiveClock.title')"-->
				<!--		:description="$t('options.teyes.receiveClock.description')"-->
				<!--		color="success"-->
				<!--		:nodata="!loadedTeyesConfig"-->
				<!--		:disabled="!loadedTeyesConfig"-->
				<!--		@change="onApplyTeyesConfig"-->
				<!--	/>-->
				<!--</v-col>-->
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:enabled="menuViewConfig.enabled"
		:type="menuViewConfig.type"
		:time="menuViewConfig.time"
		:disabled="!loadedTeyesView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/views/onboard/components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";
import { ECarModel } from "@/models/pjcan/car";

import {
	API_TEYES_CONFIG_EVENT,
	API_TEYES_CONFIG_EXEC,
	API_TEYES_VIEW_EVENT,
	API_TEYES_VIEW_EXEC,
	ITeyesConfig,
	ITeyesView
} from "@/models/pjcan/teyes";
import { IViewConfig } from "@/models/pjcan/view";

import canbus from "@/api/canbus";

export default {
	name: "TeyesCard",
	computed: {
		ECarModel()
		{
			return ECarModel;
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
		const { t, tm } = useI18n();

		const loadedTeyesConfig = ref(false);
		const loadedTeyesView = ref(false);
		const receiveClock = ref(false);
		const receiveButtons = ref(false);
		const receiveText = ref(false);
		const sendButton = ref(false);
		const sendClimate = ref(false);
		const sendDoors = ref(false);
		const parseVolume = ref(false);
		const lcdShow = ref(false);
		const uartBaud = ref(undefined as number | undefined);

		/** Список Uart Baud */
		const listUartBaud = computed((): object[] =>
		{
			const list: any = tm("options.teyes.uartBaud.list");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);

		watch(uartBaud, (val) =>
		{
			if (val && loadedTeyesConfig.value) onApplyTeyesConfig();
		});

		/**
		 * Входящая конфигурация Teyes
		 * @param {ITeyesConfig} res
		 */
		const onReceiveTeyesConfig = (res: ITeyesConfig): void =>
		{
			loadedTeyesConfig.value = res.isData;
			if (res.isData)
			{
				receiveClock.value = res.receiveClock;
				receiveButtons.value = res.receiveButtons;
				receiveText.value = res.receiveText;
				sendButton.value = res.sendButton;
				sendClimate.value = res.sendClimate;
				sendDoors.value = res.sendDoors;
				parseVolume.value = res.parseVolume;
				lcdShow.value = res.lcdShow;
				uartBaud.value = res.uartBaud;
			}
		};

		/** Применить новые значения конфигурации Teyes */
		const onApplyTeyesConfig = (): void =>
		{
			const { teyes } = canbus.configs;
			teyes.receiveClock = receiveClock.value;
			teyes.receiveButtons = receiveButtons.value;
			teyes.receiveText = receiveText.value;
			teyes.sendButton = sendButton.value;
			teyes.sendClimate = sendClimate.value;
			teyes.sendDoors = sendDoors.value;
			teyes.parseVolume = parseVolume.value;
			teyes.lcdShow = lcdShow.value;
			teyes.uartBaud = uartBaud.value;
			canbus.queryConfig(API_TEYES_CONFIG_EXEC);
		};

		/**
		 * Входящие значения отображения
		 * @param {ITeyesView} res
		 */
		const onReceiveTeyesView = (res: ITeyesView): void =>
		{
			loadedTeyesView.value = res.isData;
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_TEYES_CONFIG_EVENT, onReceiveTeyesConfig);
			canbus.addListener(API_TEYES_VIEW_EVENT, onReceiveTeyesView);
			onReceiveTeyesConfig(canbus.configs.teyes);
			onReceiveTeyesView(canbus.views.teyes);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_TEYES_CONFIG_EVENT, onReceiveTeyesConfig);
			canbus.removeListener(API_TEYES_VIEW_EVENT, onReceiveTeyesView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [{ id: 0, title: t("options.teyes.lcdShow.menu") }]);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
			menuViewConfig.value = canbus.views.teyes.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.teyes.view = data;
			canbus.queryView(API_TEYES_VIEW_EXEC);
		};

		return {
			loadedTeyesConfig,
			loadedTeyesView,
			receiveClock,
			receiveButtons,
			receiveText,
			sendButton,
			sendClimate,
			sendDoors,
			parseVolume,
			lcdShow,
			uartBaud,
			listUartBaud,
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			onApplyTeyesConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
