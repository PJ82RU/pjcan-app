<template>
	<q-dialog class="DialogBluetoothConnection" v-model="visible" persistent>
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="bluetooth_disabled" color="primary" text-color="white" />
				<span class="q-ml-md">{{ $t('BluetoothConnection_NoConnected') }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn
					flat
					:label="$t('BluetoothConnection_BtnConnect')"
					color="green"
					v-close-popup
					@click="bluetooth.connect()"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Store from 'src/store';
import Bluetooth, { BLUETOOTH_EVENT_CONNECTED, EConnectedStatus } from '../bluetooth';

export default defineComponent({
	name: 'DialogBluetoothConnection',
	data() {
		return {
			visible: true
		};
	},
	computed: {
		bluetooth(): Bluetooth {
			return Store.bluetooth;
		}
	},
	mounted() {
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (status: EConnectedStatus) => {
			this.visible = status === EConnectedStatus.NO_CONNECT;
			switch (status) {
				case EConnectedStatus.CONNECT:
					this.$q.notify({
						message: this.$t('BluetoothConnection_Connected'),
						position: 'bottom',
						color: 'green'
					});
					break;

				case EConnectedStatus.WAIT_CONNECT:
					this.$q.notify({
						message: this.$t('BluetoothConnection_LostConnected'),
						position: 'bottom',
						color: 'red'
					});
					break;
			}
		});
	}
});
</script>

<style lang="sass">
.DialogBluetoothConnection .q-ml-md
    word-break: normal
    width: calc(100% - 64px)
</style>
