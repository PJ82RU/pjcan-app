<template>
	<dialog-template
		content-class="about"
		v-model="visible"
		:title="$t('deviceInfo.title')"
		icon="on-board"
		width="400px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col v-for="(item, key) in modelDeviceInfo" :key="'deviceInfo-' + key" cols="12" class="height-48 mb-2">
					<v-text-field
						:model-value="item"
						:label="$t('deviceInfo.' + key)"
						variant="underlined"
						:disabled="!isData"
						readonly
						dense
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from "vue";
import canbus, { API_EVENT_INFO } from "@/api/canbus";

import DialogTemplate from "@/components/DialogTemplate.vue";
import { DeviceInfo, IDeviceInfo } from "@/models/pjcan/device";

export default {
	name: "DeviceInfoModal",
	components: { DialogTemplate },
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

		/** Данные об устройстве */
		const deviceInfo = ref(new DeviceInfo());
		const isData = ref(false);

		/** MAC */
		const efuseMac = (): string =>
		{
			const result: string = deviceInfo.value.efuseMac.toString(16).toUpperCase();
			return result.length % 2 > 0 ? "0" + result : result;
		};

		const modelDeviceInfo = computed(() => ({
			chipCores: isData.value ? deviceInfo.value.chipCores : "",
			chipRevision: isData.value ? deviceInfo.value.chipRevision : "",
			cpuFreqMHz: isData.value ? deviceInfo.value.cpuFreqMHz : "",
			efuseMac: isData.value ? efuseMac() : "",
			flashChipMode: isData.value ? deviceInfo.value.flashChipMode : "",
			flashChipSize: isData.value ? deviceInfo.value.flashChipSize : "",
			flashChipSpeed: isData.value ? deviceInfo.value.flashChipSpeed : "",
			freeSketchSpace: isData.value ? deviceInfo.value.freeSketchSpace : "",
			sdkVersion: deviceInfo.value.sdkVersion,
			sketchMD5: deviceInfo.value.sketchMD5,
			sketchSize: isData.value ? deviceInfo.value.sketchSize : ""
		}));

		/** Входящие значения об устройстве */
		const onReceiveInfo = (res: IDeviceInfo): void =>
		{
			deviceInfo.value.setModel(res);
			isData.value = true;
		};

		onMounted(() =>
		{
			canbus.addListener(API_EVENT_INFO, onReceiveInfo);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_INFO, onReceiveInfo);
		});

		watch(modelValue, (val: boolean): void =>
		{
			if (val) canbus.send(deviceInfo.value);
		});

		return {
			visible,
			modelDeviceInfo,
			isData
		};
	}
};
</script>
