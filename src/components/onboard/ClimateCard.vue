<!--suppress RequiredAttributes -->
<template>
	<card-section
		class="climate-card"
		type="ClimateCard"
		:title="$t('ClimateCard_Title')"
		icon-name="climate"
		:menu-card-section="menuClimateCard"
		@click:options="onClickOptions"
		show-options
		show-bookmark
	>
		<card-section2-icons
			:title="$t('ClimateCard_StatusWork_Title')"
			:comment="$t('ClimateCard_StatusWork_Comment')"
			icon1-name="climate"
			:icon1-value="enabled"
			:speed-rotation="speedRotation"
		/>
		<card-section-toggle
			:title="$t('ClimateCard_AutoMode_Title')"
			:comment="$t('ClimateCard_AutoMode_Comment')"
			v-model="autoMode"
		/>
		<card-section-toggle :title="$t('ClimateCard_AC_Title')" :comment="$t('ClimateCard_AC_Comment')" v-model="ac" />
		<card-section-input
			:title="$t('ClimateCard_Temperature_Title')"
			:comment="$t('ClimateCard_Temperature_Comment')"
			v-model="temperature"
			temperature
			readonly
		/>
		<card-section2-icons
			:title="$t('ClimateCard_Air_Title')"
			:comment="$t('ClimateCard_Air_Comment')"
			:icon1-name="airName"
			:icon1-value="airEnabled"
		/>
		<card-section2-icons
			:title="$t('ClimateCard_Blow_Title')"
			:comment="$t('ClimateCard_Blow_Comment')"
			icon1-name="blow-windshield"
			:icon1-value="blowWindshield"
			:icon2-name="blowName"
			:icon2-value="blowEnabled"
			margin="10px"
		/>
	</card-section>
	<view-setting-modal
		v-model="viewSettingModel"
		:title="viewSettingTitle"
		:view-config="viewConfig"
		@apply="onApplyViewConfig"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuClimateCard } from '@/store/menu/MenuClimateCard';
import { ClimateValue, ClimateView, IClimateValue, IViewConfig, TAir, TViewType } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_CLIMATE, API_EVENT_VARIABLE_CLIMATE_VIEW } from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'ClimateCard',
	components: {
		CardSection,
		CardSectionTime,
		CardSectionToggle,
		CardSectionInput,
		CardSection2Icons,
		ViewSettingModal
	},
	emits: ['click-options', 'click-bookmark', 'click-help'],
	setup() {
		// климат-контроль
		const climateValue = ref(new ClimateValue());
		const climateView = new ClimateView();
		// входящие значения климат-контроля
		const onReceiveValue = (res: IClimateValue): void => {
			climateValue.value.setModel(res);
		};
		// входящие значения отображения климат-контроля
		const onReceiveView = (res: IClimateValue): void => {
			climateView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			api.addListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_CLIMATE, onReceiveValue);
			api.removeListener(API_EVENT_VARIABLE_CLIMATE_VIEW, onReceiveView);
		});

		const enabled = computed((): boolean => climateValue.value.enabled);
		const autoMode = computed((): boolean => climateValue.value.automode);
		const ac = computed((): boolean => climateValue.value.ac);
		const temperature = computed((): number => climateValue.value.temperature);

		const airEnabled = computed((): boolean => climateValue.value.airType !== TAir.AIR_NONE);
		const airName = computed((): string =>
			climateValue.value.airType === TAir.AIR_STREET ? 'air-fresh' : 'air-cabin'
		);
		const blowEnabled = computed((): boolean => climateValue.value.airDBody || climateValue.value.airDLegs);
		const blowName = computed((): string =>
			climateValue.value.airDLegs && climateValue.value.airDBody
				? 'blow-feet-body'
				: climateValue.value.airDLegs
				? 'blow-feet'
				: climateValue.value.airDBody
				? 'blow-body'
				: 'blow-none'
		);
		const blowWindshield = computed((): boolean => climateValue.value.airDWindshield);
		const speedRotation = computed((): number =>
			climateValue.value.airRate > 0 ? climateValue.value.airRate + 2 : 0
		);

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('ClimateCard -> onClickOptions', e);

			if (e.type !== TItemMenu.VIEW_CLIMATE) return;

			viewConfig.value = climateView.climate;
			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			climateView.climate = res;
			api.send(climateView);
		};

		return {
			enabled,
			autoMode,
			ac,
			temperature,
			airEnabled,
			airName,
			blowEnabled,
			blowName,
			blowWindshield,
			speedRotation,
			menuClimateCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
