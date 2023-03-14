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
			<v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>

	<device-info-dialog v-model="visibleDeviceInfo" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import canbus, { API_EVENT_CAR_CONFIG, API_EVENT_CONFIGS } from "@/api/canbus";
const pkg = require("/package.json");

import DialogTemplate from "@/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/layout/components/DeviceInfoDialog.vue";

import { ILooseObject } from "@/models/interfaces/ILooseObject";
import { IConfigs } from "@/models/pjcan/configs";
import { ICarConfig } from "@/models/pjcan/car";

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
		const carSupport = ref("Mazda");
		const modelInfo = computed(() =>
		{
			const result: ILooseObject = {
				version: pkg.version,
				versionFirmware: versionFirmware.value,
				carSupport: carSupport.value,
				author: pkg.author
			};
			return result;
		});

		/**
		 * Обновление версии
		 * @param {IConfigs} res Общая конфигурация
		 */
		const onReceiveConfigs = (res: IConfigs): void =>
		{
			versionFirmware.value = res.version.toString;
		};

		/**
		 * Входящие конфигурации автомобиля
		 * @param {ICarConfig} res
		 */
		const onReceiveCarConfig = (res: ICarConfig): void =>
		{
			if (res.isData)
			{
				switch (res.carModel)
				{
					case 1:
						carSupport.value = "Mazda 3 BK";
						break;
					case 2:
						carSupport.value = "Mazda CX7";
						break;
					default:
						carSupport.value = "Mazda";
						break;
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
			canbus.addListener(API_EVENT_CONFIGS, onReceiveConfigs);
			canbus.addListener(API_EVENT_CAR_CONFIG, onReceiveCarConfig);
			onReceiveCarConfig(canbus.configs.car);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_EVENT_CONFIGS, onReceiveConfigs);
			canbus.removeListener(API_EVENT_CAR_CONFIG, onReceiveCarConfig);
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
