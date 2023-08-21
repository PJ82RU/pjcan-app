<template>
    <dialog-template
        content-class="choosing-car-model"
        v-model="visible"
        :title="$t('choosingCarModel.title')"
        icon="on-board"
        width="480px"
        text
        actions
    >
        <template #body>
            <v-row class="pb-2">
                <v-col cols="12">
                    <v-select
                        v-model="modelCarModel"
                        :label="$t('choosingCarModel.label')"
                        :items="carModels"
                        :hint="$t('choosingCarModel.description')"
                        variant="underlined"
                        item-title="label"
                        item-value="value"
                        persistent-hint
                    />
                </v-col>
            </v-row>
        </template>

        <template #btns>
            <v-btn color="primary" @click="$emit('click:apply', modelCarModel)">
                {{ $t("btn.apply") }}
            </v-btn>
            <v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
                {{ $t("btn.close") }}
            </v-btn>
        </template>
    </dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

export default {
	name: "ChoosingCarModelDialog",
	components: { DialogTemplate },
	props: {
		modelValue: Boolean,
		carModel: Number
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, carModel } = toRefs(props);
		const { tm } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const carModels = computed((): object[] =>
		{
			const list: any = tm("choosingCarModel.carModels");
			const result = [];
			for (const key in list) if (key !== "0") result.push({ label: list[key], value: Number(key) });
			return result;
		});

		const modelCarModel = ref(carModel.value);
		watch(modelValue, (): void =>
		{
			if (modelValue.value) modelCarModel.value = carModel.value;
		});
		watch(carModel, (): void => (modelCarModel.value = carModel.value));

		return {
			visible,
			carModels,
			modelCarModel
		};
	}
};
</script>
