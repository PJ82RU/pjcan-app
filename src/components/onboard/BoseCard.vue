<!--suppress RequiredAttributes -->
<template>
	<CardSection
		class="BoseCard"
		type="BoseCard"
		:title="$t('BoseCard_Title')"
		icon-name="volume"
		@click-options="onClickOptions"
	>
		<CardSectionToggle
			:title="$t('BoseCard_Enabled_Title')"
			:comment="$t('BoseCard_Enabled_Comment')"
			v-model="enabled"
		/>
		<CardSectionToggle
			:title="$t('BoseCard_AudioPLT_Title')"
			:comment="$t('BoseCard_AudioPLT_Comment')"
			v-model="audioPLT"
		/>
		<CardSectionSelect
			:title="$t('BoseCard_CenterPoint_Title')"
			:comment="$t('BoseCard_CenterPoint_Comment')"
			v-model="centerPoint"
			:options="centerPointItems"
		/>
		<CardSectionSlider
			class="BoseCard-balance"
			:title="$t('BoseCard_Balance_Title')"
			:comment="$t('BoseCard_Balance_Comment')"
			v-model="balance"
			iconLeftName="volume_up"
			:min="-8"
			:max="8"
		/>
		<CardSectionSlider
			class="BoseCard-fade"
			:title="$t('BoseCard_Fade_Title')"
			:comment="$t('BoseCard_Fade_Comment')"
			v-model="fade"
			iconLeftName="volume_up"
			:min="-8"
			:max="8"
		/>
		<CardSectionSlider
			class="BoseCard-treble"
			:title="$t('BoseCard_Treble_Title')"
			:comment="$t('BoseCard_Treble_Comment')"
			v-model="treble"
			:min="-6"
			:max="6"
		/>
		<CardSectionSlider
			class="BoseCard-bass"
			:title="$t('BoseCard_Bass_Title')"
			:comment="$t('BoseCard_Bass_Comment')"
			v-model="bass"
			:min="-6"
			:max="6"
		/>
		<CardSectionToggle :title="$t('BoseCard_Wow_Title')" :comment="$t('BoseCard_Wow_Comment')" v-model="wow" />
	</CardSection>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionSlider from '@/components/cardSections/CardSectionSlider.vue';
import CardSectionSelect from '@/components/cardSections/CardSectionSelect.vue';
import { BoseConfig, IBoseConfig, TCenterPoint } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_BOSE } from '@/store/api';

export default {
	name: 'BoseCard',
	components: {
		CardSection,
		CardSectionToggle,
		CardSectionSlider,
		CardSectionSelect
	},
	setup: function () {
		const boseConfig = ref(new BoseConfig());
		const onReceive = (res: IBoseConfig): void => {
			boseConfig.value = res;
		};
		const onSend = () => api.send(boseConfig.value);

		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_BOSE, onReceive);
		});
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_BOSE, onReceive);
		});

		const enabled = computed({
			get: (): boolean => boseConfig.value.enabled,
			set: (val: boolean) => {
				boseConfig.value.enabled = val;
				onSend();
			}
		});
		const audioPLT = computed({
			get: (): boolean => boseConfig.value.audioPLT,
			set: (val: boolean) => {
				boseConfig.value.audioPLT = val;
				onSend();
			}
		});
		const centerPoint = computed({
			get: (): number => Number(boseConfig.value.centerPoint),
			set: (val: any) => {
				boseConfig.value.centerPoint = (val?.value as TCenterPoint) ?? TCenterPoint.CENTERPOINT_OFF;
				onSend();
			}
		});
		const centerPointItems = computed((): any[] => [
			{ label: 'OFF', value: 0 },
			{ label: 'MIN', value: 1 },
			{ label: 'LOW', value: 2 },
			{ label: 'MID', value: 3 },
			{ label: 'HI', value: 4 },
			{ label: 'MAX', value: 5 }
		]);
		const balance = computed({
			get: (): number => boseConfig.value.balance,
			set: (val: number) => {
				boseConfig.value.balance = val;
				onSend();
			}
		});
		const fade = computed({
			get: (): number => boseConfig.value.fade,
			set: (val: number) => {
				boseConfig.value.fade = val;
				onSend();
			}
		});
		const treble = computed({
			get: (): number => boseConfig.value.treble,
			set: (val: number) => {
				boseConfig.value.treble = val;
				onSend();
			}
		});
		const bass = computed({
			get: (): number => boseConfig.value.bass,
			set: (val: number) => {
				boseConfig.value.bass = val;
				onSend();
			}
		});
		const wow = computed({
			get: (): boolean => boseConfig.value.wow,
			set: (val: boolean) => {
				boseConfig.value.wow = val;
				onSend();
			}
		});

		const onClickOptions = (e: any): void => {
			console.log('BoseCard -> onClickOptions', e);
		};

		return {
			enabled,
			audioPLT,
			centerPoint,
			centerPointItems,
			balance,
			fade,
			treble,
			bass,
			wow,
			onClickOptions
		};
	}
};
</script>

<style lang="sass">
.BoseCard
	&-balance .CardSectionSlider-icon-left
		-moz-transform: rotate(180deg)
		-webkit-transform: rotate(180deg)
		transform: rotate(180deg)
	&-fade .CardSectionSlider-icon
		&-left
			-moz-transform: rotate(-90deg)
			-webkit-transform: rotate(-90deg)
			transform: rotate(-90deg)
		&-right
			-moz-transform: rotate(90deg)
			-webkit-transform: rotate(90deg)
			transform: rotate(90deg)
</style>
