<template>
	<q-dialog class="DialogUpdateFirmware" v-model="visibleQuestion">
		<q-card>
			<q-card-section class="row">
				<q-avatar icon="update" color="primary" text-color="white" />
				<span class="q-ml-md">{{ message }}</span>
			</q-card-section>

			<q-card-actions align="right">
				<q-btn flat :label="$t('UpdateFirmware_Later')" color="green" v-close-popup @click="onCancel" />
				<q-btn flat :label="$t('UpdateFirmware_Update')" color="green" v-close-popup @click="onUpdateUpload" />
			</q-card-actions>
		</q-card>
	</q-dialog>

	<q-dialog class="DialogUpdateFirmware-process" v-model="visibleUpdate" persistent>
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
					:value="updateFirmware.uploading"
				/>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Store from '@/store';
import { Timeout } from '@/models/types';

import { Bluetooth } from '@/components/bluetooth';
import UpdateFirmware from '@/components/update-firmware/update-firmware';
import { BLUETOOTH_EVENT_CONNECTED, EConnectedStatus } from '@/components/bluetooth/bluetooth';
import { UPDATE_UPLOAD_EVENT_RESULT } from '@/models/pjcan/update/upload';
import { UPDATE_BEGIN_EVENT_RESULT } from '@/models/pjcan/update/begin';

const DELAY_CHECK_VERSION = 60000;

export default defineComponent({
	name: 'DialogUpdateFirmware',

	data() {
		return {
			visibleQuestion: false, // показать вопрос
			visibleUpdate: false, // показать процесс обновления
			timerCheckVersion: undefined as Timeout, // таймер проверки обновлений
			updated: false, // статус обновления прошивки устройства (устройство перезагружается)

			indeterminate: true, // не определенное состояние загрузки
			updateMessage: '', // сообщение в диалоговом окне
			uploading: '' // % загрузки
		};
	},

	computed: {
		updateFirmware(): UpdateFirmware {
			return Store.updateFirmware;
		},
		bluetooth(): Bluetooth {
			return Store.bluetooth;
		},
		message(): string {
			return `Доступна новая версия прошивки устройства PJCAN. Обновить до версии ${this.updateFirmware.newVersion.toString} ?`;
		}
	},

	mounted() {
		// событие подключения по Bluetooth
		this.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, (status: EConnectedStatus) => {
			if (status === EConnectedStatus.CONNECT) {
				if (this.updated) {
					this.$q.notify({
						message: 'Прошивка успешно завершена',
						position: 'bottom',
						color: 'green'
					});
					this.updated = false;
				}
				this.onCheckVersion(5000);
			} else this.onCancel();
		});

		// событие загрузки прошивки на устройство PJCAN
		this.updateFirmware.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, (result: boolean) => {
			if (result) {
				if (this.indeterminate) {
					this.updateMessage = 'Загрузка прошивки ...';
					this.indeterminate = false;
				}
				this.uploading = (this.updateFirmware.uploading * 100).toFixed(2) + '%';
				if (this.updateFirmware.resultUpload.offset === this.updateFirmware.resultUpload.data.byteLength)
					this.updateFirmware.begin();
			} else this.onErrorUpdate();
		});

		// событие успешного начала прошивки устройства
		this.updateFirmware.resultBegin.addListener(UPDATE_BEGIN_EVENT_RESULT, (result: boolean) => {
			this.updated = result;
			if (result) {
				this.updateMessage = 'Обновление прошивки ...';
				this.uploading = '';
				this.indeterminate = true;
			} else this.onErrorUpdate();
		});
	},

	methods: {
		/**
		 * Проверка версии прошивки
		 * @param delay Пауза проверки обновления
		 */
		onCheckVersion(delay: number): void {
			this.timerCheckVersion = setTimeout(() => {
				if (this.bluetooth.connected && Store.version.is)
					this.updateFirmware
						.checkNewVersion()
						.then(() => {
							this.visibleQuestion = true;
						})
						.catch(() => {
							this.onCheckVersion(DELAY_CHECK_VERSION);
						});
				else this.onCheckVersion(DELAY_CHECK_VERSION);
			}, delay);
		},

		/** Запустить обновление прошики */
		onUpdateUpload(): void {
			clearTimeout(this.timerCheckVersion);

			this.updateMessage = 'Подготовка к загрузке ...';
			this.uploading = '0%';
			this.visibleUpdate = true;
			this.updateFirmware.upload();
		},

		/** Ошибка обновления */
		onErrorUpdate(): void {
			this.$q.notify({
				message: this.$t('UpdateFirmware_Error'),
				position: 'bottom',
				color: 'red'
			});
			this.onCancel();
		},

		/** Отменить обновление */
		onCancel(): void {
			clearTimeout(this?.timerCheckVersion);
			this.updateFirmware.clear();
			this.visibleQuestion = false;
			this.visibleUpdate = false;
		}
	}
});
</script>

<style lang="sass">
.DialogUpdateFirmware
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
