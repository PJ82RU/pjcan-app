<template>
	<card class="settings-card" :title="title" :custom="icon" @click:custom="$emit('click', $event)">
		<template #body>
			<v-row>
				<v-col cols="12">
					<input-card-item
						:value="resistanceMax > 0 ? resistanceMin + ' - ' + resistanceMax : ''"
						:title="$t('buttons.resistance.title')"
						:description="$t('buttons.resistance.description')"
						:disabled="!config"
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
						:disabled="!config"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="extended"
						:title="$t('buttons.extended.title')"
						:description="$t('buttons.extended.description')"
						color="primary"
						:disabled="!config"
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
						:disabled="!config || !extended"
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
						:disabled="!config || !extended"
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
						:disabled="!config || !extended"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="hold"
						:label="$t('buttons.pressHold.time.title')"
						:hint="$t('buttons.pressHold.time.description')"
						:min="1"
						:max="255"
						:disabled="!config || !extended"
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
						:disabled="!config || !mode"
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
						:disabled="!config || !mode"
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
						:disabled="!config || !mode"
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
						:disabled="!config || !mode"
					/>
				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";

import { IButtonConfigItem, TButtonType } from "@/models/pjcan/buttons";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "SettingsCard",
	components: { IconCustom, InputCardItem, SwitchCardItem, Card, NumberField },
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
		/** Показывать параметры режима Mode */
		mode: Boolean
	},
	emits: ["update", "click"],
	setup(props: any, { emit }: { emit: any })
	{
		const { config } = toRefs(props);
		const { tm } = useI18n();

		const __config = ref({} as IButtonConfigItem);
		const copyConfig = (): void =>
		{
			__config.value = {
				extended: config.value.extended,
				id: config.value.id,
				hold: config.value.hold,
				resistanceMin: config.value.resistanceMin,
				resistanceMax: config.value.resistanceMax,
				exec: [...config.value.exec],
				execMode: [...config.value.execMode]
			} as IButtonConfigItem;
		};
		if (config.value) copyConfig();
		watch(config, () => copyConfig());

		/** Расширенный функционал кнопок */
		const extended = computed({
			get: (): boolean => __config.value?.extended ?? false,
			set: (val: boolean): void =>
			{
				if (config.value)
				{
					__config.value.extended = val;
					emit("update", __config.value);
				}
			}
		});
		/** Время удержания кнопки, сек. */
		const hold = computed({
			get: (): number => __config.value?.hold ?? 0,
			set: (val: number): void =>
			{
				if (config.value) __config.value.hold = val;
			}
		});
		/** Минимальное сопротивление кнопки */
		const resistanceMin = computed((): number => __config.value?.resistanceMin ?? 0);
		/** Максимальное сопротивление кнопки */
		const resistanceMax = computed((): number => __config.value?.resistanceMax ?? 0);
		/** Кнопка нажата один раз */
		const pressSingle = computed({
			get: (): number => __config.value?.exec?.[TButtonType.PRESS_SINGLE] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.exec[TButtonType.PRESS_SINGLE] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Кнопка нажата два раза */
		const pressDual = computed({
			get: (): number => __config.value?.exec?.[TButtonType.PRESS_DUAL] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.exec[TButtonType.PRESS_DUAL] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Кнопка нажата три раза */
		const pressTriple = computed({
			get: (): number => __config.value?.exec?.[TButtonType.PRESS_TRIPLE] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.exec[TButtonType.PRESS_TRIPLE] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Удержание кнопки */
		const pressHold = computed({
			get: (): number => __config.value?.exec?.[TButtonType.PRESS_HOLD] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.exec[TButtonType.PRESS_HOLD] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Кнопка нажата один раз в режиме Mode */
		const modePressSingle = computed({
			get: (): number => __config.value?.execMode?.[TButtonType.PRESS_SINGLE] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.execMode[TButtonType.PRESS_SINGLE] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Кнопка нажата два раза в режиме Mode */
		const modePressDual = computed({
			get: (): number => __config.value?.execMode?.[TButtonType.PRESS_DUAL] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.execMode[TButtonType.PRESS_DUAL] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Кнопка нажата три раза в режиме Mode */
		const modePressTriple = computed({
			get: (): number => __config.value?.execMode?.[TButtonType.PRESS_TRIPLE] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.execMode[TButtonType.PRESS_TRIPLE] = val;
					emit("update", __config.value);
				}
			}
		});
		/** Удержание кнопки в режиме Mode */
		const modePressHold = computed({
			get: (): number => __config.value?.execMode?.[TButtonType.PRESS_HOLD] ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					__config.value.execMode[TButtonType.PRESS_HOLD] = val;
					emit("update", __config.value);
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
