<template>
	<q-dialog class="BluetoothDialogConnection" v-model="visible" persistent>
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="bluetooth_disabled" color="primary" text-color="white" />
				<span class="q-ml-md">{{ $t('BLE_NoConnected') }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn :label="$t('Close')" color="grey" v-close-popup @click="onClose" />
				<q-btn :label="$t('BLE_BtnConnect')" color="primary" v-close-popup @click="onConnect" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { inject, Ref, ref, toRefs, watch } from 'vue';
import { lang } from '@/boot/i18n';
import { useQuasar } from 'quasar';

import { BLUETOOTH_EVENT_CONNECTED, EConnectedStatus } from './Bluetooth';

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

		const store: Ref | undefined = inject('store');
		const { bluetooth } = store?.value;

		// отображение диалога
		const visible = ref(true);
		// следим за изменениями modelValue
		watch(modelValue, (val: boolean) => (visible.value = val));

		// подключиться
		const onConnect = (): void => {
			updateValue(false);
			bluetooth.connect();
		};
		// обновить значение modelValue
		const updateValue = (val: boolean) => {
			visible.value = val;
			context.emit('update:modelValue', val);
		};

		// создаем событие подключения к Bluetooth
		bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (status: EConnectedStatus) => {
			//console.log('BluetoothListener', status);

			updateValue(status === EConnectedStatus.NO_CONNECT);
			switch (status) {
				case EConnectedStatus.NO_CONNECT:
					$q.notify({
						message: lang('BLE_NoConnected'),
						position: 'bottom',
						color: 'red'
					});
					break;

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
			//setTimeout(() => updateValue(true), 15000);
		};

		return {
			visible,
			onConnect,
			onClose
		};
	}
};
</script>

<style lang="sass">
.BluetoothDialogConnection
	.q-card__section
		align-items: center

	.q-card__actions
		padding: 0 16px 16px 16px

	.q-ml-md
		word-break: normal
		width: calc(100% - 64px)
</style>
