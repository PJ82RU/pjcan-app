<template>
	<v-dialog
		v-model="visible"
		transition="dialog-bottom-transition"
		:width="`${mobile ? 90 : 50}%`"
		:persistent="!actions"
	>
		<v-card>
			<v-card-title v-if="title?.length > 0" class="d-flex align-center">
				<icon-custom :name="icon" />
				<span class="ml-2 text-h5">{{ title }}</span>
			</v-card-title>

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

import IconCustom from "@/components/icon-custom/IconCustom.vue";

export default {
	name: "DialogTemplate",
	components: { IconCustom },
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
