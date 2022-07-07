VolumeCard
<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="VolumeCard"
		type="VolumeCard"
		:title="$t('VolumeCard_Title')"
		icon-name="volume"
		:menu-card-section="menuVolumeCard"
		@click-options="onClickOptions"
	>
		<CardSectionSlider
			:title="$t('VolumeCard_Volume_Title')"
			:comment="$t('VolumeCard_Volume_Comment')"
			v-model="volume"
			:max="volumeMax"
		/>
		<CardSectionToggle
			:title="$t('VolumeCard_Mute_Title')"
			:comment="$t('VolumeCard_Mute_Comment')"
			v-model="mute"
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
import api, { API_EVENT_VARIABLE_VOLUME, API_EVENT_VARIABLE_VOLUME_VIEW } from '@/store/api';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionSlider from '@/components/cardSections/CardSectionSlider.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuVolumeCard } from '@/store/menu/MenuVolumeCard';
import { IViewConfig, IVolumeConfig, TViewType, VolumeConfig, VolumeView } from '@/models/pjcan';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'VolumeCard',
	components: {
		CardSection,
		CardSectionToggle,
		CardSectionSlider,
		ViewSettingModal
	},
	setup() {
		// параметры звука
		const volumeConfig = ref(new VolumeConfig());
		const volumeView = new VolumeView();
		// входящие значения звука
		const onReceiveConfig = (res: IVolumeConfig): void => {
			volumeConfig.value.setModel(res);
		};
		// входящие значения отображения звука
		const onReceiveView = (res: IVolumeConfig): void => {
			volumeView.setModel(res);
		};
		// исходящие значения звука
		const onSend = () => api.send(volumeConfig.value);

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			api.addListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_VOLUME, onReceiveConfig);
			api.removeListener(API_EVENT_VARIABLE_VOLUME_VIEW, onReceiveView);
		});

		const mute = computed({
			get: (): boolean => volumeConfig.value.mute,
			set: (val: boolean) => {
				volumeConfig.value.mute = val;
				onSend();
			}
		});
		const volume = computed({
			get: (): number => volumeConfig.value.volume,
			set: (val: number) => {
				volumeConfig.value.volume = val;
				onSend();
			}
		});
		const volumeMax = computed({
			get: (): number => volumeConfig.value.max,
			set: (val: number) => {
				volumeConfig.value.max = val;
				onSend();
			}
		});

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('VolumeCard -> onClickOptions', e);

			if (e.type !== TItemMenu.VIEW_VOLUME) return;

			viewConfig.value = volumeView.volume;
			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			volumeView.volume = res;
			api.send(volumeView);
		};

		return {
			mute,
			volume,
			volumeMax,
			menuVolumeCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
