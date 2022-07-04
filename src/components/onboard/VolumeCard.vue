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
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionSlider from '@/components/cardSections/CardSectionSlider.vue';

export default {
	name: 'VolumeCard',
	components: {
		CardSection,
		CardSectionToggle,
		CardSectionSlider
	},
	setup() {
		const store: Ref | undefined = inject('store');
		const { volumeConfig } = store?.value;

		const mute = computed({
			get: (): boolean => volumeConfig.mute,
			set: (val: boolean) => (volumeConfig.mute = val)
		});
		const volume = computed({
			get: (): number => volumeConfig.volume,
			set: (val: number) => (volumeConfig.volume = val)
		});
		const volumeMax = computed({
			get: (): number => volumeConfig.max,
			set: (val: number) => (volumeConfig.max = val)
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
