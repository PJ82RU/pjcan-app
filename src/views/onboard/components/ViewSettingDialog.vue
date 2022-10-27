<template>
	<dialog-template
		v-model="visible"
		content-class="view-setting-dialog"
		icon="lcd"
		:title="title"
		width="550px"
		text
		actions
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="enabled"
						:title="$t('onboard.viewSetting.enabled.title')"
						:description="$t('onboard.viewSetting.enabled.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<v-select
						v-model="type"
						:label="$t('onboard.viewSetting.type.title')"
						:items="typeItems"
						:hint="$t('onboard.viewSetting.type.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<number-field
						v-model="number"
						:label="$t('onboard.viewSetting.time.title')"
						:hint="$t('onboard.viewSetting.time.description')"
					/>
				</v-col>
			</v-row>
		</template>
		<template #btns>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.apply") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "vue";
import i18n from "@/lang";

import DialogTemplate from "@/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import NumberField from "@/components/common/NumberField.vue";

export default {
	name: "ViewSettingDialog",
	components: { DialogTemplate, SwitchCardItem, NumberField },
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			require: true
		}
	},
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const enabled = ref(false);
		const type = ref(0);
		const typeItems = computed(() =>
			(i18n.global.tm("onboard.viewSetting.type.items") as string[])?.map((x, i) => ({
				label: x,
				value: i
			}))
		);
		const number = ref(3);

		return {
			visible,
			enabled,
			type,
			typeItems,
			number
		};
	}
};
</script>

<style lang="scss" scoped>
.view-setting-dialog {
	max-width: 400px;
}
</style>
