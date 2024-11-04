<template>
	<dialog-template
		content-class="device-config"
		v-model="visible"
		:title="$t('onboard.info.device.title')"
		icon="door"
		width="550px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="disableLedWorkModel"
						:title="$t('onboard.info.device.disableLedWork.title')"
						:description="$t('onboard.info.device.disableLedWork.description')"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<switch-card-item
						v-model="disableReverseModel"
						:title="$t('onboard.info.device.disableReverse.title')"
						:description="$t('onboard.info.device.disableReverse.description')"
					/>
				</v-col>
				<template v-if="visibleRPosition">
					<v-col cols="12" class="pb-0">
						<switch-card-item
							v-model="disableRPositionModel"
							:title="$t('onboard.info.device.disableRPosition.title')"
							:description="$t('onboard.info.device.disableRPosition.description')"
						/>
					</v-col>
					<v-col cols="12" class="pb-0">
						<switch-card-item
							v-model="disableAmpIllumModel"
							:title="$t('onboard.info.device.disableAmpIllum.title')"
							:description="$t('onboard.info.device.disableAmpIllum.description')"
						/>
					</v-col>
				</template>
				<template v-if="visibleVoltmeter">
					<v-col cols="12" class="pb-0">
						<switch-card-item
							v-model="disableVoltmeterModel"
							:title="$t('onboard.info.device.disableVoltmeter.title')"
							:description="$t('onboard.info.device.disableVoltmeter.description')"
						/>
					</v-col>
					<v-col cols="12" class="pb-0">
						<number-card-item
							v-model="calibrationOfVoltmeterModel"
							:title="$t('onboard.info.device.calibrationOfVoltmeter.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
							:description="$t('onboard.info.device.calibrationOfVoltmeter.description')"
							:min="-127"
							:max="127"
							:step="1"
						/>
					</v-col>
				</template>
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
import NumberCardItem from "@/components/cards/NumberCardItem.vue";

export default {
	name: "DeviceConfigDialog",
	components: { NumberCardItem, DialogTemplate, SwitchCardItem },
	props: {
		/** Отображение диалога */
		modelValue: {
			type: Boolean,
			default: false
		},
		/** Выключить управление контакта LED_WORK */
		disableLedWork: Boolean,
		/** Выключить управление контакта REVERSE */
		disableReverse: Boolean,
		/** Выключить управление контакта R_POSITION */
		disableRPosition: Boolean,
		/** Выключить управление контакта AMP_ILLUM */
		disableAmpIllum: Boolean,
		/** Выключить вольтметр */
		disableVoltmeter: Boolean,
		/** Калибровка вольтметра */
		calibrationOfVoltmeter: Number,
		/** Не показывать блоки контактов R_POSITION и AMP_ILLUM */
		visibleRPosition: Boolean,
		/** Не показывать блоки вольтметра */
		visibleVoltmeter: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, context: any)
	{
		const {
			modelValue,
			disableLedWork,
			disableReverse,
			disableRPosition,
			disableAmpIllum,
			disableVoltmeter,
			calibrationOfVoltmeter
		} = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});
		const disableLedWorkModel = ref(false);
		const disableReverseModel = ref(false);
		const disableRPositionModel = ref(false);
		const disableAmpIllumModel = ref(false);
		const disableVoltmeterModel = ref(false);
		const calibrationOfVoltmeterModel = ref(0);

		watch(visible, (val) =>
		{
			if (val) onResetClick();
		});

		/** Сбросить */
		const onResetClick = (): void =>
		{
			disableLedWorkModel.value = !disableLedWork.value;
			disableReverseModel.value = !disableReverse.value;
			disableRPositionModel.value = !disableRPosition.value;
			disableAmpIllumModel.value = !disableAmpIllum.value;
			disableVoltmeterModel.value = !disableVoltmeter.value;
			calibrationOfVoltmeterModel.value = calibrationOfVoltmeter.value;
		};
		/** Применить изменения и закрыть диалог */
		const onApplyClick = (): void =>
		{
			visible.value = false;
			context.emit(
				"click:apply",
				!disableLedWorkModel.value,
				!disableReverseModel.value,
				!disableRPositionModel.value,
				!disableAmpIllumModel.value,
				!disableVoltmeterModel.value,
				calibrationOfVoltmeterModel.value
			);
		};

		return {
			visible,
			disableLedWorkModel,
			disableReverseModel,
			disableRPositionModel,
			disableAmpIllumModel,
			disableVoltmeterModel,
			calibrationOfVoltmeterModel,
			onResetClick,
			onApplyClick
		};
	}
};
</script>
