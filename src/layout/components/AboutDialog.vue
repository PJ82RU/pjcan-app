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
import canbus, { API_EVENT_CONFIGS, API_EVENT_DEVICE_CONFIG } from "@/api/canbus";
const pkg = require("/package.json");

import DialogTemplate from "@/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/layout/components/DeviceInfoDialog.vue";

import { IConfigs } from "@/models/pjcan/configs";
import { IDeviceConfig } from "@/models/pjcan/device";

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
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const visibleDeviceInfo = ref(false);
		const versionFirmware = ref("");
		const shaDevice = ref("");
		const modelInfo = computed(() => ({
			version: pkg.version,
			versionFirmware: versionFirmware.value,
			carSupport: "Mazda 3 BK",
			author: pkg.author,
			sha: shaDevice.value
		}));

		/** Обновление версии */
		const updateInfo = (configs: IConfigs): void =>
		{
			versionFirmware.value = configs.version.toString;
			if (!shaDevice.value.length) canbus.queryDevice(true);
		};
		/** Обновление конфигурации устройства */
		const onDeviceConfig = (res: IDeviceConfig): void =>
		{
			if (res.isData)
			{
				let sha = "";
				res.sha.forEach(x => (sha += x.toString(16)));
				shaDevice.value = sha;
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
			canbus.addListener(API_EVENT_DEVICE_CONFIG, onDeviceConfig);
			onDeviceConfig(canbus.device.config);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_CONFIGS, updateInfo);
			canbus.removeListener(API_EVENT_DEVICE_CONFIG, onDeviceConfig);
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
