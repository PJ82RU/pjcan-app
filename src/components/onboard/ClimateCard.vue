<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('ClimateCard_Title')" icon-name="climate" @click-options="onClickOptions">
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
import { computed } from 'vue';
import store from '@/store';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import { TAir } from '@/models/pjcan';

export default {
	name: 'ClimateCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	setup() {
		const enabled = computed((): boolean => store.climateValue.enabled);
		const autoMode = computed((): boolean => store.climateValue.automode);
		const ac = computed((): boolean => store.climateValue.ac);
		const temperature = computed((): number => store.climateValue.temperature);

		const airEnabled = computed((): boolean => store.climateValue.airType !== TAir.AIR_NONE);
		const airName = computed((): string =>
			store.climateValue.airType === TAir.AIR_STREET ? 'air-fresh' : 'air-cabin'
		);
		const blowEnabled = computed((): boolean => store.climateValue.airDBody || store.climateValue.airDLegs);
		const blowName = computed((): string =>
			store.climateValue.airDLegs && store.climateValue.airDBody
				? 'blow-feet-body'
				: store.climateValue.airDLegs
				? 'blow-feet'
				: store.climateValue.airDBody
				? 'blow-body'
				: 'blow-none'
		);
		const blowWindshield = computed((): boolean => store.climateValue.airDWindshield);
		const speedRotation = computed((): number =>
			store.climateValue.airRate > 0 ? store.climateValue.airRate + 2 : 0
		);

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
