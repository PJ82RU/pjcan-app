<template>
	<q-card-section horizontal class="card-section-time">
		<div class="card-section-time__header">
			<div class="card-section-time__header__title">{{ title }}</div>
			<div class="card-section-time__header__comment">{{ comment }}</div>
		</div>
		<q-input
			class="card-section-time__input"
			outlined
			dense
			:readonly="readonly"
			v-model="valueTime"
			type="time"
			step="2"
		/>
		<q-icon class="card-section-time__icon" :color="color" name="schedule" size="22px" />
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
			default: false
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

.card-section-time
	@include card-section()

	&__icon
		position: absolute
		right: 12px
		background-color: #f5f5f5
</style>
