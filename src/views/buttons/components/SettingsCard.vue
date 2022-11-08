<template>
	<card class="settings-card" :title="$t(title)" :custom="iconName">
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

import Card from "@/components/cards/Card.vue";
import NumberField from "@/components/common/NumberField.vue";

import {
	IButtonsConfig,
	IButtonsConfigItem,
	TButtonExec,
	TButtonItem,
	TButtonPress
} from "@/models/pjcan/button";
import i18n from "@/lang";

export default {
	name: "SettingsCard",
	components: { Card, NumberField },
	props: {
		type: {
			type: Number as () => TButtonItem,
			required: true
		},
		config: {
			type: Object as () => IButtonsConfig,
			required: true
		},
		isLoadedConfig: Boolean,
		iconName: String
	},
	setup(props: any)
	{
		const { type, config } = toRefs(props);

		const title = computed((): string =>
		{
			const r = "buttons.";
			switch (type.value)
			{
				case TButtonItem.BUTTON_MODE:
					return r + "mode";
				case TButtonItem.BUTTON_SEEK_UP:
					return r + "seekUp";
				case TButtonItem.BUTTON_SEEK_DOWN:
					return r + "seekDown";
				case TButtonItem.BUTTON_VOL_UP:
					return r + "volUp";
				case TButtonItem.BUTTON_VOL_DOWN:
					return r + "volDown";
				case TButtonItem.BUTTON_VOL_MUTE:
					return r + "volMute";
			}
			return r + "title";
		});
		const functionsList = computed((): object[] =>
		{
			const result = [];
			const list = i18n.global.tm("buttons.functions");
			for (const key in list)
			{
				result.push({ label: list[key], value: Number(key) });
			}
			return result;
		});

		const items = computed((): IButtonsConfigItem => config.value.items?.[type.value]);

		const resistance = computed({
			get: (): number => items.value?.inR ?? 0,
			set: (val: number): void =>
			{
				if (items.value) items.value.inR = val;
			}
		});

		const pressSingle = computed({
			get: (): number => items.value?.exec[TButtonPress.PRESS_SINGLE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (items.value) items.value.exec[TButtonPress.PRESS_SINGLE] = val;
			}
		});

		const pressDual = computed({
			get: (): number => items.value?.exec[TButtonPress.PRESS_DUAL] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (items.value) items.value.exec[TButtonPress.PRESS_DUAL] = val;
			}
		});

		const pressTriple = computed({
			get: (): number => items.value?.exec[TButtonPress.PRESS_TRIPLE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (items.value) items.value.exec[TButtonPress.PRESS_TRIPLE] = val;
			}
		});

		const pressHold = computed({
			get: (): number => items.value?.exec[TButtonPress.PRESS_HOLD] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (items.value) items.value.exec[TButtonPress.PRESS_HOLD] = val;
			}
		});

		const release = computed({
			get: (): number => items.value?.exec[TButtonPress.RELEASE] ?? TButtonExec.TEYES_NONE,
			set: (val: number): void =>
			{
				if (items.value) items.value.exec[TButtonPress.RELEASE] = val;
			}
		});

		return {
			title,
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