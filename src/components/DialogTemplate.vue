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
				<span class="ml-2 text-h4 dialog__title">{{ title }}</span>
				<template v-if="close">
					<v-spacer />
					<icon-custom name="mdi-close" />
				</template>
			</v-card-title>

			<v-card-text v-if="text" class="dialog__text">
				<slot name="body" />
			</v-card-text>

			<v-card-text v-if="info?.length > 0" class="dialog__info">
				<v-row>
					<v-col cols="12" class="pt-0 pb-0">
						<v-divider />
					</v-col>
					<v-col cols="12">
						<v-icon icon="mdi-information-outline" class="mr-1" />
						<span v-html="info" />
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions v-if="actions" class="justify-end align-end">
				<v-btn-group class="border-dialog-btns dialog__btns">
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
		info: String,
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
.dialog {
	&__title {
		width: calc(100% - 32px);
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__text {
		overflow-y: auto;
		color: #bbb;
	}

	&__info {
		font-weight: 300;
		font-size: 1rem;
		line-height: 1.25rem;
		color: $info;

		::v-deep(b) {
			color: $primary;
			font-weight: 600;
		}
	}

	&__icon {
		::v-deep(.v-icon) {
			margin-bottom: 4px;
		}
	}

	&__btns {
		::v-deep(.v-icon) {
			font-size: 2rem !important;
		}
	}
}
</style>
