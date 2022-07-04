VolumeCard
<!--suppress RequiredAttributes -->
<template>
	<CardSection class="VolumeCard" :title="$t('VolumeCard_Title')" icon-name="volume" @click-options="onClickOptions">
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
import { computed } from 'vue';
import store from '@/store';

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
		const mute = computed({
			get: (): boolean => store.volumeConfig.mute,
			set: (val: boolean) => (store.volumeConfig.mute = val)
		});
		const volume = computed({
			get: (): number => store.volumeConfig.volume,
			set: (val: number) => (store.volumeConfig.volume = val)
		});
		const volumeMax = computed({
			get: (): number => store.volumeConfig.max,
			set: (val: number) => (store.volumeConfig.max = val)
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
