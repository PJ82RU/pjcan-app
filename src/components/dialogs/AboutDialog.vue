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
import { computed, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceInfoDialog from "@/components/dialogs/DeviceInfoDialog.vue";
import ChoosingCarModelDialog from "@/components/dialogs/ChoosingCarModelDialog.vue";

import { ILooseObject } from "@/models/interfaces/ILooseObject";
import { TCarModel } from "@/models/pjcan/mazda";

const pkg = require("/package.json");

export default {
	name: "AboutDialog",
	components: { ChoosingCarModelDialog, DialogTemplate, DeviceInfoDialog },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
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
		const versionFirmware = computed((): String => store.getters["config/version"].toString);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);
		const carSupport = computed((): string =>
		{
			const key = "choosingCarModel.carModels." + carModel.value;
			return te(key) ? tm(key) : tm("choosingCarModel.carModels.0");
		});
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
		const onEditClick = (key: string | number): void =>
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
			if (store.getters["config/mazda"].carModel !== id)
			{
				store.commit("config/setMazdaCarModel", id);
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
