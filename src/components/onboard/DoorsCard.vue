<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="DoorsCard"
		type="DoorsCard"
		:title="$t('DoorsCard_Title')"
		icon-name="doors"
		:menu-card-section="menuDoorsCard"
		@click-options="onClickOptions"
	>
		<CardSectionToggle :title="$t('DoorsCard_FL_Title')" :comment="$t('DoorsCard_FL_Comment')" v-model="doorFL" />
		<CardSectionToggle :title="$t('DoorsCard_FR_Title')" :comment="$t('DoorsCard_FR_Comment')" v-model="doorFR" />
		<CardSectionToggle :title="$t('DoorsCard_BL_Title')" :comment="$t('DoorsCard_BL_Comment')" v-model="doorBL" />
		<CardSectionToggle :title="$t('DoorsCard_BR_Title')" :comment="$t('DoorsCard_BR_Comment')" v-model="doorBR" />
		<CardSectionToggle
			:title="$t('DoorsCard_Trunk_Title')"
			:comment="$t('DoorsCard_Trunk_Comment')"
			v-model="trunk"
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
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuDoorsCard } from '@/store/menu/MenuDoorsCard';
import { DoorsValue, DoorsView, IDoorsValue, IViewConfig, TViewType } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_DOORS, API_EVENT_VARIABLE_DOORS_VIEW } from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'DoorsCard',
	components: { CardSection, CardSectionToggle, ViewSettingModal },
	setup() {
		// параметры открытых дверей
		const doorsValue = ref(new DoorsValue());
		const doorsView = new DoorsView();
		// входящие значения открытых дверей
		const onReceiveValue = (res: IDoorsValue): void => {
			doorsValue.value.setModel(res);
		};
		// входящие значения отображения открытых дверей
		const onReceiveView = (res: IDoorsValue): void => {
			doorsView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			api.addListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_DOORS, onReceiveValue);
			api.removeListener(API_EVENT_VARIABLE_DOORS_VIEW, onReceiveView);
		});

		const doorFL = computed((): boolean => doorsValue.value.frontLeft);
		const doorFR = computed((): boolean => doorsValue.value.frontRight);
		const doorBL = computed((): boolean => doorsValue.value.backLeft);
		const doorBR = computed((): boolean => doorsValue.value.backRight);
		const trunk = computed((): boolean => doorsValue.value.trunk);

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('DoorsCard -> onClickOptions', e);

			if (e.type !== TItemMenu.VIEW_DOORS) return;

			viewConfig.value = doorsView.doors;
			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			doorsView.doors = res;
			api.send(doorsView);
		};

		return {
			doorFL,
			doorFR,
			doorBL,
			doorBR,
			trunk,
			menuDoorsCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
