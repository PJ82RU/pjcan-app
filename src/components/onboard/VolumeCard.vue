VolumeCard
<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="VolumeCard"
		type="VolumeCard"
		:title="$t('VolumeCard_Title')"
		icon-name="volume"
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
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import api, { API_EVENT_VARIABLE_VOLUME } from '@/store/api';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionSlider from '@/components/cardSections/CardSectionSlider.vue';
import { IVolumeConfig, VolumeConfig } from '@/models/pjcan';

export default {
	name: 'VolumeCard',
	components: {
		CardSection,
		CardSectionToggle,
		CardSectionSlider
	},
	setup() {
		const volumeConfig = ref(new VolumeConfig());
		const onReceive = (res: IVolumeConfig): void => {
			volumeConfig.value = res;
		};
		const onSend = () => api.send(volumeConfig.value);

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_VOLUME, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_VOLUME, onReceive);
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

		const onClickOptions = (e: any): void => {
			console.log('VolumeCard -> onClickOptions', e);
		};

		return {
			mute,
			volume,
			volumeMax,
			onClickOptions
		};
	}
};
</script>
