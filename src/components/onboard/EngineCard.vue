<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="EngineCard"
		type="EngineCard"
		:title="$t('EngineCard_Title')"
		icon-name="engine"
		:menu-card-section="menuEngineCard"
		@click-options="onClickOptions"
	>
		<CardSection2Icons
			:title="$t('EngineCard_Enabled_Title')"
			:comment="$t('EngineCard_Enabled_Comment')"
			icon1-name="start-stop"
			:icon1-value="enabled"
		/>
		<CardSectionInput
			:title="$t('EngineCard_RPM_Title')"
			:comment="$t('EngineCard_RPM_Comment')"
			v-model="rpm"
			readonly
		/>
		<CardSectionInput
			:title="$t('EngineCard_CountRPM_Title')"
			:comment="$t('EngineCard_CountRPM_Comment')"
			v-model="countRPM"
			readonly
		/>
		<CardSectionTime
			:title="$t('EngineCard_Motors_Title')"
			:comment="$t('EngineCard_Motors_Comment')"
			v-model="mseconds"
			readonly
		/>
		<CardSectionProgress
			:title="$t('EngineCard_Load_Title')"
			:comment="$t('EngineCard_Load_Comment')"
			:value="load"
		/>
		<CardSectionProgress
			:title="$t('EngineCard_Throttle_Title')"
			:comment="$t('EngineCard_Throttle_Comment')"
			:value="throttle"
		/>
		<CardSectionInput
			temperature
			:title="$t('EngineCard_Coolant_Title')"
			:comment="$t('EngineCard_Coolant_Comment')"
			v-model="coolant"
			readonly
		/>
	</CardSection>
	<ViewSettingModal
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
import CardSectionProgress from '@/components/cardSections/CardSectionProgress.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuEngineCard } from '@/store/menu/MenuEngineCard';
import { EngineValue, EngineView, IEngineValue, IViewConfig, TViewType } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_ENGINE, API_EVENT_VARIABLE_ENGINE_VIEW } from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'EngineCard',
	components: {
		CardSection,
		CardSectionTime,
		CardSectionToggle,
		CardSectionInput,
		CardSectionProgress,
		CardSection2Icons,
		ViewSettingModal
	},
	setup() {
		// параметры ДВС
		const engineValue = ref(new EngineValue());
		const engineView = new EngineView();
		// входящие значения ДВС
		const onReceiveValue = (res: IEngineValue): void => {
			engineValue.value.setModel(res);
		};
		// входящие значения отображения ДВС
		const onReceiveView = (res: IEngineValue): void => {
			engineView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			api.addListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_ENGINE, onReceiveValue);
			api.removeListener(API_EVENT_VARIABLE_ENGINE_VIEW, onReceiveView);
		});

		const enabled = computed((): boolean => engineValue.value.enabled);
		const rpm = computed((): string => engineValue.value.rpm.toFixed());
		const countRPM = computed((): string => engineValue.value.countRPM.toFixed());
		const load = computed((): number => engineValue.value.load);
		const mseconds = computed((): string => engineValue.value.mseconds.toFixed());
		const throttle = computed((): number => engineValue.value.throttle);
		const coolant = computed((): number => engineValue.value.coolant);

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);
		let selectItemMenu: TItemMenu;

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('EngineCard -> onClickOptions', e);

			selectItemMenu = e.type;
			switch (selectItemMenu) {
				case TItemMenu.VIEW_ENGINE_ENABLED:
					viewConfig.value = engineView.enabled;
					break;

				case TItemMenu.VIEW_ENGINE_RPM:
					viewConfig.value = engineView.rpm;
					break;

				case TItemMenu.VIEW_ENGINE_COUNT_RPM:
					viewConfig.value = engineView.totalCountRPM;
					break;

				case TItemMenu.VIEW_ENGINE_LOAD:
					viewConfig.value = engineView.load;
					break;

				case TItemMenu.VIEW_ENGINE_MOTORS:
					viewConfig.value = engineView.totalSeconds;
					break;

				case TItemMenu.VIEW_ENGINE_THROTTLE:
					viewConfig.value = engineView.throttle;
					break;

				case TItemMenu.VIEW_ENGINE_COOLANT:
					viewConfig.value = engineView.coolant;
					break;
			}

			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			switch (selectItemMenu) {
				case TItemMenu.VIEW_ENGINE_ENABLED:
					engineView.enabled = res;
					break;

				case TItemMenu.VIEW_ENGINE_RPM:
					engineView.rpm = res;
					break;

				case TItemMenu.VIEW_ENGINE_COUNT_RPM:
					engineView.totalCountRPM = res;
					break;

				case TItemMenu.VIEW_ENGINE_LOAD:
					engineView.load = res;
					break;

				case TItemMenu.VIEW_ENGINE_MOTORS:
					engineView.totalSeconds = res;
					break;

				case TItemMenu.VIEW_ENGINE_THROTTLE:
					engineView.throttle = res;
					break;

				case TItemMenu.VIEW_ENGINE_COOLANT:
					engineView.coolant = res;
					break;
			}
			api.send(engineView);
		};

		return {
			enabled,
			rpm,
			countRPM,
			load,
			mseconds,
			throttle,
			coolant,
			menuEngineCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
