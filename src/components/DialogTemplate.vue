<template>
	<v-dialog
		v-model="visible"
		transition="dialog-bottom-transition"
		:width="`${mobile ? 90 : 50}%`"
		:persistent="!actions"
	>
		<v-card :prepend-icon="icon">
			<template v-if="title?.length > 0" v-slot:title>
				<span class="text-h5">{{ title }}</span>
			</template>

			<v-card-text v-if="text" :class="{ 'mb-2': !actions }">
				<slot name="body" />
			</v-card-text>

			<v-card-actions v-if="actions" class="justify-end align-end">
				<v-btn-group class="border-dialog-btns">
					<slot name="btns" />
				</v-btn-group>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { useDisplay } from "vuetify";

export default {
	name: "DialogTemplate",
	props: {
		modelValue: Boolean,
		icon: String,
		title: String,
		text: Boolean,
		actions: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { mobile } = useDisplay();

		const visible = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});

		return {
			visible,
			mobile
		};
	}
};
</script>
