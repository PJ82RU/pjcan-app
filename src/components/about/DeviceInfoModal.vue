<template>
	<q-dialog class="DeviceInfoModal" v-model="visible">
		<q-card class="DeviceInfoModal-card">
			<q-card-section class="DeviceInfoModal-card-title">
				<IconCustom
					class="DeviceInfoModal-card-title-icon"
					name="device"
					color="primary"
					color-secondary="secondary"
					:size="24"
				/>
				<div class="text-h6">{{ $t('DeviceInfo') }}</div>
			</q-card-section>

			<q-card-section class="DeviceInfoModal-card-body scroll">
				<CardSectionInput
					:title="$t('DeviceInfo_ChipCores')"
					v-model="deviceInfo.chipCores"
					readonly
					type="number"
				/>
				<CardSectionInput :title="$t('DeviceInfo_ChipModel')" v-model="deviceInfo.chipModel" readonly />
				<CardSectionInput
					:title="$t('DeviceInfo_ChipRevision')"
					v-model="deviceInfo.chipRevision"
					readonly
					type="number"
				/>
				<CardSectionInput
					:title="$t('DeviceInfo_CpuFreqMHz')"
					v-model="deviceInfo.cpuFreqMHz"
					readonly
					type="number"
				/>
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_CycleCount')"-->
				<!--	v-model="deviceInfo.cycleCount"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<CardSectionInput :title="$t('DeviceInfo_EfuseMac')" v-model="efuseMac" readonly />
				<CardSectionInput
					:title="$t('DeviceInfo_FlashChipMode')"
					v-model="deviceInfo.flashChipMode"
					readonly
					type="number"
				/>
				<CardSectionInput
					:title="$t('DeviceInfo_FlashChipSize')"
					v-model="deviceInfo.flashChipSize"
					readonly
					type="number"
				/>
				<CardSectionInput
					:title="$t('DeviceInfo_FlashChipSpeed')"
					v-model="deviceInfo.flashChipSpeed"
					readonly
					type="number"
				/>
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_HeapSize')"-->
				<!--	v-model="deviceInfo.heapSize"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_FreeHeap')"-->
				<!--	v-model="deviceInfo.freeHeap"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_MaxAllocHeap')"-->
				<!--	v-model="deviceInfo.maxAllocHeap"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_MinFreeHeap')"-->
				<!--	v-model="deviceInfo.minFreeHeap"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_PsramSize')"-->
				<!--	v-model="deviceInfo.psramSize"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_FreePsram')"-->
				<!--	v-model="deviceInfo.freePsram"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_MaxAllocPsram')"-->
				<!--	v-model="deviceInfo.maxAllocPsram"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<!--<CardSectionInput-->
				<!--	:title="$t('DeviceInfo_MinFreePsram')"-->
				<!--	v-model="deviceInfo.minFreePsram"-->
				<!--	readonly-->
				<!--	type="number"-->
				<!--/>-->
				<CardSectionInput :title="$t('DeviceInfo_SdkVersion')" v-model="deviceInfo.sdkVersion" readonly />
				<CardSectionInput :title="$t('DeviceInfo_SketchMD5')" v-model="deviceInfo.sketchMD5" readonly />
				<CardSectionInput
					:title="$t('DeviceInfo_SketchSize')"
					v-model="deviceInfo.sketchSize"
					readonly
					type="number"
				/>
				<CardSectionInput
					:title="$t('DeviceInfo_FreeSketchSpace')"
					v-model="deviceInfo.freeSketchSpace"
					readonly
					type="number"
				/>
			</q-card-section>

			<q-card-actions class="DeviceInfoModal-card-actions" align="right">
				<q-btn label="OK" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import api, { API_EVENT_INFO } from '@/store/api';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import IconCustom from '@/components/common/iconCustom';
import { DeviceInfo, IDeviceInfo } from '@/models/pjcan';

export default {
	name: 'DeviceInfoModal',
	components: { CardSectionInput, IconCustom },
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue'],
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit('update:modelValue', val)
		});

		// данные об устройстве
		const deviceInfo = ref(new DeviceInfo());
		// входящие значения об устройстве
		const onReceiveInfo = (res: IDeviceInfo): void => {
			deviceInfo.value.setModel(res);
		};
		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_INFO, onReceiveInfo);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_INFO, onReceiveInfo);
		});
		// запрос данных об устройстве
		watch(modelValue, (val: boolean): void => {
			if (val) api.send(deviceInfo.value);
		});

		const efuseMac = computed({
			get: (): string => {
				let result: string = deviceInfo.value.efuseMac.toString(16).toUpperCase();
				return result.length % 2 > 0 ? '0' + result : result;
			},
			set: () => {}
		});

		return {
			visible,
			deviceInfo,
			efuseMac
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.DeviceInfoModal
	@include dialog()

	.CardSectionInput
		&-header
			width: calc(100% - 150px)

		&-input
			width: 150px
</style>
