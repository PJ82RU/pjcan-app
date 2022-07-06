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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import { IMovementValue, MovementValue } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_MOVEMENT } from '@/store/api';

export default {
	name: 'MovementCard',
	components: { CardSection, CardSectionInput },
	setup() {
		const movementValue = ref(new MovementValue());
		const onReceive = (res: IMovementValue): void => {
			movementValue.value.setModel(res);
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_MOVEMENT, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_MOVEMENT, onReceive);
		});

		const speed = computed((): string => movementValue.value.speed.toFixed(2));
		const speedAVG = computed((): string => movementValue.value.speedAVG.toString());
		const restWay = computed((): string => movementValue.value.restWay.toFixed(2));

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
