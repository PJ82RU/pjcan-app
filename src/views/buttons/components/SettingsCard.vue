<template>
	<card class="settings-card" :title="title" :custom="icon" @click:custom="$emit('click', $event)">
		<template #body>
			<v-row>
				<v-col cols="12">
					<v-select
						v-model="pressSingle"
						:label="$t('buttons.pressSingle.title')"
						:items="listOfFunctions"
						:hint="$t('buttons.pressSingle.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="modelExtended"
						:title="$t('buttons.extended.title')"
						:description="$t('buttons.extended.description')"
						color="primary"
					/>
				</v-col>
				<template v-if="extended">
					<v-col cols="12" class="pt-0">
						<v-select
							v-model="pressDual"
							:label="$t('buttons.pressDual.title')"
							:items="listOfFunctions"
							:hint="$t('buttons.pressDual.description')"
							variant="underlined"
							item-title="label"
							item-value="value"
							persistent-hint
						/>
					</v-col>
					<v-col cols="12" class="pt-0">
						<v-select
							v-model="pressTriple"
							:label="$t('buttons.pressTriple.title')"
							:items="listOfFunctions"
							:hint="$t('buttons.pressTriple.description')"
							variant="underlined"
							item-title="label"
							item-value="value"
							persistent-hint
						/>
					</v-col>
					<v-col cols="12" class="pt-0">
						<v-select
							v-model="pressHold"
							:label="$t('buttons.pressHold.title')"
							:items="listOfFunctions"
							:hint="$t('buttons.pressHold.description')"
							variant="underlined"
							item-title="label"
							item-value="value"
							persistent-hint
						/>
					</v-col>
				</template>
				<template v-if="visibleExtended">
					<v-col cols="12" class="pt-6">
						<span class="settings-card__mode-title">{{ $t("buttons.extendedMode") }}</span>
					</v-col>
					<v-col cols="12" class="pt-0">
						<v-select
							v-model="pressSingleExtended"
							:label="$t('buttons.pressSingle.title') + $t('buttons.hintMode')"
							:items="listOfFunctions"
							:hint="$t('buttons.pressSingle.description')"
							variant="underlined"
							item-title="label"
							item-value="value"
							persistent-hint
							:disabled="!visibleExtended"
						/>
					</v-col>
					<template v-if="extended">
						<v-col cols="12" class="pt-0">
							<v-select
								v-model="pressDualExtended"
								:label="$t('buttons.pressDual.title') + $t('buttons.hintMode')"
								:items="listOfFunctions"
								:hint="$t('buttons.pressDual.description')"
								variant="underlined"
								item-title="label"
								item-value="value"
								persistent-hint
							/>
						</v-col>
						<v-col cols="12" class="pt-0">
							<v-select
								v-model="pressTripleExtended"
								:label="$t('buttons.pressTriple.title') + $t('buttons.hintMode')"
								:items="listOfFunctions"
								:hint="$t('buttons.pressTriple.description')"
								variant="underlined"
								item-title="label"
								item-value="value"
								persistent-hint
							/>
						</v-col>
						<v-col cols="12" class="pt-0">
							<v-select
								v-model="pressHoldExtended"
								:label="$t('buttons.pressHold.title') + $t('buttons.hintMode')"
								:items="listOfFunctions"
								:hint="$t('buttons.pressHold.description')"
								variant="underlined"
								item-title="label"
								item-value="value"
								persistent-hint
							/>
						</v-col>
					</template>
				</template>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";

import { TButtonExec, TButtonPress } from "@/models/pjcan/buttons";
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
		/** Расширенный функционал кнопок (двойное, тройное нажатие) */
		extended: {
			type: Boolean,
			default: false
		},
		/** ID кнопки (0 - кнопка не определена) */
		id: {
			type: Number,
			default: 0
		},
		/** Список ID функций кнопки */
		exec: {
			type: Array as () => TButtonExec[],
			default: () => [0, 0, 0, 0]
		},
		/** Список ID функций кнопки в расширенном режиме */
		execMode: {
			type: Array as () => TButtonExec[],
			default: () => [0, 0, 0, 0]
		},
		/** Список функций */
		listOfFunctions: {
			type: Array as () => object[],
			default: () => []
		},
		/** Показать расширенные параметры */
		visibleExtended: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:extended", "update:exec", "update:execMode", "click"],
	setup(props: any, { emit }: { emit: any })
	{
		const { extended, exec, execMode } = toRefs(props);

		/** Расширенный функционал кнопок */
		const modelExtended = computed({
			get: (): boolean => extended.value,
			set: (val: boolean): void => emit("update:extended", val)
		});
		/** Кнопка нажата один раз */
		const pressSingle = computed({
			get: (): number => exec.value[TButtonPress.PRESS_PRESSED],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_PRESSED] = val;
				emit("update:exec", execNew);
			}
		});
		/** Кнопка нажата два раза */
		const pressDual = computed({
			get: (): number => exec.value[TButtonPress.PRESS_DUAL],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_DUAL] = val;
				emit("update:exec", execNew);
			}
		});
		/** Кнопка нажата три раза */
		const pressTriple = computed({
			get: (): number => exec.value[TButtonPress.PRESS_TRIPLE],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_TRIPLE] = val;
				emit("update:exec", execNew);
			}
		});
		/** Удержание кнопки в расширенном режиме */
		const pressHold = computed({
			get: (): number => exec.value[TButtonPress.PRESS_HOLD],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_HOLD] = val;
				emit("update:exec", execNew);
			}
		});
		/** Кнопка нажата один раз в расширенном режиме */
		const pressSingleExtended = computed({
			get: (): number => execMode.value[TButtonPress.PRESS_PRESSED],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_PRESSED] = val;
				emit("update:execMode", execNew);
			}
		});
		/** Кнопка нажата два раза в расширенном режиме */
		const pressDualExtended = computed({
			get: (): number => execMode.value[TButtonPress.PRESS_DUAL],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_DUAL] = val;
				emit("update:execMode", execNew);
			}
		});
		/** Кнопка нажата три раза в расширенном режиме */
		const pressTripleExtended = computed({
			get: (): number => execMode.value[TButtonPress.PRESS_TRIPLE],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_TRIPLE] = val;
				emit("update:execMode", execNew);
			}
		});
		/** Удержание кнопки в расширенном режиме */
		const pressHoldExtended = computed({
			get: (): number => execMode.value[TButtonPress.PRESS_HOLD],
			set: (val: number): void =>
			{
				const execNew = [...exec.value];
				execNew[TButtonPress.PRESS_HOLD] = val;
				emit("update:execMode", execNew);
			}
		});

		return {
			modelExtended,
			pressSingle,
			pressDual,
			pressTriple,
			pressHold,
			pressSingleExtended,
			pressDualExtended,
			pressTripleExtended,
			pressHoldExtended
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
