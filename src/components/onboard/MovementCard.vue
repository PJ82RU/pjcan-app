<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="MovementCard"
		type="MovementCard"
		:title="$t('MovementCard_Title')"
		icon-name="speedometer"
		@click-options="onClickOptions"
	>
		<CardSectionInput
			:title="$t('MovementCard_Speed_Title')"
			:comment="$t('MovementCard_Speed_Comment')"
			v-model="speed"
			readonly
		/>
		<CardSectionInput
			:title="$t('MovementCard_SpeedAVG_Title')"
			:comment="$t('MovementCard_SpeedAVG_Comment')"
			v-model="speedAVG"
			readonly
		/>
		<CardSectionInput
			:title="$t('MovementCard_RestWay_Title')"
			:comment="$t('MovementCard_RestWay_Comment')"
			v-model="restWay"
			readonly
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionInput from '@/components/cardSections_/CardSectionInput.vue';

export default {
	name: 'MovementCard',
	components: { CardSection, CardSectionInput },
	setup() {
		const store: Ref | undefined = inject('store');
		const { movementValue } = store?.value;

		const speed = computed((): string => movementValue.speed.toFixed(2));
		const speedAVG = computed((): string => movementValue.speedAVG.toString());
		const restWay = computed((): string => movementValue.restWay.toFixed(2));

		const onClickOptions = (e: any): void => {
			console.log('MovementCard -> onClickOptions', e);
		};

		return {
			speed,
			speedAVG,
			restWay,
			onClickOptions
		};
	}
};
</script>
