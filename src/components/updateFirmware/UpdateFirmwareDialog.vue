<template>
	<q-dialog class="UpdateFirmwareDialog" v-model="visibleQuestion">
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="update" color="primary" text-color="white" />
				<span class="q-ml-md">{{ message }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat :label="$t('UpdFirmware_Later')" color="green" v-close-popup @click="onCancel" />
				<q-btn flat :label="$t('UpdFirmware_Update')" color="green" v-close-popup @click="onUpdateUpload" />
			</q-card-actions>
		</q-card>
	</q-dialog>

	<q-dialog class="UpdateFirmwareDialog-process" v-model="visibleUpdate" persistent>
		<q-card>
			<q-card-section class="row">
				<span>{{ updateMessage }}</span>
				<span>{{ uploading }}</span>
				<q-linear-progress
					class="q-mt-sm"
					dark
					stripe
					rounded
					size="20px"
					color="green"
					:indeterminate="indeterminate"
					:value="uploadingNumber"
				/>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, Ref } from 'vue';
import { lang } from '@/boot/i18n';
import { useQuasar } from 'quasar';

import { BLUETOOTH_EVENT_CONNECTED, EConnectedStatus } from '@/components/bluetooth';

import { UPDATE_UPLOAD_EVENT_RESULT } from '@/models/pjcan/update/UpdateData';
import { UPDATE_BEGIN_EVENT_RESULT } from '@/models/pjcan/update/UpdateBegin';
import { Timeout } from '@/models/types';

const DELAY_CHECK_VERSION = 60000;

export default defineComponent({
	name: 'UpdateFirmwareDialog',
	setup() {
		const $q = useQuasar();
		const store: Ref | undefined = inject('store');
		const { updateFirmware, bluetooth, version } = store?.value;

		const visibleQuestion = ref(false); // показать вопрос
		const visibleUpdate = ref(false); // показать процесс обновления
		const indeterminate = ref(true); // не определенное состояние загрузки
		const updateMessage = ref(''); // сообщение в диалоговом окне
		const uploading = ref(''); // % загрузки
		const uploadingNumber = computed(() => updateFirmware.uploading);
		const message = computed(
			(): string =>
				`Доступна новая версия прошивки устройства PJCAN. Обновить до версии ${updateFirmware.newVersion.toString} ?`
		);

		let timerCheckVersion = undefined as Timeout; // таймер проверки обновлений
		let updated = false; // статус обновления прошивки устройства (устройство перезагружается)

		/**
		 * Проверка версии прошивки
		 * @param delay Пауза проверки обновления
		 */
		const onCheckVersion = (delay: number): void => {
			timerCheckVersion = setTimeout(() => {
				if (bluetooth.connected && version.is)
					updateFirmware
						.checkNewVersion()
						.then(() => (visibleQuestion.value = true))
						.catch(() => onCheckVersion(DELAY_CHECK_VERSION));
				else onCheckVersion(DELAY_CHECK_VERSION);
			}, delay);
		};

		/** Запустить обновление прошивки */
		const onUpdateUpload = (): void => {
			clearTimeout(timerCheckVersion);

			updateMessage.value = 'Подготовка к загрузке ...';
			uploading.value = '0%';
			visibleUpdate.value = true;
			updateFirmware.upload();
		};

		/** Отменить обновление */
		const onCancel = (): void => {
			clearTimeout(timerCheckVersion);

			updateFirmware.clear();
			visibleQuestion.value = false;
			visibleUpdate.value = false;
		};

		/** Ошибка обновления */
		const onErrorUpdate = (): void => {
			$q.notify({
				message: lang('UpdFirmware_Error'),
				position: 'bottom',
				color: 'red'
			});
			onCancel();
		};

		// событие подключения по Bluetooth
		bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (status: EConnectedStatus) => {
			if (status === EConnectedStatus.CONNECT) {
				if (updated) {
					$q.notify({
						message: 'Прошивка успешно завершена',
						position: 'bottom',
						color: 'green'
					});
					updated = false;
				}
				onCheckVersion(5000);
			} else onCancel();
		});

		// событие загрузки прошивки на устройство PJCAN
		updateFirmware.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, (result: boolean) => {
			if (result) {
				if (indeterminate.value) {
					updateMessage.value = 'Загрузка прошивки ...';
					indeterminate.value = false;
				}
				uploading.value = (updateFirmware.uploading * 100).toFixed(2) + '%';
				if (updateFirmware.resultUpload.offset === updateFirmware.resultUpload.data.byteLength)
					updateFirmware.begin();
			} else onErrorUpdate();
		});

		// событие успешного начала прошивки устройства
		updateFirmware.resultBegin.addListener(UPDATE_BEGIN_EVENT_RESULT, (result: boolean) => {
			updated = result;
			if (result) {
				updateMessage.value = 'Обновление прошивки ...';
				uploading.value = '';
				indeterminate.value = true;
			} else onErrorUpdate();
		});

		return {
			visibleQuestion,
			visibleUpdate,
			indeterminate,
			updateMessage,
			uploading,
			uploadingNumber,
			message,
			onCancel,
			onUpdateUpload
		};
	}
});
</script>

<style lang="sass">
.UpdateFirmwareDialog
    .q-ml-md
        word-break: normal
        width: calc(100% - 64px)

    &-process
        width: 70%

        .q-card
            width: 500px

        .row
            display: flex
            flex-direction: row
            justify-content: space-between
</style>
