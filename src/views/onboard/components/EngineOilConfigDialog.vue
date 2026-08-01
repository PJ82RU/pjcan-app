<template>
	<dialog-template
		content-class="engine-oil-config"
		v-model="visible"
		:title="$t('onboard.engine.oilSettings.title')"
		icon="oil-statistic"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="configOilDurationHours"
						:label="$t('onboard.engine.oilSettings.oilDurationHours.title')"
						:hint="$t('onboard.engine.oilSettings.oilDurationHours.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<number-field
						v-model="configOilDistanceKm"
						:label="$t('onboard.engine.oilSettings.oilDistanceKm.title')"
						:hint="$t('onboard.engine.oilSettings.oilDistanceKm.description')"
						:min="0"
						:disabled="disabled"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-select
						v-model="configOilHoursLimitSelect"
						:label="$t('onboard.engine.oilSettings.oilHoursLimit.title')"
						:items="oilHoursLimitItems"
						:hint="$t('onboard.engine.oilSettings.oilHoursLimit.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="disabled"
					/>
				</v-col>
				<v-col v-if="configOilHoursLimitSelect === 'custom'" cols="12" class="pb-0">
					<number-field
						v-model="configOilHoursLimitCustom"
						:label="$t('onboard.engine.oilSettings.oilHoursLimitCustom.title')"
						:hint="$t('onboard.engine.oilSettings.oilHoursLimitCustom.description')"
						:min="150"
						:max="350"
						:disabled="disabled"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="resetOil">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="onApplyClick">
				<v-icon v-if="$vuetify.display.xs">mdi-check</v-icon>
				<span v-else> {{ $t("btn.apply") }} </span>
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				<v-icon v-if="$vuetify.display.xs">mdi-close</v-icon>
				<span v-else> {{ $t("btn.cancel") }} </span>
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import NumberField from "@/components/common/NumberField.vue";

export default {
	name: "EngineOilConfigDialog",
	components: { DialogTemplate, NumberField },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Общее время работы двигателя на текущем масле (в часах). */
		oilDurationHours: Number,
		/** Общий пробег автомобиля на текущем масле (в км). */
		oilDistanceKm: Number,
		/** Лимит моточасов, выбранный пользователем в Web UI (по умолчанию: 220). */
		oilHoursLimit: Number,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "click:apply", "click:resetOil"],
	setup(props: any, context: any)
	{
		const { modelValue, oilDurationHours, oilDistanceKm, oilHoursLimit } = toRefs(props);
		const { tm } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const configOilDurationHours = ref(0);
		const configOilDistanceKm = ref(0);
		const configOilHoursLimitSelect = ref<number | string>(0); // Может быть числом или "custom"
		const configOilHoursLimitCustom = ref(0);

		const oilHoursLimitItems = computed(() =>
		{
			const items = tm("onboard.engine.oilSettings.oilHoursLimitItems") as string[];
			const predefinedValues = [220, 250, 300, 180]; // Соответствующие значения для ILSAC, ACEA, PAO, Mineral

			return items.map((label, i) =>
			{
				if (i < predefinedValues.length)
				{
					return { label, value: predefinedValues[i] };
				}
				else
				{ // Это пункт "Свой лимит..."
					return { label, value: "custom" };
				}
			});
		});

		watch(visible, val =>
		{
			if (val)
			{
				configOilDurationHours.value = oilDurationHours.value ?? 0;
				configOilDistanceKm.value = oilDistanceKm.value ?? 0;

				const currentLimit = oilHoursLimit.value ?? 0;

				// Проверяем, соответствует ли текущий лимит одному из предопределенных
				const matchedItem = oilHoursLimitItems.value.find(item => item.value === currentLimit);

				if (matchedItem)
				{
					configOilHoursLimitSelect.value = currentLimit; // Выбираем само значение
					configOilHoursLimitCustom.value = 0;
				}
				else
				{
					// Если не соответствует, это пользовательское значение
					configOilHoursLimitSelect.value = "custom"; // Выбираем "Свой лимит..."
					configOilHoursLimitCustom.value = currentLimit;
				}
			}
		});

		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			let finalOilHoursLimit = 0;
			if (configOilHoursLimitSelect.value === "custom")
			{
				finalOilHoursLimit = configOilHoursLimitCustom.value;
			}
			else
			{
				finalOilHoursLimit = configOilHoursLimitSelect.value as number;
			}

			context.emit("click:apply", {
				oilDurationHours: configOilDurationHours.value,
				oilDistanceKm: configOilDistanceKm.value,
				oilHoursLimit: finalOilHoursLimit
			});
		};

		/** Сбросить значения полей на значения по умолчанию и закрыть диалог */
		const resetOil = (): void =>
		{
			context.emit("click:resetOil");
			visible.value = false;
		};

		return {
			visible,
			configOilDurationHours,
			configOilDistanceKm,
			configOilHoursLimitSelect,
			configOilHoursLimitCustom,
			oilHoursLimitItems,
			onApplyClick,
			resetOil
		};
	}
};
</script>
