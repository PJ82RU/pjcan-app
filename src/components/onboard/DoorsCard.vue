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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import { DoorsValue, IDoorsValue } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_DOORS } from '@/store/api';

export default {
	name: 'DoorsCard',
	components: { CardSection, CardSectionToggle },
	setup() {
		const doorsValue = ref(new DoorsValue());
		const onReceive = (res: IDoorsValue): void => {
			doorsValue.value.setModel(res);
		};

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_DOORS, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_DOORS, onReceive);
		});

		const doorFL = computed((): boolean => doorsValue.value.frontLeft);
		const doorFR = computed((): boolean => doorsValue.value.frontRight);
		const doorBL = computed((): boolean => doorsValue.value.backLeft);
		const doorBR = computed((): boolean => doorsValue.value.backRight);
		const trunk = computed((): boolean => doorsValue.value.trunk);

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
