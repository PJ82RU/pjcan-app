<template>
	<dialog-template
		content-class="about"
		v-model="visible"
		:title="$t('about.title')"
		icon="on-board"
		width="400px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col v-for="(item, key) in modelInfo" :key="'info-' + key" cols="12" class="height-48 mb-4">
					<v-text-field
						:model-value="item"
						:label="$t('about.' + key)"
						variant="underlined"
						:disabled="item.length === 0"
						readonly
						dense
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="onDeviceInfoClick">
				{{ $t("btn.deviceInfo") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>

	<device-info-dialog v-model="visibleDeviceInfo" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import canbus, { API_EVENT_CONFIGS, API_EVENT_DEVICE } from "@/api/canbus";
const pkg = require("/package.json");
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/layout/components/DeviceInfoDialog.vue";

import { getSerial } from "@/api/hash";

import { API_EXEC_DEVICE_CONFIG, API_EXEC_DEVICE_VALUE, IDeviceValue } from "@/models/pjcan/device";
import { ILooseObject } from "@/models/interfaces/ILooseObject";
import { IConfigs } from "@/models/pjcan/configs";

export default {
	name: "AboutDialog",
	components: { DialogTemplate, DeviceInfoDialog },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { t } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const visibleDeviceInfo = ref(false);
		const versionFirmware = ref("");
		const shaDevice = ref("");
		const modelInfo = computed(() =>
		{
			const result: ILooseObject = {
				version: pkg.version,
				versionFirmware: versionFirmware.value,
				carSupport: "Mazda 3 BK",
				author: pkg.author
			};
			if (!canbus.values.device.activation) result.sha = shaDevice.value;
			return result;
		});

		/** Обновление версии */
		const updateInfo = (configs: IConfigs): void =>
		{
			versionFirmware.value = configs.version.toString;
		};
		let attempt: boolean = false;
		/** Обновление конфигурации устройства */
		const onDevice = (res: IDeviceValue): void =>
		{
			if (res.isData)
			{
				if (!shaDevice.value.length)
				{
					let sha = "";
					res.sha.forEach((x) =>
					{
						const hex = x.toString(16);
						sha += (hex.length === 1 ? "0" : "") + hex;
					});
					shaDevice.value = sha;
				}

				if (!attempt && !res.activation)
				{
					attempt = true;
					getSerial(shaDevice.value)
						.then((res: any) =>
						{
							canbus.configs.device.serial = res?.sha ?? "";
							canbus.queryConfig(API_EXEC_DEVICE_CONFIG);
							canbus.values.device.save = true;
							canbus.values.device.reboot = true;
							canbus.queryValue(API_EXEC_DEVICE_VALUE);
							toast.success(t("activation.success"));
						})
						.catch(() =>
						{
							toast.error(t("activation.error"));
						});
				}
			}
		};

		/** Открыть попап технической информации */
		const onDeviceInfoClick = (): void =>
		{
			visible.value = false;
			visibleDeviceInfo.value = true;
		};

		onMounted(() =>
		{
			canbus.addListener(API_EVENT_CONFIGS, updateInfo);
			canbus.addListener(API_EVENT_DEVICE, onDevice);
			onDevice(canbus.values.device);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_CONFIGS, updateInfo);
			canbus.removeListener(API_EVENT_DEVICE, onDevice);
		});

		return {
			visible,
			visibleDeviceInfo,
			modelInfo,
			onDeviceInfoClick
		};
	}
};
</script>
