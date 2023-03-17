<template>
	<dialog-template
		content-class="test"
		v-model="visible"
		:title="$t('test.title')"
		:info="$t('test.description')"
		icon="steering-wheel"
		width="600px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-1">
					<v-text-field
						class="test__text"
						v-model="text"
						:label="$t('test.text.title')"
						:hint="$t('test.text.description')"
						variant="underlined"
						density="compact"
						:rules="[rules.required, rules.counter, rules.english]"
						persistent-hint
						dense
					/>
				</v-col>
				<v-col cols="12" class="pb-1">
					<v-select
						v-model="style"
						:label="$t('onboard.viewSetting.type.title')"
						:items="styleList"
						:hint="$t('onboard.viewSetting.type.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12">
					<number-field
						v-model="time"
						:label="$t('onboard.viewSetting.time.title')"
						:hint="$t('onboard.viewSetting.time.description')"
						:max="60"
						:min="1"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="onShowClick">
				{{ $t("test.btnShow") }}
			</v-btn>
			<v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";
import canbus from "@/api/canbus";
import { API_VARIABLE_TEST_EXEC, TestValue } from "@/models/pjcan/variables/test";

export default {
	name: "TestDialog",
	components: { DialogTemplate, InputCardItem, NumberField },
	props: {
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { tm, t } = useI18n();

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const rules = computed(() => ({
			required: (value: string): any => (!!value || t("rules.required")),
			// @ts-ignore
			counter: (value: string): any => (value.length <= 32 || t("rules.counter", 32, { n: 32 })),
			english: (value: string): any => (/^[^а-яА-Я]+$/.test(value) || t("rules.english"))
		}));

		const text = ref(" -- TEST -- ");
		const style = ref(0);
		const time = ref(3);
		const styleList = computed(() =>
			(tm("onboard.viewSetting.type.items") as string[])?.map((x, i) => ({
				label: x,
				value: i
			}))
		);

		/** Кнопка: "Показать" */
		const onShowClick = (): void =>
		{
			const test = new TestValue();
			test.text = text.value;
			test.view.enabled = true;
			test.view.type = style.value;
			test.view.time = time.value;
			canbus.queryValue(API_VARIABLE_TEST_EXEC, test);
		};

		return {
			visible,
			text,
			rules,
			style,
			styleList,
			time,
			onShowClick
		};
	}
};
</script>

<style lang="scss" scoped>
.test {
	&__text {
		width: 100%;

		::v-deep(.v-text-field__suffix) {
			font-family: $font-family !important;
		}
	}
}
</style>
