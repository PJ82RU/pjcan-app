<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="ClimateCard"
		type="ClimateCard"
		:title="$t('ClimateCard_Title')"
		icon-name="climate"
		@click-options="onClickOptions"
	>
		<CardSection2Icons
			:title="$t('ClimateCard_StatusWork_Title')"
			:comment="$t('ClimateCard_StatusWork_Comment')"
			icon1-name="climate"
			:icon1-value="enabled"
			:speed-rotation="speedRotation"
		/>
		<CardSectionToggle
			:title="$t('ClimateCard_AutoMode_Title')"
			:comment="$t('ClimateCard_AutoMode_Comment')"
			v-model="autoMode"
		/>
		<CardSectionToggle :title="$t('ClimateCard_AC_Title')" :comment="$t('ClimateCard_AC_Comment')" v-model="ac" />
		<CardSectionInput
			:title="$t('ClimateCard_Temperature_Title')"
			:comment="$t('ClimateCard_Temperature_Comment')"
			v-model="temperature"
			temperature
			readonly
		/>
		<CardSection2Icons
			:title="$t('ClimateCard_Air_Title')"
			:comment="$t('ClimateCard_Air_Comment')"
			:icon1-name="airName"
			:icon1-value="airEnabled"
		/>
		<CardSection2Icons
			:title="$t('ClimateCard_Blow_Title')"
			:comment="$t('ClimateCard_Blow_Comment')"
			icon1-name="blow-windshield"
			:icon1-value="blowWindshield"
			:icon2-name="blowName"
			:icon2-value="blowEnabled"
			margin="10px"
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionTime from '@/components/cardSections_/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections_/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections_/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections_/CardSection2Icons.vue';
import { TAir } from '@/models/pjcan';

export default {
	name: 'ClimateCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	emits: ['click-options', 'click-bookmark', 'click-help'],
	setup() {
		const store: Ref | undefined = inject('store');
		const { climateValue } = store?.value;

		const enabled = computed((): boolean => climateValue.enabled);
		const autoMode = computed((): boolean => climateValue.automode);
		const ac = computed((): boolean => climateValue.ac);
		const temperature = computed((): number => climateValue.temperature);

		const airEnabled = computed((): boolean => climateValue.airType !== TAir.AIR_NONE);
		const airName = computed((): string => (climateValue.airType === TAir.AIR_STREET ? 'air-fresh' : 'air-cabin'));
		const blowEnabled = computed((): boolean => climateValue.airDBody || climateValue.airDLegs);
		const blowName = computed((): string =>
			climateValue.airDLegs && climateValue.airDBody
				? 'blow-feet-body'
				: climateValue.airDLegs
				? 'blow-feet'
				: climateValue.airDBody
				? 'blow-body'
				: 'blow-none'
		);
		const blowWindshield = computed((): boolean => climateValue.airDWindshield);
		const speedRotation = computed((): number => (climateValue.airRate > 0 ? climateValue.airRate + 2 : 0));

		const onClickOptions = (e: any): void => {
			console.log('ClimateCard -> onClickOptions', e);
		};

		return {
			enabled,
			autoMode,
			ac,
			temperature,
			airEnabled,
			airName,
			blowEnabled,
			blowName,
			blowWindshield,
			speedRotation,
			onClickOptions
		};
	}
};
</script>
