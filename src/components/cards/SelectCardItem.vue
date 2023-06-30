<template>
	<div class="select-card-item">
		<div class="text-h4" :class="{ 'select-card-item__disabled': disabled }">
			{{ title }}
		</div>
		<v-select
			v-model="modelSelect"
			:items="items"
			:hint="description"
			variant="underlined"
			:item-title="itemTitle"
			:item-value="itemValue"
			:disabled="disabled"
			persistent-hint
		/>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "SelectCardItem",
	components: { IconCustom },
	props: {
		/** Значение select */
		modelValue: Number,
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Список значений */
		items: Array,
		/** Отображаемое в списке название */
		itemTitle: {
			type: String,
			default: "title"
		},
		/** Значение в списке */
		itemValue: {
			type: String,
			default: "value"
		},
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);

		const modelSelect = computed({
			get: (): number => modelValue.value,
			set: (val: number) => emit("update:modelValue", val)
		});

		return {
			modelSelect
		};
	}
};
</script>

<style lang="scss" scoped>
.select-card-item {
	&__disabled {
		opacity: 0.35;
	}
	::v-deep(.v-input__control) {
		height: 32px;
	}
	::v-deep(.v-field__input) {
		padding-top: 0 !important;
	}
	::v-deep(.v-field__append-inner) {
		padding-top: 0 !important;
	}
}
</style>
