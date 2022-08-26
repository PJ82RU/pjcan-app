<template>
	<q-dialog class="update-firmware-popup-process" v-model="visible" persistent>
		<q-card>
			<q-card-section class="update-firmware-popup-process__row row">
				<span>{{ message }}</span>
				<span>{{ uploading }}</span>
				<q-linear-progress
					v-if="indeterminate"
					stripe
					rounded
					indeterminate
					class="q-mt-sm"
					size="18px"
					color="primary"
				/>
				<q-linear-progress
					v-else
					stripe
					rounded
					class="q-mt-sm"
					size="18px"
					color="primary"
					:value="uploadingNumber"
				/>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs, watch, onMounted, onUnmounted } from 'vue';
import { lang } from '@/i18n/i18nUtils';
import { useQuasar } from 'quasar';
import api from '@/store/api';

import { BLUETOOTH_EVENT_CONNECTED, TConnectedStatus } from '@/components/bluetooth';
import { UPDATE_UPLOAD_EVENT_RESULT } from '@/models/pjcan';
import { UPDATE_BEGIN_EVENT_RESULT } from '@/models/pjcan';

export default defineComponent({
	name: 'UpdateFirmwarePopupProcess',
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue'],
	setup(props: any, context: any) {
		const $q = useQuasar();
		const { modelValue } = toRefs(props);
		const { bluetooth, updateFirmware } = api;

		// показать попап
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit('update:modelValue', val)
		});
		// не определенное состояние загрузки
		const indeterminate = ref(true);
		// сообщение в диалоговом окне
		const message = ref('');
		// % загрузки
		const uploading = ref('');
		// % загрузки (значение)
		const uploadingNumber = ref(0);

		/** Отменить обновление */
		const onCancel = (): void => {
			updateFirmware.clear();
			visible.value = false;
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

		/** Событие запуска прошивки */
		const onUpdateUpload = (): void => {
			message.value = lang('UpdFirmware_Preparation');
			uploading.value = '0%';
			visible.value = true;
			updateFirmware.upload();
		};

		/**
		 * Событие загрузки прошивки на устройство PJCAN
		 * @param {boolean} result Результат загрузки
		 */
		const onUpload = (result: boolean) => {
			if (result) {
				if (indeterminate.value) {
					message.value = lang('UpdFirmware_ProcessUpload');
					indeterminate.value = false;
				}
				uploading.value = (updateFirmware.uploading * 100).toFixed(2) + '%';
				uploadingNumber.value = updateFirmware.uploading;
				if (updateFirmware.resultUpload.offset === updateFirmware.resultUpload.data.byteLength)
					updateFirmware.begin();
			} else onErrorUpdate();
		};

		/**
		 * Событие успешного начала прошивки устройства
		 * @param {boolean} result Результат начала прошивки
		 */
		const onUpdate = (result: boolean) => {
			updateFirmware.isUpdated = result;
			if (result) {
				message.value = lang('UpdFirmware_ProcessUpdate');
				uploading.value = '';
				indeterminate.value = true;
			} else onErrorUpdate();
		};

		/**
		 * Событие завершения прошивки
		 * @param {TConnectedStatus} status Статус подключения Bluetooth
		 */
		const onUpdateCompleted = (status: TConnectedStatus) => {
			if (status !== TConnectedStatus.CONNECT) return;

			if (updateFirmware.isUpdated) {
				updateFirmware
					.checkNewVersion()
					.then(() =>
						$q.notify({
							message: lang('UpdFirmware_ProcessWarning'),
							position: 'bottom',
							color: 'primary'
						})
					)
					.catch(() =>
						$q.notify({
							message: lang('UpdFirmware_ProcessCompleted'),
							position: 'bottom',
							color: 'green'
						})
					);
				updateFirmware.isUpdated = false;
			}
			onCancel();
		};

		// регистрируем события
		onMounted(() => {
			bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, onUpdateCompleted);
			updateFirmware.resultUpload.addListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			updateFirmware.resultBegin.addListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
		});
		// удаляем события
		onUnmounted(() => {
			bluetooth.removeListener(BLUETOOTH_EVENT_CONNECTED, onUpdateCompleted);
			updateFirmware.resultUpload.removeListener(UPDATE_UPLOAD_EVENT_RESULT, onUpload);
			updateFirmware.resultBegin.removeListener(UPDATE_BEGIN_EVENT_RESULT, onUpdate);
		});

		watch(modelValue, (val: boolean): void => {
			if (val) onUpdateUpload();
		});

		return {
			visible,
			message,
			uploading,
			uploadingNumber,
			indeterminate
		};
	}
});
</script>

<style lang="sass">
@import "@/css/mixins"

.update-firmware-popup-process
	@include popup()

	width: 70%

	.q-card
		width: 500px

	&__row
		flex-direction: row
		justify-content: space-between
</style>
