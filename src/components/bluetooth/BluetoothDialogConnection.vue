<template>
	<q-dialog class="BluetoothDialogConnection" v-model="visible" persistent>
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="bluetooth_disabled" color="primary" text-color="white" />
				<span class="q-ml-md">{{ $t('BLE_NoConnected') }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn :label="$t('Close')" color="grey" v-close-popup @click="onClose" />
				<q-btn :label="$t('BLE_BtnConnect')" color="primary" v-close-popup @click="bluetooth.connect()" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { ref, toRefs, computed, watch } from 'vue';
import { lang } from '@/boot/i18n';
import { useQuasar } from 'quasar';

import Store from '@/store';
import { Bluetooth, BLUETOOTH_EVENT_CONNECTED, EConnectedStatus } from './bluetooth';

export default {
	name: 'BluetoothDialogConnection',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any, context: any) {
		const $q = useQuasar();
		const { modelValue } = toRefs(props);

		// отображение диалога
		const visible = ref(true);
		// объект Bluetooth
		const bluetooth = computed((): Bluetooth => Store.bluetooth);

		// обновить значение modelValue
		const updateValue = (val: boolean) => {
			visible.value = val;
			context.emit('update:modelValue', val);
		};
		// следим за изменениями modelValue
		watch(modelValue, (val: boolean) => (visible.value = val));

		// создаем событие подключения к Bluetooth
		bluetooth.value.addListener(BLUETOOTH_EVENT_CONNECTED, (status: EConnectedStatus) => {
			//console.log('BluetoothListener', status);

			updateValue(status === EConnectedStatus.NO_CONNECT);
			switch (status) {
				case EConnectedStatus.CONNECT:
					$q.notify({
						message: lang('BLE_Connected'),
						position: 'bottom',
						color: 'green'
					});
					break;

				case EConnectedStatus.WAIT_CONNECT:
					$q.notify({
						message: lang('BLE_LostConnected'),
						position: 'bottom',
						color: 'red'
					});
					break;
			}
		});

		/** Событие кнопки "Закрыть" */
		const onClose = () => {
			updateValue(false);
			setTimeout(() => updateValue(true), 15000);
		};

		return {
			visible,
			bluetooth,
			onClose
		};
	}
};
</script>

<style lang="sass">
.BluetoothDialogConnection
	.q-card__section
		align-items: center

	.q-ml-md
		word-break: normal
		width: calc(100% - 64px)
</style>
