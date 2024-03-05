<template>
	<card class="settings-card" :title="title" :custom="icon">
		<template #body>
			<v-row>
				<v-col cols="12">
					<input-card-item
						:value="resistanceMax > 0 ? resistanceMin + ' - ' + resistanceMax : ''"
						:title="$t('buttons.resistance.title')"
						:description="$t('buttons.resistance.description')"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="pressSingle"
						:label="$t('buttons.pressSingle.title')"
						:items="functionsList"
						:hint="$t('buttons.pressSingle.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="extended"
						:title="$t('buttons.extended.title')"
						:description="$t('buttons.extended.description')"
						color="primary"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="pressDual"
						:label="$t('buttons.pressDual.title')"
						:items="functionsList"
						:hint="$t('buttons.pressDual.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="pressTriple"
						:label="$t('buttons.pressTriple.title')"
						:items="functionsList"
						:hint="$t('buttons.pressTriple.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="pressHold"
						:label="$t('buttons.pressHold.title')"
						:items="functionsList"
						:hint="$t('buttons.pressHold.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="hold"
						:label="$t('buttons.pressHold.time.title')"
						:hint="$t('buttons.pressHold.time.description')"
						:min="1"
						:max="255"
						:disabled="!configLoaded || !extended"
						@change="$emit('update', config)"
					/>
				</v-col>
				<v-col cols="12" class="pt-6">
					<span class="settings-card__mode-title">{{ $t("buttons.extendedMode") }}</span>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modePressSingle"
						:label="$t('buttons.pressSingle.title') + $t('buttons.hintMode')"
						:items="functionsList"
						:hint="$t('buttons.pressSingle.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modePressDual"
						:label="$t('buttons.pressDual.title') + $t('buttons.hintMode')"
						:items="functionsList"
						:hint="$t('buttons.pressDual.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modePressTriple"
						:label="$t('buttons.pressTriple.title') + $t('buttons.hintMode')"
						:items="functionsList"
						:hint="$t('buttons.pressTriple.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modePressHold"
						:label="$t('buttons.pressHold.title') + $t('buttons.hintMode')"
						:items="functionsList"
						:hint="$t('buttons.pressHold.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!configLoaded || !extended"
					/>
				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";

import { IButtonConfigItem, TButtonType } from "@/models/pjcan/buttons";

export default {
	name: "SettingsCard",
	components: { InputCardItem, SwitchCardItem, Card, NumberField },
	props: {
		/** Заголовок */
		title: {
			type: String,
			required: true
		},
		/** Иконка */
		icon: String,
		/** Конфигурация кнопки */
		config: Object as () => IButtonConfigItem,
		/** Конфигурация загружена */
		configLoaded: Boolean
	},
	emits: ["update"],
	setup(props: any, { emit }: { emit: any })
	{
		const { config, configLoaded } = toRefs(props);
		const { tm } = useI18n();

		/** Расширенный функционал кнопок */
		const extended = computed({
			get: (): boolean => config.value?.extended ?? false,
			set: (val: boolean): void =>
			{
				if (configLoaded.value)
				{
					config.value.extended = val;
					emit("update", config.value);
				}
			}
		});
		/** Время удержания кнопки, сек. */
		const hold = computed({
			get: (): number => config.value?.hold ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.hold = val;
				}
			}
		});
		/** Минимальное сопротивление кнопки */
		const resistanceMin = computed((): number => config.value?.resistanceMin ?? 0);
		/** Максимальное сопротивление кнопки */
		const resistanceMax = computed((): number => config.value?.resistanceMax ?? 0);
		/** Кнопка нажата один раз */
		const pressSingle = computed({
			get: (): number => config.value?.exec[TButtonType.PRESS_SINGLE] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.exec[TButtonType.PRESS_SINGLE] = val;
					emit("update", config.value);
				}
			}
		});
		/** Кнопка нажата два раза */
		const pressDual = computed({
			get: (): number => config.value?.exec[TButtonType.PRESS_DUAL] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.exec[TButtonType.PRESS_DUAL] = val;
					emit("update", config.value);
				}
			}
		});
		/** Кнопка нажата три раза */
		const pressTriple = computed({
			get: (): number => config.value?.exec[TButtonType.PRESS_TRIPLE] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.exec[TButtonType.PRESS_TRIPLE] = val;
					emit("update", config.value);
				}
			}
		});
		/** Удержание кнопки */
		const pressHold = computed({
			get: (): number => config.value?.exec[TButtonType.PRESS_HOLD] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.exec[TButtonType.PRESS_HOLD] = val;
					emit("update", config.value);
				}
			}
		});
		/** Кнопка нажата один раз в режиме Mode */
		const modePressSingle = computed({
			get: (): number => config.value?.execMode[TButtonType.PRESS_SINGLE] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.execMode[TButtonType.PRESS_SINGLE] = val;
					emit("update", config.value);
				}
			}
		});
		/** Кнопка нажата два раза в режиме Mode */
		const modePressDual = computed({
			get: (): number => config.value?.execMode[TButtonType.PRESS_DUAL] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.execMode[TButtonType.PRESS_DUAL] = val;
					emit("update", config.value);
				}
			}
		});
		/** Кнопка нажата три раза в режиме Mode */
		const modePressTriple = computed({
			get: (): number => config.value?.execMode[TButtonType.PRESS_TRIPLE] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.execMode[TButtonType.PRESS_TRIPLE] = val;
					emit("update", config.value);
				}
			}
		});
		/** Удержание кнопки в режиме Mode */
		const modePressHold = computed({
			get: (): number => config.value?.execMode[TButtonType.PRESS_HOLD] ?? 0,
			set: (val: number): void =>
			{
				if (configLoaded.value)
				{
					config.value.execMode[TButtonType.PRESS_HOLD] = val;
					emit("update", config.value);
				}
			}
		});

		/** Список функций */
		const functionsList = computed((): object[] =>
		{
			const list: any = tm("buttons.functions");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		return {
			functionsList,
			extended,
			hold,
			resistanceMin,
			resistanceMax,
			pressSingle,
			pressDual,
			pressTriple,
			pressHold,
			modePressSingle,
			modePressDual,
			modePressTriple,
			modePressHold
		};
	}
};
</script>

<style lang="scss" scoped>
.settings-card {
	&__mode-title {
		text-transform: uppercase;
	}
}
</style>
