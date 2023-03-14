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

import DialogTemplate from "@/components/DialogTemplate.vue";
import DeviceResetDialog from "./DeviceResetDialog.vue";

import canbus, { API_EVENT_INFO } from "@/api/canbus";

import { IDeviceInfo } from "@/models/pjcan/device";
import { IMessage } from "@/models/interfaces/message/IMessage";
import Scanner from "@/layout/components/Scanner.vue";

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
				// value.chipCores = canbus.deviceInfo.chipCores.toString();
				// value.chipRevision = canbus.deviceInfo.chipRevision.toString();
				value.cpuFreqMHz = canbus.deviceInfo.cpuFreqMHz.toString();
				let mac: string = canbus.deviceInfo.efuseMac.toString(16);
				mac = mac.length % 2 > 0 ? "0" + mac : mac;
				value.efuseMac = "";
				for (let i = mac.length - 2; i >= 0; i -= 2) value.efuseMac += mac[i] + mac[i + 1] + (i > 0 ? ":" : "");
				// value.flashChipMode = canbus.deviceInfo.flashChipMode.toString();
				// value.flashChipSize = canbus.deviceInfo.flashChipSize.toString();
				// value.flashChipSpeed = canbus.deviceInfo.flashChipSpeed.toString();
				value.freeSketchSpace = canbus.deviceInfo.freeSketchSpace.toString();
				value.sdkVersion = canbus.deviceInfo.sdkVersion;
				value.sketchMD5 = canbus.deviceInfo.sketchMD5;
				value.sketchSize = canbus.deviceInfo.sketchSize.toString();
				value.temperatureChip = (canbus.deviceInfo.temperatureChip / 100).toFixed(2) + "°C";
				value.sha = canbus.sha ?? "";
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
