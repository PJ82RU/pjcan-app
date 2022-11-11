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
</template>

<script lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import { IButtonsConfig, IButtonsConfigItem, IButtonValue, TButtonItem } from "@/models/pjcan/button";

import canbus, { API_EVENT_BUTTON_VALUE, API_EVENT_BUTTONS_CONFIG } from "@/api/canbus";
import { $t } from "@/lang";
import { IConfigReturn } from "@/views/buttons/components/SettingsCard.vue";

interface IConfigItem {
	title: string;
	type: TButtonItem;
	item: IButtonsConfigItem | undefined;
	icon: string;
}

export default {
	name: "buttons",
	components: { Flicking, SettingsCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const isLoadedConfig = ref(false);

		const list = ref([
			{ title: $t("buttons.mode"), type: TButtonItem.BUTTON_MODE, icon: "mdi-menu" },
			{ title: $t("buttons.seekUp"), type: TButtonItem.BUTTON_SEEK_UP, icon: "mdi-play" },
			{ title: $t("buttons.seekDown"), type: TButtonItem.BUTTON_SEEK_DOWN, icon: "mdi-play" },
			{ title: $t("buttons.volUp"), type: TButtonItem.BUTTON_VOL_UP, icon: "mdi-volume-plus" },
			{ title: $t("buttons.volDown"), type: TButtonItem.BUTTON_VOL_DOWN, icon: "mdi-volume-minus" },
			{ title: $t("buttons.volMute"), type: TButtonItem.BUTTON_VOL_MUTE, icon: "mdi-volume-mute" }
		] as IConfigItem[]);

		/** Входящие значения конфигурации кнопок */
		const onReceiveConfig = (res: IButtonsConfig): void =>
		{
			isLoadedConfig.value = res.isData;
			if (res.isData)
			{
				res.items?.forEach((x, i) => (list.value[i].item = x));
			}
		};

		/** Входящие значения кнопки */
		const onReceiveValue = (res: IButtonValue): void =>
		{
			console.log(res);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.addListener(API_EVENT_BUTTON_VALUE, onReceiveValue);
			onReceiveConfig(canbus.configs.buttons);
			onReceiveValue(canbus.buttonValue);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.removeListener(API_EVENT_BUTTON_VALUE, onReceiveValue);
		});

		/**
		 * Обновление конфигурации кнопок
		 * @param {IConfigReturn} data
		 */
		const onUpdateConfig = (data: IConfigReturn) =>
		{
			canbus.configs.buttons.items[data.type] = data.item;
			canbus.send(canbus.configs.buttons);
		};

		return {
			flicking,
			display,
			isLoadedConfig,
			list,
			onUpdateConfig
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
