<template>
	<flicking ref="flicking" class="buttons" :options="{ bound: true, align: 'prev' }">
		<div v-for="(item, i) in buttons" :key="`buttons-${i}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card
				:class="`settings-card-${i}`"
				:title="list[i].title"
				v-model:in-r="item.inR"
				v-model:press-single="item.pressSingle"
				v-model:press-dual="item.pressDual"
				v-model:press-triple="item.pressTriple"
				v-model:press-hold="item.pressHold"
				v-model:release="item.release"
				:is-loaded-config="isLoadedConfig"
				:icon="list[i].icon"
				@change="onButtonConfigChange"
			/>
		</div>
	</flicking>

	<button-definition-dialog
		v-model="visibleButtonDefinitionDialog"
		:list="list"
		:resistance="resistanceButtonDefinition"
		:type="typeButtonDefinition"
		@click:apply="onButtonDefinitionApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

import canbus, { API_EVENT_BUTTON, API_EVENT_BUTTONS_CONFIG } from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";

import {
	API_EXEC_BUTTONS_CONFIG,
	IButtonsConfig,
	IButtonValue,
	TButtonItem,
	TButtonPress
} from "@/models/pjcan/button";
import { IButtonItem } from "@/models/interfaces/IButtonItem";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

export default {
	name: "buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog },
	setup()
	{
		const { name: display } = useDisplay();
		const { t } = useI18n();
		const flicking = ref(null);
		provide("flicking", flicking);

		const isLoadedConfig = ref(false);
		const visibleButtonDefinitionDialog = ref(false);
		const typeButtonDefinition = ref(-1);
		const resistanceButtonDefinition = ref(0);
		const buttons = ref([] as IButtonItem[]);

		/** Обновление списка конфигураций кнопок */
		const buttonItemsUpdate = (): void =>
		{
			canbus.configs.buttons.items?.forEach((x, i) =>
			{
				if (!buttons.value?.[i]) buttons.value.push({} as IButtonItem);
				const res = buttons.value[i];
				res.inR = x.inR;
				res.pressSingle = x.exec[TButtonPress.PRESS_SINGLE];
				res.pressDual = x.exec[TButtonPress.PRESS_DUAL];
				res.pressTriple = x.exec[TButtonPress.PRESS_TRIPLE];
				res.pressHold = x.exec[TButtonPress.PRESS_HOLD];
				res.release = x.exec[TButtonPress.RELEASE];
			});
		};
		buttonItemsUpdate();

		/** Список конфигураций кнопок */
		const list = computed((): IButtonCard[] => [
			{
				title: t("buttons.mode"),
				type: TButtonItem.BUTTON_MODE,
				icon: "mdi-menu"
			},
			{
				title: t("buttons.seekUp"),
				type: TButtonItem.BUTTON_SEEK_UP,
				icon: "mdi-play"
			},
			{
				title: t("buttons.seekDown"),
				type: TButtonItem.BUTTON_SEEK_DOWN,
				icon: "mdi-play"
			},
			{
				title: t("buttons.volUp"),
				type: TButtonItem.BUTTON_VOL_UP,
				icon: "mdi-volume-plus"
			},
			{
				title: t("buttons.volDown"),
				type: TButtonItem.BUTTON_VOL_DOWN,
				icon: "mdi-volume-minus"
			},
			{
				title: t("buttons.volMute"),
				type: TButtonItem.BUTTON_VOL_MUTE,
				icon: "mdi-volume-mute"
			}
		] as IButtonCard[]);

		// блокируем отправку значений на время обновления list
		let receiveConfig = false;
		watch(list, () =>
		{
			receiveConfig = true;
			setTimeout(() => (receiveConfig = false), 500);
		});

		/**
		 * Отправлять значение нажатой кнопки
		 * @param {boolean} enabled Вкл/выкл
		 */
		const enabledSendValue = (enabled: boolean): void =>
		{
			if (enabled !== canbus.configs.buttons.sendValue)
			{
				canbus.configs.buttons.sendValue = enabled;
				canbus.queryConfig(API_EXEC_BUTTONS_CONFIG);
			}
		};

		/**
		 * Входящие значения конфигурации кнопок
		 * @param {IButtonsConfig} res
		 */
		const onReceiveConfig = (res: IButtonsConfig): void =>
		{
			isLoadedConfig.value = res.isData;
			if (res.isData)
			{
				buttonItemsUpdate();

				// Включаем определение нажатой кнопки.
				// Выключится автоматически, при запросе значений или ручками в onUnmounted
				enabledSendValue(true);
			}
		};

		/**
		 * Входящие значения кнопки
		 * @param {IButtonValue} res
		 */
		const onReceiveValue = (res: IButtonValue): void =>
		{
			if (res.isData && !visibleButtonDefinitionDialog.value)
			{
				typeButtonDefinition.value = res.index;
				resistanceButtonDefinition.value = res.r;
				visibleButtonDefinitionDialog.value = true;
			}
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.addListener(API_EVENT_BUTTON, onReceiveValue);
			onReceiveConfig(canbus.configs.buttons);
			// onReceiveValue(canbus.buttonValue);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.removeListener(API_EVENT_BUTTON, onReceiveValue);

			enabledSendValue(false);
		});

		/** Изменение значений конфигурации кнопок */
		const onButtonConfigChange = (): void =>
		{
			if (receiveConfig) return;

			const { items } = canbus.configs.buttons;
			buttons.value.forEach((x, i) =>
			{
				const res = items[i];
				res.inR = x.inR;
				res.exec[TButtonPress.PRESS_SINGLE] = x.pressSingle;
				res.exec[TButtonPress.PRESS_DUAL] = x.pressDual;
				res.exec[TButtonPress.PRESS_TRIPLE] = x.pressTriple;
				res.exec[TButtonPress.PRESS_HOLD] = x.pressHold;
				res.exec[TButtonPress.RELEASE] = x.release;
			});
			canbus.queryConfig(API_EXEC_BUTTONS_CONFIG);
		};

		/**
		 * Применить новый тип не определенной кнопки
		 * @param {number} type Тип кнопки
		 */
		const onButtonDefinitionApply = (type: TButtonItem): void =>
		{
			canbus.configs.buttons.items[type].inR = resistanceButtonDefinition.value;
			canbus.queryConfig(API_EXEC_BUTTONS_CONFIG);
			onReceiveConfig(canbus.configs.buttons);
		};

		return {
			flicking,
			display,
			isLoadedConfig,
			buttons,
			list,
			visibleButtonDefinitionDialog,
			resistanceButtonDefinition,
			typeButtonDefinition,
			onButtonConfigChange,
			onButtonDefinitionApply
		};
	}
};
</script>

<style lang="scss" scoped>
.buttons {
	height: 100%;

	::v-deep(.settings-card-1 .mdi-play) {
		transform: rotate(-90deg);
	}
	::v-deep(.settings-card-2 .mdi-play) {
		transform: rotate(90deg);
	}
}
</style>
