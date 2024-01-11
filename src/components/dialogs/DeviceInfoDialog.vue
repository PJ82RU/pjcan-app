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
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceResetDialog from "./DeviceResetDialog.vue";
import Scanner from "@/components/Scanner.vue";

import { toMac } from "@/utils/conversion";

import { API_DEVICE_INFO_EVENT, DeviceInfo, IDeviceInfo } from "@/models/pjcan/device";
import { IMessage } from "@/models/interfaces/message/IMessage";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { Timeout } from "@/models/types/Timeout";

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
		const visibleReset = ref(false);
		const startedScanner = ref(false);
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

		/** Повторный запрос данных при отображении попап */
		watch(modelValue, (val: boolean): void =>
		{
			onLoop(val && canbus.begin);
		});

		/** Показать диалог сброса настроек */
		const onResetClick = (): void =>
		{
			visible.value = false;
			visibleReset.value = true;
		};

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

		/** Входящие значения об устройстве */
		const onReceiveDeviceInfo = (res: IDeviceInfo): void =>
		{
			isLoadedValue.value = res.isData;
			if (res.isData)
			{
				const { value } = modelDeviceInfo;
				// value.chipCores = res.chipCores.toString();
				// value.chipRevision = res.chipRevision.toString();
				value.cpuFreqMHz = res.cpuFreqMHz.toString();
				value.efuseMac = toMac(res.efuseMac);
				// value.flashChipMode = res.flashChipMode.toString();
				// value.flashChipSize = res.flashChipSize.toString();
				// value.flashChipSpeed = res.flashChipSpeed.toString();
				value.freeSketchSpace = res.freeSketchSpace.toString();
				value.sdkVersion = res.sdkVersion;
				value.sketchMD5 = res.sketchMD5;
				value.sketchSize = res.sketchSize.toString();
				value.temperatureChip = (res.temperatureChip / 100).toFixed(2) + "°C";
				value.sha = canbus.sha ?? "";
			}
		};

		let loop: Timeout;
		const onLoop = (enabled: boolean) =>
		{
			if (enabled)
			{
				if (!loop) loop = setInterval(() => canbus.query(new DeviceInfo(), true), 10000);
				canbus.query(new DeviceInfo(), true);
			}
			else
			{
				clearInterval(loop);
				loop = undefined;
			}
		};
		const onBegin = (status: boolean): void =>
		{
			onLoop(modelValue.value && status);
		};
		onMounted(() =>
		{
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			canbus.addListener(API_DEVICE_INFO_EVENT, onReceiveDeviceInfo);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
			canbus.removeListener(API_DEVICE_INFO_EVENT, onReceiveDeviceInfo);
		});

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
