<template>
	<card class="settings-card" :title="title" :custom="icon">
		<template #body>
			<v-row>
				<v-col cols="12">
					<number-field
						v-model="modelResistance"
						:label="$t('buttons.resistance.title')"
						:hint="$t('buttons.resistance.description')"
						:max="3999"
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelPressSingle"
						:label="$t('buttons.pressSingle.title')"
						:items="functionsList"
						:hint="$t('buttons.pressSingle.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelPressDual"
						:label="$t('buttons.pressDual.title')"
						:items="functionsList"
						:hint="$t('buttons.pressDual.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelPressTriple"
						:label="$t('buttons.pressTriple.title')"
						:items="functionsList"
						:hint="$t('buttons.pressTriple.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelPressHold"
						:label="$t('buttons.pressHold.title')"
						:items="functionsList"
						:hint="$t('buttons.pressHold.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="modelRelease"
						:label="$t('buttons.release.title')"
						:items="functionsList"
						:hint="$t('buttons.release.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
						@change="$emit('change')"
					/>
				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { $tm } from "@/lang";

import Card from "@/components/cards/Card.vue";
import NumberField from "@/components/common/NumberField.vue";

export default {
	name: "SettingsCard",
	components: { Card, NumberField },
	props: {
		title: {
			type: String,
			required: true
		},
		inR: Number,
		pressSingle: Number,
		pressDual: Number,
		pressTriple: Number,
		pressHold: Number,
		release: Number,
		isLoadedConfig: Boolean,
		icon: String
	},
	emits: [
		"change",
		"update:inR",
		"update:pressSingle",
		"update:pressDual",
		"update:pressTriple",
		"update:pressHold",
		"update:release"
	],
	setup(props: any, { emit }: { emit: any })
	{
		const { inR, pressSingle, pressDual, pressTriple, pressHold, release } = toRefs(props);

		/** Список функций */
		const functionsList = computed((): object[] =>
		{
			const result = [];
			const list: any = $tm("buttons.functions");
			for (const key in list)
			{
				result.push({ label: list[key], value: Number(key) });
			}
			return result;
		});

		/** Сопротивление кнопки */
		const modelResistance = computed({
			get: (): number => inR.value ?? 0,
			set: (val: number): void => emit("update:inR", val)
		});

		/** Кнопка нажата один раз */
		const modelPressSingle = computed({
			get: (): number => pressSingle.value ?? 0,
			set: (val: number): void => emit("update:pressSingle", val)
		});

		/** Кнопка нажата два раза */
		const modelPressDual = computed({
			get: (): number => pressDual.value ?? 0,
			set: (val: number): void => emit("update:pressDual", val)
		});

		/** Кнопка нажата три раза */
		const modelPressTriple = computed({
			get: (): number => pressTriple.value ?? 0,
			set: (val: number): void => emit("update:pressTriple", val)
		});

		/** Удержание кнопки */
		const modelPressHold = computed({
			get: (): number => pressHold.value ?? 0,
			set: (val: number): void => emit("update:pressHold", val)
		});

		/** Кнопка отпущена */
		const modelRelease = computed({
			get: (): number => release.value ?? 0,
			set: (val: number): void => emit("update:release", val)
		});

		return {
			functionsList,
			modelResistance,
			modelPressSingle,
			modelPressDual,
			modelPressTriple,
			modelPressHold,
			modelRelease
		};
	}
};
</script>
