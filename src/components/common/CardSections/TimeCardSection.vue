<template>
	<q-card-section horizontal class="TimeCardSection">
		<div class="TimeCardSection-title">{{ title }}</div>
		<q-input class="TimeCardSection-input" outlined dense readonly v-model="valueTime" type="time" step="2" />
		<q-icon class="TimeCardSection-icon" :color="iconColor" name="schedule" size="22px" />
	</q-card-section>
</template>

<script lang="ts">
import { ref, toRefs, watch, onMounted, onUnmounted } from 'vue';
import { Timeout } from '@/models/types';

export default {
	name: 'TimeCardSection',
	props: {
		title: {
			type: String,
			require: true
		},
		value: {
			type: [Date, String, Number],
			default: ''
		},
		realtime: {
			type: Boolean,
			default: false
		},
		iconColor: {
			type: String,
			default: 'primary'
		}
	},
	setup(props: any) {
		const { value, realtime } = toRefs(props);
		const valueTime = ref(value.value);
		const intervalRealtime = ref(undefined as Timeout);

		// следим за изменением value
		watch(value, (val: Date | string | number) => (valueTime.value = new Date(val)));

		// таймер обновления текущего времени
		onMounted(() => {
			// вкл. таймер
			if (realtime.value)
				intervalRealtime.value = setInterval(() => (valueTime.value = new Date().toLocaleTimeString()), 1000);
		});
		onUnmounted(() => {
			// выкл. таймер
			if (intervalRealtime.value) clearInterval(intervalRealtime.value);
		});

		return {
			valueTime
		};
	}
};
</script>

<style lang="sass">
.TimeCardSection
	&-title
		width: 100%

	&-input
		.q-field__inner
			width: 120px

	&-icon
		position: absolute
		right: 12px
</style>
