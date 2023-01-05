<template>
	<flicking ref="flicking" class="buttons" :options="{ bound: true, align: 'prev' }">
		<div v-for="(item, index) in list" :key="`buttons-${index}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				v-model:in-r="item.inR"
				v-model:press-single="item.pressSingle"
				v-model:press-dual="item.pressDual"
				v-model:press-triple="item.pressTriple"
				v-model:press-hold="item.pressHold"
				v-model:release="item.release"
				:is-loaded-config="isLoadedConfig"
				:icon="item.icon"
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
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";

import canbus, { API_EVENT_BUTTON, API_EVENT_BUTTONS_CONFIG } from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";

import { IButtonsConfig, IButtonValue, TButtonItem, TButtonPress } from "@/models/pjcan/button";
import { IConfigItem } from "@/models/interfaces/IConfigItem";

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

		const list = computed(() => [
			{
				title: t("buttons.mode"),
				type: TButtonItem.BUTTON_MODE,
				icon: "mdi-menu",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			},
			{
				title: t("buttons.seekUp"),
				type: TButtonItem.BUTTON_SEEK_UP,
				icon: "mdi-play",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			},
			{
				title: t("buttons.seekDown"),
				type: TButtonItem.BUTTON_SEEK_DOWN,
				icon: "mdi-play",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			},
			{
				title: t("buttons.volUp"),
				type: TButtonItem.BUTTON_VOL_UP,
				icon: "mdi-volume-plus",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			},
			{
				title: t("buttons.volDown"),
				type: TButtonItem.BUTTON_VOL_DOWN,
				icon: "mdi-volume-minus",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			},
			{
				title: t("buttons.volMute"),
				type: TButtonItem.BUTTON_VOL_MUTE,
				icon: "mdi-volume-mute",
				inR: 0,
				pressSingle: 0,
				pressDual: 0,
				pressTriple: 0,
				pressHold: 0,
				release: 0
			}
		] as IConfigItem[]);

		/**
		 * Отправлять значение нажатой кнопки
		 * @param {boolean} enabled Вкл/выкл
		 */
		const enabledSendValue = (enabled: boolean): void =>
		{
			if (enabled !== canbus.configs.buttons.sendValue)
			{
				canbus.configs.buttons.sendValue = enabled;
				canbus.queryConfigsButtons();
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
				res.items?.forEach((x, i) =>
				{
					const vals = list.value[i];
					vals.inR = x.inR;
					vals.pressSingle = x.exec[TButtonPress.PRESS_SINGLE];
					vals.pressDual = x.exec[TButtonPress.PRESS_DUAL];
					vals.pressTriple = x.exec[TButtonPress.PRESS_TRIPLE];
					vals.pressHold = x.exec[TButtonPress.PRESS_HOLD];
					vals.release = x.exec[TButtonPress.RELEASE];
				});

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
			const { items } = canbus.configs.buttons;
			list.value.forEach((x, i) =>
			{
				const vals = items[i];
				vals.inR = x.inR;
				vals.exec[TButtonPress.PRESS_SINGLE] = x.pressSingle;
				vals.exec[TButtonPress.PRESS_DUAL] = x.pressDual;
				vals.exec[TButtonPress.PRESS_TRIPLE] = x.pressTriple;
				vals.exec[TButtonPress.PRESS_HOLD] = x.pressHold;
				vals.exec[TButtonPress.RELEASE] = x.release;
			});
			canbus.queryConfigsButtons();
		};

		/**
		 * Применить новый тип не определенной кнопки
		 * @param {number} type Тип кнопки
		 */
		const onButtonDefinitionApply = (type: TButtonItem): void =>
		{
			canbus.configs.buttons.items[type].inR = resistanceButtonDefinition.value;
			canbus.queryConfigsButtons();
			onReceiveConfig(canbus.configs.buttons);
		};

		return {
			flicking,
			display,
			isLoadedConfig,
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
