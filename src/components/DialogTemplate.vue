<template>
	<v-dialog
		v-model="visible"
		:content-class="contentClass"
		transition="dialog-bottom-transition"
		:width="widthModel"
		:persistent="!actions"
	>
		<v-card>
			<v-card-title v-if="title?.length > 0" class="d-flex align-center">
				<icon-custom class="dialog__icon" :name="icon" />
				<span class="ml-2 text-h5 dialog__title">{{ title }}</span>
				<template v-if="close">
					<v-spacer />
					<icon-custom name="mdi-close" />
				</template>
			</v-card-title>

			<v-card-text v-if="text" class="dialog__text" :class="{ 'mb-2': !actions }">
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

import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

export default {
	name: "DialogTemplate",
	components: { IconCustom },
	props: {
		modelValue: Boolean,
		contentClass: String,
		icon: String,
		title: String,
		text: Boolean,
		actions: Boolean,
		close: Boolean,
		width: [String, Number]
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue, width } = toRefs(props);
		const { mobile } = useDisplay();

		const visible = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});
		const widthModel = computed(() =>
			typeof width.value === "number" && width.value > 0
				? `${width.value}px`
				: typeof width.value === "string" && width.value.length > 0
					? width.value
					: `${mobile.value ? 90 : 50}%`
		);

		return {
			visible,
			widthModel
		};
	}
};
</script>

<style lang="scss" scoped>
.dialog
{
	&__title {
		width: calc(100% - 32px);
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__text {
		overflow-y: auto;
	}

	&__icon {
		::v-deep(.v-icon) {
			margin-bottom: 4px;
		}
	}
}
</style>
