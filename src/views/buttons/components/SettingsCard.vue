<template>
	<card class="settings-card" :title="title" :custom="icon">
		<template #body>
			<v-row>
				<v-col cols="12">
					<number-field
						v-model="resistance"
						:label="$t('buttons.resistance.title')"
						:hint="$t('buttons.resistance.description')"
						:max="3999"
						:disabled="!isLoadedConfig"
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
						:disabled="!isLoadedConfig"
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
						:disabled="!isLoadedConfig"
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
						:disabled="!isLoadedConfig"
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
						:disabled="!isLoadedConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="release"
						:label="$t('buttons.release.title')"
						:items="functionsList"
						:hint="$t('buttons.release.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!isLoadedConfig"
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

import { IButtonsConfigItem, TButtonExec, TButtonItem, TButtonPress } from "@/models/pjcan/button";

export interface IConfigReturn {
	type: TButtonItem;
	item: IButtonsConfigItem;
}

export default {
	name: "SettingsCard",
	components: { Card, NumberField },
	props: {
		title: {
			type: String,
			required: true
		},
		type: {
			type: Number as () => TButtonItem,
			required: true
		},
		config: Object as () => IButtonsConfigItem,
		isLoadedConfig: Boolean,
		icon: String
	},
	emits: ["update"],
	setup(props: any, { emit }: { emit: any })
	{
		const { type, config } = toRefs(props);

		/** Список функций */
		const functionsList = computed((): object[] =>
		{
			const result = [];
			const list = $tm("buttons.functions");
			for (const key in list)
			{
				result.push({ label: list[key], value: Number(key) });
			}
			return result;
		});

		/** Обновить конфигурацию */
		const onUpdate = (): void => emit("update", { type: type.value, item: config.value } as IConfigReturn);

		/** Сопротивление кнопки */
		const resistance = computed({
			get: (): number => config.value?.inR ?? 0,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.inR = val;
					onUpdate();
				}
			}
		});

		/** Кнопка нажата один раз */
		const pressSingle = computed({
			get: (): number => config.value?.exec[TButtonPress.PRESS_SINGLE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.exec[TButtonPress.PRESS_SINGLE] = val;
					onUpdate();
				}
			}
		});

		/** Кнопка нажата два раза */
		const pressDual = computed({
			get: (): number => config.value?.exec[TButtonPress.PRESS_DUAL] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.exec[TButtonPress.PRESS_DUAL] = val;
					onUpdate();
				}
			}
		});

		/** Кнопка нажата три раза */
		const pressTriple = computed({
			get: (): number => config.value?.exec[TButtonPress.PRESS_TRIPLE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.exec[TButtonPress.PRESS_TRIPLE] = val;
					onUpdate();
				}
			}
		});

		/** Удержание кнопки */
		const pressHold = computed({
			get: (): number => config.value?.exec[TButtonPress.PRESS_HOLD] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.exec[TButtonPress.PRESS_HOLD] = val;
					onUpdate();
				}
			}
		});

		/** Кнопка отпущена */
		const release = computed({
			get: (): number => config.value?.exec[TButtonPress.RELEASE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (config.value)
				{
					config.value.exec[TButtonPress.RELEASE] = val;
					onUpdate();
				}
			}
		});

		return {
			functionsList,
			resistance,
			pressSingle,
			pressDual,
			pressTriple,
			pressHold,
			release
		};
	}
};
</script>
