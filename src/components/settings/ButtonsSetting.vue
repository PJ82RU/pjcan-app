<template>
	<card-section
		class="buttons-setting"
		type="ButtonsSetting"
		:title="$t('ButtonsSetting_Title')"
		icon-name="steering"
		:menu-card-section="menuButtonsSettingCard"
		@click-options="onClickOptions"
	>
	</card-section>
</template>

<script lang="ts">
import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';

import { onMounted, onUnmounted, ref } from 'vue';
import api, { API_EVENT_BUTTONS_CONFIG } from '@/store/api';
import { ButtonsConfig, IButtonsConfig } from '@/models/pjcan';
import { menuButtonsSettingCard } from '@/store/menu/ButtonsSettingCard';

export default {
	name: 'ButtonsSetting',
	components: { CardSection, CardSectionInput },
	setup() {
		// конфигурация кнопок
		const btnsConfig = ref(new ButtonsConfig());
		// входящие значения конфигурации кнопок
		const onReceiveValue = (res: IButtonsConfig): void => {
			btnsConfig.value.setModel(res);
			console.log(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveValue);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveValue);
		});

		const onClickOptions = (e: any): void => {
			console.log('FuelCard -> onClickOptions', e);
		};

		return {
			menuButtonsSettingCard,
			onClickOptions
		};
	}
};
</script>
