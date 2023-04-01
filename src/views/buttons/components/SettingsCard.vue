<template>
	<card class="settings-card" :title="title" :custom="icon">
		<template #body>
			<v-row>
				<v-col cols="12">
					<number-field
						v-model="modelResistance"
						:label="$t('buttons.resistance.title')"
						:hint="$t('buttons.resistance.description')"
						:min="1"
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
					/>
				</v-col>
                <v-col cols="12" class="pt-0">
                    <switch-card-item
                            v-model="modelDelayExec"
                            :title="$t('buttons.delayExec.title')"
                            :description="$t('buttons.delayExec.description')"
                            color="primary"
                            :disabled="!isLoadedConfig"
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
import NumberField from "@/components/common/NumberField.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";

export default {
	name: "SettingsCard",
	components: { SwitchCardItem, Card, NumberField },
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
		delayExec: Boolean,
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
		"update:delayExec"
	],
	setup(props: any, { emit }: { emit: any })
	{
		const { inR, pressSingle, pressDual, pressTriple, pressHold, delayExec } = toRefs(props);
		const { tm } = useI18n();

		/** Список функций */
		const functionsList = computed((): object[] =>
		{
			const list: any = tm("buttons.functions");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		/** Сопротивление кнопки */
		const modelResistance = computed({
			get: (): number => inR.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:inR", val);
			}
		});

		/** Кнопка нажата один раз */
		const modelPressSingle = computed({
			get: (): number => pressSingle.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:pressSingle", val);
				emit("change");
			}
		});

		/** Кнопка нажата два раза */
		const modelPressDual = computed({
			get: (): number => pressDual.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:pressDual", val);
				emit("change");
			}
		});

		/** Кнопка нажата три раза */
		const modelPressTriple = computed({
			get: (): number => pressTriple.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:pressTriple", val);
				emit("change");
			}
		});

		/** Удержание кнопки */
		const modelPressHold = computed({
			get: (): number => pressHold.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:pressHold", val);
				emit("change");
			}
		});

		/** Отложенное нажатие кнопки */
		const modelDelayExec = computed({
			get: (): number => delayExec.value ?? 0,
			set: (val: number): void =>
			{
				emit("update:delayExec", val);
				emit("change");
			}
		});

		return {
			functionsList,
			modelResistance,
			modelPressSingle,
			modelPressDual,
			modelPressTriple,
			modelPressHold,
			modelDelayExec
		};
	}
};
</script>
