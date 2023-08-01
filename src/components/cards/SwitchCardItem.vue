<template>
	<div class="switch-card-item">
		<v-text-field
			:model-value="title"
			:hint="description"
			variant="underlined"
			density="compact"
			persistent-hint
			readonly
			dense
			:disabled="disabled"
		/>
		<v-switch
			v-model="modelSwitch"
			class="switch-card-item__switch"
			density="compact"
			:color="color"
			hide-details
			:disabled="nodata || disabled"
		/>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

export default {
	name: "SwitchCardItem",
	props: {
		/** Значение switch */
		modelValue: Boolean,
		/** Заголовок */
		title: String,
		/** Описание */
		description: String,
		/** Цвет switch */
		color: {
			type: String,
			default: "success"
		},
		/** Нет данных */
		nodata: Boolean,
		/** Выкл. */
		disabled: Boolean
	},
	emits: ["update:modelValue", "change"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, disabled } = toRefs(props);
		const modelSwitch = computed({
			get: () => modelValue.value,
			set: (val: boolean) =>
			{
				if (!disabled.value)
				{
					emit("update:modelValue", val);
					emit("change", val);
				}
			}
		});

		return {
			modelSwitch
		};
	}
};
</script>

<style lang="scss" scoped>
.switch-card-item {
	position: relative;

	&__switch {
		position: absolute;
		top: 4px;
		right: 0;
	}
}
</style>
