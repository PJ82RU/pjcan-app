<!--suppress RequiredAttributes -->
<template>
	<card-section
		class="movement-card"
		type="MovementCard"
		:title="$t('MovementCard_Title')"
		icon-name="speedometer"
		:menu-card-section="menuMovementCard"
		@click:options="onClickOptions"
		show-options
		show-bookmark
	>
		<card-section-input
			:title="$t('MovementCard_Speed_Title')"
			:comment="$t('MovementCard_Speed_Comment')"
			v-model="speed"
			readonly
		/>
		<card-section-input
			:title="$t('MovementCard_SpeedAVG_Title')"
			:comment="$t('MovementCard_SpeedAVG_Comment')"
			v-model="speedAVG"
			readonly
		/>
		<card-section-input
			:title="$t('MovementCard_RestWay_Title')"
			:comment="$t('MovementCard_RestWay_Comment')"
			v-model="restWay"
			readonly
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
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuMovementCard } from '@/store/menu/MenuMovementCard';
import { IMovementValue, IViewConfig, MovementValue, MovementView, TViewType } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_MOVEMENT, API_EVENT_VARIABLE_MOVEMENT_VIEW } from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'MovementCard',
	components: { CardSection, CardSectionInput, ViewSettingModal },
	setup() {
		// значения движения
		const movementValue = ref(new MovementValue());
		const movementView = new MovementView();
		// входящие значения движения
		const onReceiveValue = (res: IMovementValue): void => {
			movementValue.value.setModel(res);
		};
		// входящие значения отображения движения
		const onReceiveView = (res: IMovementValue): void => {
			movementView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_MOVEMENT, onReceiveValue);
			api.addListener(API_EVENT_VARIABLE_MOVEMENT_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_MOVEMENT, onReceiveValue);
			api.removeListener(API_EVENT_VARIABLE_MOVEMENT_VIEW, onReceiveView);
		});

		const speed = computed((): string => movementValue.value.speed.toFixed(2));
		const speedAVG = computed((): string => movementValue.value.speedAVG.toString());
		const restWay = computed((): string => movementValue.value.restWay.toFixed(2));

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);
		let selectItemMenu: TItemMenu;

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('MovementCard -> onClickOptions', e);

			selectItemMenu = e.type;
			switch (selectItemMenu) {
				case TItemMenu.VIEW_MOVEMENT_SPEED:
					viewConfig.value = movementView.speed;
					break;

				case TItemMenu.VIEW_MOVEMENT_SPEED_AVG:
					viewConfig.value = movementView.speedAVG;
					break;

				case TItemMenu.VIEW_MOVEMENT_REST_WAY:
					viewConfig.value = movementView.restWay;
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
				case TItemMenu.VIEW_MOVEMENT_SPEED:
					movementView.speed = res;
					break;

				case TItemMenu.VIEW_MOVEMENT_SPEED_AVG:
					movementView.speedAVG = res;
					break;

				case TItemMenu.VIEW_MOVEMENT_REST_WAY:
					movementView.restWay = res;
					break;
			}
			api.send(movementView);
		};

		return {
			speed,
			speedAVG,
			restWay,
			menuMovementCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
