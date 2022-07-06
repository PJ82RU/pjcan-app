<template>
	<q-dialog class="BluetoothDialogConnection" v-model="visible" persistent>
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="bluetooth_disabled" color="primary" text-color="white" />
				<span class="q-ml-md">{{ $t('BLE_NoConnected') }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn :label="$t('Close')" color="grey" v-close-popup />
				<q-btn :label="$t('BLE_BtnConnect')" color="primary" v-close-popup @click="$emit('connect')" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: 'BluetoothDialogConnection',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'connect'],
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit('update:modelValue', val)
		});

		return {
			visible
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.BluetoothDialogConnection
	@include bluetooth-dialog()
</style>
