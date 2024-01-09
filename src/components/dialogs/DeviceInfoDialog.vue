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
			<v-btn color="secondary" icon="mdi-magnify-scan" :disabled="!isLoadedValue" @click="onScanClick" />
			<v-btn color="secondary" icon="mdi-restart" :disabled="!isLoadedValue" @click="onResetClick" />
			<v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>

	<device-reset-dialog v-model="visibleReset" />
	<scanner v-model="startedScanner" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceResetDialog from "./DeviceResetDialog.vue";
import Scanner from "@/components/Scanner.vue";

import { toMac } from "@/utils/conversion";

import { API_DEVICE_INFO_EVENT, API_DEVICE_INFO_EXEC, IDeviceInfo } from "@/models/pjcan/device";
import { IMessage } from "@/models/interfaces/message/IMessage";

import canbus from "@/api/canbus";

export default {
	name: "DeviceInfoDialog",
	components: { Scanner, DialogTemplate, DeviceResetDialog },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, context: any)
	{
		const { t } = useI18n();
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const isLoadedValue = ref(false);
		const modelDeviceInfo = ref({
			temperatureChip: "",
			// chipCores: "",
			// chipRevision: "",
			cpuFreqMHz: "",
			sketchSize: "",
			freeSketchSpace: "",
			sdkVersion: "",
			efuseMac: "",
			// flashChipMode: "",
			// flashChipSize: "",
			// flashChipSpeed: "",
			sketchMD5: "",
			sha: ""
		});

		/** Входящие значения об устройстве */
		const onReceiveInfo = (res: IDeviceInfo): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				const { value } = modelDeviceInfo;
				// value.chipCores = canbus.device.info.chipCores.toString();
				// value.chipRevision = canbus.device.info.chipRevision.toString();
				value.cpuFreqMHz = canbus.device.info.cpuFreqMHz.toString();
				value.efuseMac = toMac(canbus.device.info.efuseMac);
				// value.flashChipMode = canbus.device.info.flashChipMode.toString();
				// value.flashChipSize = canbus.device.info.flashChipSize.toString();
				// value.flashChipSpeed = canbus.device.info.flashChipSpeed.toString();
				value.freeSketchSpace = canbus.device.info.freeSketchSpace.toString();
				value.sdkVersion = canbus.device.info.sdkVersion;
				value.sketchMD5 = canbus.device.info.sketchMD5;
				value.sketchSize = canbus.device.info.sketchSize.toString();
				value.temperatureChip = (canbus.device.info.temperatureChip / 100).toFixed(2) + "°C";
				value.sha = canbus.sha ?? "";
			}
		};

		onMounted(() =>
		{
			canbus.addListener(API_DEVICE_INFO_EVENT, onReceiveInfo);
			onReceiveInfo(canbus.device.info);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_DEVICE_INFO_EVENT, onReceiveInfo);
		});

		watch(modelValue, (val: boolean): void =>
		{
			if (val) canbus.queryValue(API_DEVICE_INFO_EXEC);
		});

		const visibleReset = ref(false);
		/** Показать диалог сброса настроек */
		const onResetClick = (): void =>
		{
			visible.value = false;
			visibleReset.value = true;
		};

		const startedScanner = ref(false);
		/** Показать диалог запроса на сканирование can-шины */
		const onScanClick = (): void =>
		{
			store.commit("app/setMessage", {
				title: t("scanner.dialog.title"),
				icon: "mdi-magnify-scan",
				text: t("scanner.dialog.text"),
				btns: [
					{
						title: t("scanner.btn.start"),
						on: () =>
						{
							setTimeout(() => (visible.value = false), 200);
							setTimeout(() => (startedScanner.value = true), 400);
						}
					},
					{ title: t("btn.close"), icon: "mdi-close" }
				]
			} as IMessage);
		};

		return {
			visible,
			isLoadedValue,
			modelDeviceInfo,
			visibleReset,
			startedScanner,
			onResetClick,
			onScanClick
		};
	}
};
</script>
