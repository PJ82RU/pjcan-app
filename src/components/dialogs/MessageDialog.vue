<template>
	<dialog-template v-model="visible" :icon="icon" :title="title" :text="!!text" :actions="!!btns" :width="width">
		<template #body>
			{{ text }}
		</template>
		<template #btns>
			<v-btn
				v-for="(btn, i) in btns"
				:key="`message-btn_${i}`"
				:color="btn?.color ?? 'primary'"
				:prepend-icon="btn?.icon"
				@click="onClick(btn)"
			>
				{{ btn?.title }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { IMessageBtn } from "@/models/interfaces/message/IMessageBtn";

export default {
	name: "Message",
	components: { DialogTemplate },
	props: {
		/** Показать диалог */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Заголовок */
		title: String,
		/** Иконка заголовка */
		icon: String,
		/** Текст */
		text: String,
		/** Список кнопок { title, ?color, on } */
		btns: Array as () => IMessageBtn[],
		/** Ширина диалога */
		width: [Number, String]
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});

		const onClick = (btn: IMessageBtn): void =>
		{
			if (btn?.on) btn.on();
			visible.value = false;
		};

		return {
			visible,
			onClick
		};
	}
};
</script>
