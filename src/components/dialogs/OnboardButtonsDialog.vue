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
				<v-col
					v-if="
						carModel !== TCarModel.CAR_MODEL_MAZDA_CX7_REST &&
						carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST
					"
					cols="12"
					class="pb-0 d-flex justify-center"
				>
					<v-btn-group class="onboard-buttons__btns-main">
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK, 300, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK, 300, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
						>
							{{ $t("onboardButtons.buttons.clock") }}
						</v-btn>
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_INFO, 300, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_INFO, 300, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
						>
							{{ $t("onboardButtons.buttons.info") }}
						</v-btn>
					</v-btn-group>
				</v-col>
				<v-col
					v-if="
						carModel !== TCarModel.CAR_MODEL_MAZDA_CX7_REST &&
						carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST
					"
					cols="12"
					class="pb-0 d-flex justify-center"
				>
					<v-btn-group class="onboard-buttons__btns-mode">
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK, 2000, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK, 2000, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
						>
							{{ $t("onboardButtons.buttons.modeClock") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_INFO, 2000, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_INFO, 2000, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
						>
							{{ $t("onboardButtons.buttons.modeInfo") }}
						</v-btn>
					</v-btn-group>
				</v-col>
				<v-col
					v-if="
						carModel === TCarModel.CAR_MODEL_MAZDA_3_BK ||
						carModel === TCarModel.CAR_MODEL_MAZDA_3_BL ||
						carModel === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
						carModel === TCarModel.CAR_MODEL_MAZDA_CX9_REST
					"
					cols="12"
					class="d-flex justify-center"
				>
					<v-btn-group class="onboard-buttons__btns-added">
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_H, 500, true)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_H, 500, true)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
						>
							{{ $t("onboardButtons.buttons.clockH") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_M, 500, true)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_M, 500, true)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
						>
							{{ $t("onboardButtons.buttons.clockM") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24, 500, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24, 500, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
						>
							{{ $t("onboardButtons.buttons.clock24") }}
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_RM, 500, false)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_RM, 500, false)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
						>
							{{ $t("onboardButtons.buttons.clockRM") }}
						</v-btn>
					</v-btn-group>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import store from "@/store";
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { MazdaAction, TCarModel, TMazdaButton } from "@/models/pjcan/mazda";
import { ITimeoutButton } from "@/models/interfaces/ITimeoutButton";

export default {
	name: "OnboardButtonsDialog",
	computed: {
		TCarModel()
		{
			return TCarModel;
		},
		TMazdaButton()
		{
			return TMazdaButton;
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
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const isTouchDevice = (): boolean =>
		{
			// @ts-ignore
			return "ontouchstart" in window || navigator?.maxTouchPoints > 0 || navigator?.msMaxTouchPoints > 0;
		};

		/**
         * Отправить нажатие
         * @param {TMazdaButton} btn Кнопка
         * @param {boolean} press Нажата
         * @param {number} timeout Время удержания
         */
		const send = (btn: TMazdaButton, press: boolean, timeout: number): void =>
		{
			const action = new MazdaAction();
			action.btnType = btn;
			action.btnPress = press;
			action.timePress = timeout;
			canbus.query(action);
			navigator.vibrate(30);
		};

		const timeouts: ITimeoutButton[] = [{}, {}, {}, {}, {}, {}, {}] as ITimeoutButton[];
		/**
         * Нажать
         * @param {TMazdaButton} btn Кнопка
         * @param {number} timeout Время удержания
         * @param {boolean} reSend Повторно отправить
         */
		const press = (btn: TMazdaButton, timeout: number, reSend: boolean): void =>
		{
			const item = timeouts[btn];
			if (!item.press)
			{
				send(btn, true, timeout);
				item.press = true;
				item.timeUp = false;
				if (reSend)
				{
					item.timeout = setTimeout(() =>
					{
						item.timeUp = true;
						send(btn, true, 60000);
					}, 1000);
				}
			}
		};

		/**
         * Отпустить
         * @param {TMazdaButton} btn Кнопка
         */
		const release = (btn: TMazdaButton): void =>
		{
			const item = timeouts[btn];
			if (item.press)
			{
				item.press = false;
				if (item.timeUp)
				{
					send(btn, false, 0);
					item.timeUp = false;
				}
				clearTimeout(item.timeout);
				item.timeout = undefined;
			}
		};

		/**
		 * Событие нажатия на кнопку
		 * @param {TMazdaButton} btn Кнопка
		 * @param {number} timeout Таймаут нажатия кнопки
		 * @param {boolean} reSend Отправить на удержание
		 */
		const onPress = (btn: TMazdaButton, timeout: number, reSend: boolean): void =>
		{
			if (!isTouchDevice()) press(btn, timeout, reSend);
		};

		/**
		 * Событие нажатия на кнопку
		 * @param {TMazdaButton} btn Кнопка
		 * @param {number} timeout Таймаут нажатия кнопки
		 * @param {boolean} reSend Отправить на удержание
		 */
		const onTouchPress = (btn: TMazdaButton, timeout: number, reSend: boolean): void =>
		{
			if (isTouchDevice()) press(btn, timeout, reSend);
		};

		/**
		 * Событие отпуска кнопки
		 * @param {TMazdaButton} btn Кнопка
		 */
		const onRelease = (btn: TMazdaButton): void =>
		{
			if (!isTouchDevice()) release(btn);
		};

		/**
		 * Событие отпуска кнопки
		 * @param {TMazdaButton} btn Кнопка
		 */
		const onTouchRelease = (btn: TMazdaButton): void =>
		{
			if (isTouchDevice()) release(btn);
		};

		return {
			visible,
			carModel,
			onPress,
			onTouchPress,
			onRelease,
			onTouchRelease
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard-buttons {
	&__btns {
		&-mode {
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
			box-shadow: 0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
				0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
				0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
		}
	}
}
</style>
