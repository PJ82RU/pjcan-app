<template>
	<dialog-template
		content-class="doors-config"
		v-model="visible"
		:title="$t('onboard.doors.settings.title')"
		icon="door"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="configFrontReverse"
						:title="$t('onboard.doors.settings.frontReverse.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('onboard.doors.settings.frontReverse.description')"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<switch-card-item
						v-model="configBackReverse"
						:title="$t('onboard.doors.settings.backReverse.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('onboard.doors.settings.backReverse.description')"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<switch-card-item
						v-model="configFrontBackReverse"
						:title="$t('onboard.doors.settings.frontBackReverse.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('onboard.doors.settings.frontBackReverse.description')"
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="secondary" @click="onResetClick">
				<v-icon v-if="$vuetify.display.xs">mdi-restart</v-icon>
				<span v-else> {{ $t("btn.reset") }} </span>
			</v-btn>
			<v-btn color="primary" @click="onApplyClick">
				<v-icon v-if="$vuetify.display.xs">mdi-check</v-icon>
				<span v-else> {{ $t("btn.apply") }} </span>
			</v-btn>
			<v-btn color="primary" @click="visible = false">
				<v-icon v-if="$vuetify.display.xs">mdi-close</v-icon>
				<span v-else> {{ $t("btn.cancel") }} </span>
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";

export default {
	name: "DoorsConfigDialog",
	components: { DialogTemplate, SwitchCardItem },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Состояние: Поменять местами передние двери */
		frontReverse: Boolean,
		/** Состояние: Поменять местами задние двери */
		backReverse: Boolean,
		/** Состояние: Поменять местами передние и задние двери */
		frontBackReverse: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, context: any)
	{
		const { modelValue, frontReverse, backReverse, frontBackReverse } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const configFrontReverse = ref(false);
		const configBackReverse = ref(false);
		const configFrontBackReverse = ref(false);

		watch(visible, (val) =>
		{
			if (val) onResetClick();
		});

		/** Сбросить */
		const onResetClick = (): void =>
		{
			configFrontReverse.value = frontReverse.value;
			configBackReverse.value = backReverse.value;
			configFrontBackReverse.value = frontBackReverse.value;
		};
		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			context.emit(
				"click:apply",
				configFrontReverse.value,
				configBackReverse.value,
				configFrontBackReverse.value
			);
		};

		return {
			visible,
			configFrontReverse,
			configBackReverse,
			configFrontBackReverse,
			onResetClick,
			onApplyClick
		};
	}
};
</script>
