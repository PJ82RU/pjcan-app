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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSection2Icons from '@/components/cardSections/CardSection2Icons.vue';
import { ClimateValue, IClimateValue, TAir } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_CLIMATE } from '@/store/api';

export default {
	name: 'ClimateCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSection2Icons },
	emits: ['click-options', 'click-bookmark', 'click-help'],
	setup() {
		const climateValue = ref(new ClimateValue());
		const onReceive = (res: IClimateValue): void => {
			climateValue.value = res;
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_CLIMATE, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_CLIMATE, onReceive);
		});

		const enabled = computed((): boolean => climateValue.value.enabled);
		const autoMode = computed((): boolean => climateValue.value.automode);
		const ac = computed((): boolean => climateValue.value.ac);
		const temperature = computed((): number => climateValue.value.temperature);

		const airEnabled = computed((): boolean => climateValue.value.airType !== TAir.AIR_NONE);
		const airName = computed((): string =>
			climateValue.value.airType === TAir.AIR_STREET ? 'air-fresh' : 'air-cabin'
		);
		const blowEnabled = computed((): boolean => climateValue.value.airDBody || climateValue.value.airDLegs);
		const blowName = computed((): string =>
			climateValue.value.airDLegs && climateValue.value.airDBody
				? 'blow-feet-body'
				: climateValue.value.airDLegs
				? 'blow-feet'
				: climateValue.value.airDBody
				? 'blow-body'
				: 'blow-none'
		);
		const blowWindshield = computed((): boolean => climateValue.value.airDWindshield);
		const speedRotation = computed((): number =>
			climateValue.value.airRate > 0 ? climateValue.value.airRate + 2 : 0
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
