<template>
	<flicking ref="flicking" class="buttons" :options="{ bound: true, align: 'prev' }">
		<div
			v-for="(iconName, index) in iconsNameList"
			:key="`buttons-${index}`"
			class="mr-4"
			:class="`flicking-${display}`"
		>
			<settings-card
				:class="`settings-card-${index}`"
				:type="index"
				:config="config"
				:is-loaded-config="isLoadedConfig"
				:icon-name="iconName"
			/>
		</div>
	</flicking>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import { useDisplay } from "vuetify";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import { ButtonsConfig, ButtonValue, IButtonsConfig, IButtonValue } from "@/models/pjcan/button";

import canbus, { API_EVENT_BUTTON_VALUE, API_EVENT_BUTTONS_CONFIG } from "@/api/canbus";

export default {
	name: "buttons",
	components: { Flicking, SettingsCard },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const iconsNameList = computed(() => [
			"mdi-menu",
			"mdi-play",
			"mdi-play",
			"mdi-volume-plus",
			"mdi-volume-minus",
			"mdi-volume-mute"
		]);

		// КОНФИГУРАЦИЯ КНОПОК

		const isLoadedConfig = ref(false);
		const isLoadedValue = ref(false);

		const config = ref(new ButtonsConfig());
		const value = ref(new ButtonValue());

		// входящие значения конфигурации кнопок
		const onReceiveConfig = (res: IButtonsConfig): void =>
		{
			isLoadedConfig.value = true;
			config.value.setModel(res);
			console.log("ButtonValue", config.value);
		};
		// входящие значения кнопки
		const onReceiveValue = (res: IButtonValue): void =>
		{
			isLoadedValue.value = true;
			value.value.setModel(res);
			console.log("ButtonValue", value.value);
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.addListener(API_EVENT_BUTTON_VALUE, onReceiveValue);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveConfig);
			canbus.removeListener(API_EVENT_BUTTON_VALUE, onReceiveValue);
		});

		return {
			flicking,
			display,
			iconsNameList,
			isLoadedConfig,
			isLoadedValue,
			config,
			value
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
