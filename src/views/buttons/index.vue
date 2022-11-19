<template>
	<flicking ref="flicking" class="buttons" :options="{ bound: true, align: 'prev' }">
		<div v-for="(item, index) in list" :key="`buttons-${index}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				:type="item.type"
				:config="item.item"
				:is-loaded-config="isLoadedConfig"
				:icon="item.icon"
				@update="onUpdateConfig"
			/>
		</div>
	</flicking>

	<button-definition-dialog
		v-model="visibleButtonDefinitionDialog"
		:list="list"
		:type="typeButtonDefinition"
		@click:apply="onButtonDefinitionApply"
	/>
</template>

<script lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";
import { $t } from "@/lang";
import canbus, { API_EVENT_BUTTON, API_EVENT_BUTTONS_CONFIG } from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";

import { IButtonsConfig, IButtonValue, TButtonItem } from "@/models/pjcan/button";
import { IConfigReturn } from "@/views/buttons/components/SettingsCard.vue";
import { IConfigItem } from "@/models/interfaces/IConfigItem";

export default {
	name: "buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const isLoadedConfig = ref(false);
		const visibleButtonDefinitionDialog = ref(false);
		const typeButtonDefinition = ref(-1);
		let resistanceButtonDefinition = 0;

		const list = ref([
			{ title: $t("buttons.mode"), type: TButtonItem.BUTTON_MODE, icon: "mdi-menu" },
			{ title: $t("buttons.seekUp"), type: TButtonItem.BUTTON_SEEK_UP, icon: "mdi-play" },
			{ title: $t("buttons.seekDown"), type: TButtonItem.BUTTON_SEEK_DOWN, icon: "mdi-play" },
			{ title: $t("buttons.volUp"), type: TButtonItem.BUTTON_VOL_UP, icon: "mdi-volume-plus" },
			{ title: $t("buttons.volDown"), type: TButtonItem.BUTTON_VOL_DOWN, icon: "mdi-volume-minus" },
			{ title: $t("buttons.volMute"), type: TButtonItem.BUTTON_VOL_MUTE, icon: "mdi-volume-mute" }
		] as IConfigItem[]);

		/**
		 * Входящие значения конфигурации кнопок
		 * @param {IButtonsConfig} res
		 */
		const onReceiveConfig = (res: IButtonsConfig): void =>
		{
			isLoadedConfig.value = res.isData;
			if (res.isData)
			{
				res.items?.forEach((x, i) => (list.value[i].item = x));
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
				resistanceButtonDefinition = res.r;
				visibleButtonDefinitionDialog.value = true;
			}
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.addListener(API_EVENT_BUTTON, onReceiveValue);
			onReceiveConfig(canbus.configs.buttons);
			onReceiveValue(canbus.buttonValue);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.removeListener(API_EVENT_BUTTON, onReceiveValue);
		});

		/**
		 * Обновление конфигурации кнопок
		 * @param {IConfigReturn} data
		 */
		const onUpdateConfig = (data: IConfigReturn) =>
		{
			canbus.configs.buttons.items[data.type] = data.item;
			canbus.queryConfigsButtons();
		};

		/**
		 * Применить новый тип не определенной кнопки
		 * @param {number} type Тип кнопки
		 */
		const onButtonDefinitionApply = (type: TButtonItem) =>
		{
			canbus.configs.buttons.items[type].inR = resistanceButtonDefinition;
			canbus.queryConfigsButtons();
			onReceiveConfig(canbus.configs.buttons);
		};

		return {
			flicking,
			display,
			isLoadedConfig,
			list,
			visibleButtonDefinitionDialog,
			typeButtonDefinition,
			onUpdateConfig,
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
