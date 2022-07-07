<template>
	<q-dialog class="BluetoothDialogDisconnection" v-model="visible" persistent>
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="bluetooth" color="primary" text-color="white" />
				<span class="q-ml-md">{{ $t('BLE_Connected') }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn :label="$t('Close')" color="secondary" v-close-popup />
				<q-btn :label="$t('BLE_BtnDisconnect')" color="primary" v-close-popup @click="$emit('disconnect')" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';

export default {
	name: ' BluetoothDialogDisconnection',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'disconnect'],
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

.BluetoothDialogDisconnection
	@include bluetooth-dialog()
</style>
