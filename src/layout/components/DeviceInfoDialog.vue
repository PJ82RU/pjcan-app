<template>
	<dialog-template
		content-class="device-info"
		v-model="visible"
		:title="$t('deviceInfo.title')"
		icon="on-board"
		width="400px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col
					v-for="(item, key) in modelDeviceInfo"
					:key="'deviceInfo-' + key"
					cols="12"
					class="height-48 mb-2"
				>
					<v-text-field
						:model-value="item"
						:label="$t('deviceInfo.' + key)"
						variant="underlined"
						:disabled="!isLoadedValue"
						readonly
						dense
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="onResetClick">
				{{ $t("btn.deviceReset") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>

	<device-reset-dialog v-model="visibleReset" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from "vue";

import DialogTemplate from "@/components/DialogTemplate.vue";
import DeviceResetDialog from "./DeviceResetDialog.vue";

import canbus, { API_EVENT_INFO } from "@/api/canbus";

import { IDeviceInfo } from "@/models/pjcan/device";

export default {
	name: "DeviceInfoDialog",
	components: { DialogTemplate, DeviceResetDialog },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, context: any)
	{
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const isLoadedValue = ref(false);
		const modelDeviceInfo = ref({
			chipCores: "",
			chipRevision: "",
			cpuFreqMHz: "",
			efuseMac: "",
			flashChipMode: "",
			flashChipSize: "",
			flashChipSpeed: "",
			freeSketchSpace: "",
			sdkVersion: "",
			sketchMD5: "",
			sketchSize: "",
			temperatureChip: ""
		});

		/** Входящие значения об устройстве */
		const onReceiveInfo = (res: IDeviceInfo): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				const { value } = modelDeviceInfo;
				value.chipCores = canbus.deviceInfo.chipCores.toString();
				value.chipRevision = canbus.deviceInfo.chipRevision.toString();
				value.cpuFreqMHz = canbus.deviceInfo.cpuFreqMHz.toString();
				const mac: string = canbus.deviceInfo.efuseMac.toString(16).toUpperCase();
				value.efuseMac = mac.length % 2 > 0 ? "0" + mac : mac;
				value.flashChipMode = canbus.deviceInfo.flashChipMode.toString();
				value.flashChipSize = canbus.deviceInfo.flashChipSize.toString();
				value.flashChipSpeed = canbus.deviceInfo.flashChipSpeed.toString();
				value.freeSketchSpace = canbus.deviceInfo.freeSketchSpace.toString();
				value.sdkVersion = canbus.deviceInfo.sdkVersion;
				value.sketchMD5 = canbus.deviceInfo.sketchMD5;
				value.sketchSize = canbus.deviceInfo.sketchSize.toString();
				value.temperatureChip = canbus.deviceInfo.temperatureChip.toFixed(2) + "°C";
			}
		};

		onMounted(() =>
		{
			canbus.addListener(API_EVENT_INFO, onReceiveInfo);
			onReceiveInfo(canbus.deviceInfo);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_INFO, onReceiveInfo);
		});

		watch(modelValue, (val: boolean): void =>
		{
			if (val) canbus.queryDeviceInfo();
		});

		const visibleReset = ref(false);
		/** Показать диалог сброса настроек */
		const onResetClick = (): void =>
		{
			visible.value = false;
			visibleReset.value = true;
		};

		return {
			visible,
			isLoadedValue,
			modelDeviceInfo,
			visibleReset,
			onResetClick
		};
	}
};
</script>
