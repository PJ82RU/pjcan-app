<template>
	<dialog-template
		content-class="onboard-buttons"
		v-model="visible"
		:title="$t('onboardButtons.title')"
		icon="steering-wheel"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col v-if="visibleClockInfo" cols="12" class="pb-0 d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-main">
						<v-btn
							color="primary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK)"
						>
							{{ $t("onboardButtons.buttons.clock") }}
						</v-btn>
						<v-btn
							color="primary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_INFO)"
						>
							{{ $t("onboardButtons.buttons." + ($vuetify.display.xs ? "infoShort" : "info")) }}
						</v-btn>
					</v-btn-group>
				</v-col>
				<v-col v-if="visibleClockInfo" cols="12" class="pb-0 d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-hold">
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_CLOCK)"
							:disabled="disabled"
						>
							{{ $t("onboardButtons.buttons." + ($vuetify.display.xs ? "holdClockShort" : "holdClock")) }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_INFO)"
							:disabled="disabled"
						>
							{{ $t("onboardButtons.buttons." + ($vuetify.display.xs ? "holdInfoShort" : "holdInfo")) }}
						</v-btn>
					</v-btn-group>
				</v-col>
				<v-col v-if="visibleHourMinute" cols="12" class="d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-added">
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_H)"
						>
							{{ $t("onboardButtons.buttons.clockH") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_M)"
						>
							{{ $t("onboardButtons.buttons.clockM") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_24)"
						>
							<span :class="{ selected: clock24 }">24</span>
							/
							<span :class="{ selected: !clock24 }">12</span>
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@click="send(TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_RM)"
						>
							{{ $t("onboardButtons.buttons.clockRM") }}
						</v-btn>
					</v-btn-group>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "vue";
import store from "@/store";
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { OnboardAction, TCarModel } from "@/models/pjcan/onboard";
import { TButtonExec } from "@/models/pjcan/buttons";

export default {
	name: "OnboardButtonsDialog",
	computed: {
		TButtonExec()
		{
			return TButtonExec;
		}
	},
	components: { DialogTemplate },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const clock24 = computed((): TCarModel => store.getters["config/onboard"].lcdClock24);
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);
		const visibleClockInfo = computed(
			(): boolean =>
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BK ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BL ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_6_GG ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_6_GH ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX7 ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX9 ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX9_REST ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_5
		);
		const visibleHourMinute = computed(
			(): boolean =>
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BK ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_3_BL ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_6_GH ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX9 ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_CX9_REST ||
				carModel.value === TCarModel.CAR_MODEL_MAZDA_5
		);
		const disabled = ref(false);

		/**
		 * Отправить нажатие
		 * @param {TButtonExec} exec Функция кнопки
		 */
		const send = (exec: TButtonExec): void =>
		{
			const action = new OnboardAction();
			action.btnExec = exec;
			action.btnEmulation = false;
			canbus.query(action);
			navigator.vibrate(30);

			if (exec === TButtonExec.BUTTON_EXEC_ON_BOARD_BUTTON_CLOCK_24)
			{
				canbus.query(store.getters["config/onboard"], true);
			}

			if (
				exec === TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_INFO ||
				exec === TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_CLOCK
			)
			{
				disabled.value = true;
				setTimeout(() => (disabled.value = false), 2000);
			}
		};

		return {
			visible,
			visibleClockInfo,
			visibleHourMinute,
			disabled,
			clock24,
			carModel,
			send
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard-buttons {
	&__btns {
		&-hold {
			width: 100%;

			::v-deep(.v-btn) {
				width: calc(100% / 2);
			}
		}
		&-main {
			width: 100%;
			height: 64px;

			::v-deep(.v-btn) {
				width: calc(100% / 2);
			}
			::v-deep(.v-btn__content) {
				font-size: 2rem;
				line-height: 2.25rem;
			}
		}

		&-added {
			width: 100%;
			::v-deep(.v-btn) {
				width: calc(100% / 4);
			}
		}

		&-mode,
		&-main,
		&-added {
			box-shadow:
				0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
				0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
				0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
		}
	}

	.entire-block {
		::v-deep(.v-btn) {
			width: 100% !important;
		}
	}

	.selected {
		color: $success;
		font-weight: bold;
	}
}
</style>
