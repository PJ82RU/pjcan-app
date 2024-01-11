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
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/components/dialogs/DeviceInfoDialog.vue";
import ChoosingCarModelDialog from "@/components/dialogs/ChoosingCarModelDialog.vue";

import { ILooseObject } from "@/models/interfaces/ILooseObject";
import { API_MAZDA_CONFIG_EVENT, IMazdaConfig, MazdaConfig, TCarModel } from "@/models/pjcan/mazda";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

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
		const visibleCarModel = ref(false);
		const versionFirmware = ref("");
		const carSupport = ref("Mazda");
		const carModel = ref(TCarModel.CAR_MODEL_UNKNOWN);
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

		/** Открыть попап технической информации */
		const onDeviceInfoClick = (): void =>
		{
			visible.value = false;
			visibleDeviceInfo.value = true;
		};

		/**
		 * Выбор модели автомобиля
		 * @param {string} key Ключ
		 */
		const onEditClick = (key: string): void =>
		{
			if (key === "carSupport") visibleCarModel.value = true;
		};
		/**
		 * Применить выбранную модель автомобиля
		 * @param {number} id ID модели
		 */
		const onCarModelApplyClick = (id: number): void =>
		{
			visibleCarModel.value = false;
			if (canbus.mazda.carModel !== id)
			{
				canbus.mazda.carModel = id;
				canbus.query(canbus.mazda);
			}
		};

		/**
		 * Входящие конфигурации автомобиля
		 * @param {IMazdaConfig} res
		 */
		const onReceiveMazdaConfig = (res: IMazdaConfig): void =>
		{
			if (res.isData)
			{
				const key = "choosingCarModel.carModels." + res.carModel;
				carSupport.value = te(key) ? tm(key) : tm("choosingCarModel.carModels.0");
				carModel.value = res.carModel;
			}
		};

		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				versionFirmware.value = canbus.version.toString;
				if (!canbus.mazda.isData) canbus.query(new MazdaConfig(), true);
				else onReceiveMazdaConfig(canbus.mazda);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			canbus.addListener(API_MAZDA_CONFIG_EVENT, onReceiveMazdaConfig);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
			canbus.removeListener(API_MAZDA_CONFIG_EVENT, onReceiveMazdaConfig);
		});

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
