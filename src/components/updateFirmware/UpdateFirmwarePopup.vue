<template>
	<q-dialog class="UpdateFirmwarePopup" v-model="visible">
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="update" color="primary" text-color="white" />
				<span class="q-ml-md UpdateFirmwarePopup-message">{{ message }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn :label="$t('UpdFirmware_Later')" color="secondary" v-close-popup @click="onCancel" />
				<q-btn :label="$t('UpdFirmware_Update')" color="primary" v-close-popup @click="visibleProcess = true" />
			</q-card-actions>
		</q-card>
	</q-dialog>
	<UpdateFirmwarePopupProcess v-model="visibleProcess" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { lang } from '@/i18n/i18nUtils';
import api from '@/store/api';

import UpdateFirmwarePopupProcess from './UpdateFirmwarePopupProcess.vue';

import { BLUETOOTH_EVENT_CONNECTED, TConnectedStatus } from '@/components/bluetooth';
import { Timeout } from '@/models/types';

// таймаут проверки обновления 5 мин.
const DELAY_CHECK_VERSION = 300000;

export default defineComponent({
	name: 'UpdateFirmwarePopup',
	components: { UpdateFirmwarePopupProcess },
	setup() {
		const { bluetooth, version, updateFirmware } = api;

		// показать попап
		const visible = ref(false);
		// показать попап загрузки прошивки
		const visibleProcess = ref(false);
		// сообщение
		const message = ref('');
		// таймер проверки обновлений
		let timerCheckVersion: Timeout = undefined;

		/**
		 * Проверка версии прошивки
		 * @param delay Пауза проверки обновления
		 */
		const onCheckVersion = (delay: number): void => {
			timerCheckVersion = setTimeout(() => {
				if (!visibleProcess.value && bluetooth.connected && version.is) {
					updateFirmware
						.checkNewVersion()
						.then(() => {
							message.value = lang('UpdFirmware_New').replace('%', updateFirmware.newVersion.toString);
							visible.value = true;
						})
						.catch(() => onCheckVersion(DELAY_CHECK_VERSION));
				} else onCheckVersion(DELAY_CHECK_VERSION);
			}, delay);
		};

		/** Отменить обновление */
		const onCancel = (): void => {
			if (timerCheckVersion) clearTimeout(timerCheckVersion);
			updateFirmware.clear();
		};

		/**
		 * Событие подключения к Bluetooth
		 * @param {TConnectedStatus} status Статус подключения Bluetooth
		 */
		const onConnected = (status: TConnectedStatus) => {
			if (status === TConnectedStatus.CONNECT) onCheckVersion(5000);
			else if (timerCheckVersion) clearTimeout(timerCheckVersion);
		};

		// регистрируем события
		onMounted(() => {
			bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
		});
		// удаляем события
		onUnmounted(() => {
			bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onConnected);
		});

		return {
			visible,
			message,
			visibleProcess,
			onCancel
		};
	}
});
</script>

<style lang="sass">
@import "@/css/mixins"

.UpdateFirmwarePopup
	@include popup()
</style>
