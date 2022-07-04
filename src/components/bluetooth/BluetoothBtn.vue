<template>
	<q-btn flat round dense :icon="iconClass" class="BluetoothBtn q-mr-sm" @click="onBtnClick" />
	<BluetoothDialogConnection v-model="dlgConnection" />
</template>

<script lang="ts">
import { ref, computed, inject, Ref } from 'vue';
import { useQuasar } from 'quasar';
import { lang } from '@/boot/i18n';

import BluetoothDialogConnection from './BluetoothDialogConnection.vue';

export default {
	name: 'BluetoothBtn',
	components: { BluetoothDialogConnection },
	setup() {
		const $q = useQuasar();
		const store: Ref | undefined = inject('store');
		const { bluetooth } = store?.value;

		// статус диалога подключения к Bluetooth
		const dlgConnection = ref(true);
		// иконка кнопки подключения к Bluetooth
		const iconClass = computed(() => (bluetooth.connected ? 'bluetooth' : 'bluetooth_disabled'));

		/** Событие клика по кнопке Bluetooth */
		const onBtnClick = () => {
			if (!bluetooth.connected) dlgConnection.value = true;
			else
				$q.notify({
					message: lang('BLE_Connected'),
					position: 'bottom',
					color: 'green'
				});
		};

		return {
			dlgConnection,
			iconClass,
			onBtnClick
		};
	}
};
</script>
