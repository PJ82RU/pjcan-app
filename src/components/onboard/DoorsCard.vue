<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="DoorsCard"
		type="DoorsCard"
		:title="$t('DoorsCard_Title')"
		icon-name="doors"
		@click-options="onClickOptions"
	>
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
import { computed, inject, Ref } from 'vue';

import CardSection from '@/components/cardSections_/CardSection.vue';
import CardSectionToggle from '@/components/cardSections_/CardSectionToggle.vue';

export default {
	name: 'DoorsCard',
	components: { CardSection, CardSectionToggle },
	setup() {
		const store: Ref | undefined = inject('store');
		const { doorsValue } = store?.value;

		const doorFL = computed((): boolean => doorsValue.frontLeft);
		const doorFR = computed((): boolean => doorsValue.frontRight);
		const doorBL = computed((): boolean => doorsValue.backLeft);
		const doorBR = computed((): boolean => doorsValue.backRight);
		const trunk = computed((): boolean => doorsValue.trunk);

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
