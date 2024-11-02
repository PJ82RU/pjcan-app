<template>
	<dialog-template
		content-class="device-reset"
		v-model="visible"
		:title="$t('deviceReset.title')"
		icon="mdi-restart"
		width="600px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0">
					<v-checkbox
						v-model="resetConfig"
						:label="$t('deviceReset.' + ($vuetify.display.xs ? 'configShort' : 'config'))"
						hide-details
					/>
				</v-col>
				<v-col cols="12" class="pt-1">
					<v-checkbox
						v-model="resetView"
						:label="$t('deviceReset.' + ($vuetify.display.xs ? 'viewShort' : 'view'))"
						hide-details
					/>
				</v-col>
				<v-col cols="12" class="pt-1">
					<v-checkbox
						v-model="resetButtons"
						:label="$t('deviceReset.' + ($vuetify.display.xs ? 'buttonsShort' : 'buttons'))"
						:disabled="resetConfig"
						hide-details
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="onApply">
				{{ $t("btn.apply") }}
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.cancel") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

export default {
	name: "DeviceResetDialog",
	components: { DialogTemplate },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, context: any)
	{
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const resetConfig = ref(false);
		const resetView = ref(false);
		const resetButtons = ref(false);

		watch(modelValue, (val: boolean): void =>
		{
			if (val)
			{
				resetConfig.value = false;
				resetView.value = false;
				resetButtons.value = false;
			}
		});

		/** Применить */
		const onApply = (): void =>
		{
			canbus.rebootDevice(
				!resetConfig.value && !resetView.value && !resetButtons.value,
				resetConfig.value,
				resetView.value,
				resetButtons.value
			);
			visible.value = false;
		};

		return {
			visible,
			resetConfig,
			resetView,
			resetButtons,
			onApply
		};
	}
};
</script>
