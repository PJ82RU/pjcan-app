<template>
	<q-card-section horizontal class="CardSectionTime">
		<div class="CardSectionTime-header">
			<div class="CardSectionTime-header-title">{{ title }}</div>
			<div class="CardSectionTime-header-comment">{{ comment }}</div>
		</div>
		<q-input
			class="CardSectionTime-input"
			outlined
			dense
			:readonly="readonly"
			v-model="valueTime"
			type="time"
			step="2"
		/>
		<q-icon class="CardSectionTime-icon" :color="color" name="schedule" size="22px" />
	</q-card-section>
</template>

<script lang="ts">
import { ref, toRefs, computed, onMounted, onUnmounted } from 'vue';
import { Timeout } from '@/models/types';

export default {
	name: 'CardSectionTime',
	props: {
		title: {
			type: String,
			require: true
		},
		comment: {
			type: String,
			default: ''
		},
		modelValue: {
			type: String,
			default: ''
		},
		realtime: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: 'primary'
		},
		readonly: {
			type: Boolean,
			default: true
		}
	},
	setup(props: any, context: any) {
		const { modelValue, realtime } = toRefs(props);
		const valueTime = computed({
			get(): string {
				return modelValue.value;
			},
			set(val: string): void {
				context.emit('update:modelValue', val);
			}
		});
		const intervalRealtime = ref(undefined as Timeout);

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
@import "@/css/mixins"

.CardSectionTime
	@include card-section()

	&-icon
		position: absolute
		right: 12px
		background-color: #f5f5f5
</style>
