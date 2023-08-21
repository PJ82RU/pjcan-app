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
                        class="about__text-field"
						:label="$t('about.' + key)"
						variant="underlined"
						:disabled="item.length === 0"
                        :append-icon="key === 'carSupport' ? 'mdi-pen' : undefined"
						readonly
						dense
                        @click:append="onEditClick(key)"
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
    <choosing-car-model-dialog v-model="visibleCarModel" :car-model="carModel" @click:apply="onCarModelApplyClick" />
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/components/dialogs/DeviceInfoDialog.vue";
import ChoosingCarModelDialog from "@/components/dialogs/ChoosingCarModelDialog.vue";

import { ILooseObject } from "@/models/interfaces/ILooseObject";
import { API_CONFIGS_EVENT, IConfigs } from "@/models/pjcan/configs";
import { API_CAR_CONFIG_EVENT, API_CAR_CONFIG_EXEC, ICarConfig } from "@/models/pjcan/car";

import canbus from "@/api/canbus";

const pkg = require("/package.json");

export default {
	name: "AboutDialog",
	components: { ChoosingCarModelDialog, DialogTemplate, DeviceInfoDialog },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { tm, te } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const visibleDeviceInfo = ref(false);
		const versionFirmware = ref("");
		const carSupport = ref("Mazda");
		const carModel = ref(0);
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
		const visibleCarModel = ref(false);

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
				const key = "choosingCarModel.carModels." + res.carModel;
				carSupport.value = te(key) ? tm(key) : tm("choosingCarModel.carModels.0");
				carModel.value = res.carModel;
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
			canbus.addListener(API_CONFIGS_EVENT, onReceiveConfigs);
			canbus.addListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
			onReceiveCarConfig(canbus.configs.car);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CONFIGS_EVENT, onReceiveConfigs);
			canbus.removeListener(API_CAR_CONFIG_EVENT, onReceiveCarConfig);
		});

		const onEditClick = (key: string): void =>
		{
			if (key === "carSupport") visibleCarModel.value = true;
		};
		const onCarModelApplyClick = (carModel: number): void =>
		{
			visibleCarModel.value = false;
			if (canbus.configs.car.carModel !== carModel)
			{
				canbus.configs.car.carModel = carModel;
				canbus.queryConfig(API_CAR_CONFIG_EXEC);
			}
		};

		return {
			visible,
			visibleDeviceInfo,
			visibleCarModel,
			carModel,
			modelInfo,
			onDeviceInfoClick,
			onEditClick,
			onCarModelApplyClick
		};
	}
};
</script>

<style lang="scss" scoped>
.about {
    &__text-field {
        ::v-deep(.v-input__append) {
            padding-top: 25px;
        }
    }
}
</style>
