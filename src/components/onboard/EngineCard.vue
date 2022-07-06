<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="EngineCard"
		type="EngineCard"
		:title="$t('EngineCard_Title')"
		icon-name="engine"
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
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSectionProgress from '@/components/cardSections/CardSectionProgress.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import { EngineValue, IEngineValue } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_ENGINE } from '@/store/api';

export default {
	name: 'EngineCard',
	components: {
		CardSection,
		CardSectionTime,
		CardSectionToggle,
		CardSectionInput,
		CardSectionProgress,
		CardSection2Icons
	},
	setup() {
		const engineValue = ref(new EngineValue());
		const onReceive = (res: IEngineValue): void => {
			engineValue.value = res;
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_ENGINE, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_ENGINE, onReceive);
		});

		const enabled = computed((): boolean => engineValue.value.enabled);
		const rpm = computed((): string => engineValue.value.rpm.toFixed());
		const countRPM = computed((): string => engineValue.value.countRPM.toFixed());
		const load = computed((): number => engineValue.value.load);
		const mseconds = computed((): string => engineValue.value.mseconds.toFixed());
		const throttle = computed((): number => engineValue.value.throttle);
		const coolant = computed((): number => engineValue.value.coolant);

		const onClickOptions = (e: any): void => {
			console.log('EngineCard -> onClickOptions', e);
		};

		return {
			enabled,
			rpm,
			countRPM,
			load,
			mseconds,
			throttle,
			coolant,
			onClickOptions
		};
	}
};
</script>
