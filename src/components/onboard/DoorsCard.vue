<!--suppress RequiredAttributes -->
<template>
	<CardSection :title="$t('DoorsCard_Title')" @click-options="onClickOptions">
		<CardSectionToggle :title="$t('DoorsCard_FL_Title')" :comment="$t('DoorsCard_FL_Comment')" v-model="doorFL" />
		<CardSectionToggle :title="$t('DoorsCard_FR_Title')" :comment="$t('DoorsCard_FR_Comment')" v-model="doorFR" />
		<CardSectionToggle :title="$t('DoorsCard_BL_Title')" :comment="$t('DoorsCard_BL_Comment')" v-model="doorBL" />
		<CardSectionToggle :title="$t('DoorsCard_BR_Title')" :comment="$t('DoorsCard_BR_Comment')" v-model="doorBR" />
		<CardSectionToggle
			:title="$t('DoorsCard_Trunk_Title')"
			:comment="$t('DoorsCard_Trunk_Comment')"
			v-model="trunk"
		/>
	</CardSection>
</template>

<script lang="ts">
import { computed } from 'vue';
import store from '@/store';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';

export default {
	name: 'DoorsCard',
	components: { CardSection, CardSectionToggle },
	setup() {
		const doorFL = computed((): boolean => store.doorsValue.frontLeft);
		const doorFR = computed((): boolean => store.doorsValue.frontRight);
		const doorBL = computed((): boolean => store.doorsValue.backLeft);
		const doorBR = computed((): boolean => store.doorsValue.backRight);
		const trunk = computed((): boolean => store.doorsValue.trunk);

		const onClickOptions = (e: any): void => {
			console.log('DoorsCard -> onClickOptions', e);
		};

		return {
			doorFL,
			doorFR,
			doorBL,
			doorBR,
			trunk,
			onClickOptions
		};
	}
};
</script>
