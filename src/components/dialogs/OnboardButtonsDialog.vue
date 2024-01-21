<template>
	<dialog-template
		content-class="onboard-buttons"
		v-model="visible"
		:title="$t('onboardButtons.title')"
		:info="$t('onboardButtons.description')"
		icon="steering-wheel"
		width="500px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0 d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-main">
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK)"
						>
							CLOCK
						</v-btn>
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_INFO)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_INFO)"
						>
							INFO
						</v-btn>
					</v-btn-group>
				</v-col>
				<v-col cols="12" class="d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-added">
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_H)"
						>
							H
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_M)"
						>
							M
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_RM)"
						>
							RM
						</v-btn>
						<v-btn
							v-if="
								carModel === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
								carModel === TCarModel.CAR_MODEL_MAZDA_CX9_REST
							"
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24)"
						>
							24/12
						</v-btn>
						<v-btn
							v-else
							color="secondary"
							size="x-large"
							@mousedown="onPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
							@mouseup="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
							@mouseleave="onRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
							@touchstart="onTouchPress(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
							@touchend="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
							@touchcancel="onTouchRelease(TMazdaButton.MAZDA_BUTTON_CLOCK_24, true)"
						>
							24/12
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
		modelValue: Boolean
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		const isTouchDevice = (): boolean =>
		{
			// @ts-ignore
			return "ontouchstart" in window || navigator?.maxTouchPoints > 0 || navigator?.msMaxTouchPoints > 0;
		};

		const timeouts: number[] = [-1, -1, -1, -1, -1, -1, -1];
		const press = (btn: TMazdaButton, toggle: boolean): void =>
		{
			if (timeouts[btn] === -1)
			{
				const action = new MazdaAction();
				action.btnType = btn;
				action.btnPress = true;
				canbus.query(action);
				navigator.vibrate(30);
			}
			else clearTimeout(timeouts[btn]);

			if (!toggle) timeouts[btn] = setTimeout(release, 60000, btn);
		};

		const release = (btn: TMazdaButton): void =>
		{
			if (timeouts[btn] !== -1)
			{
				const action = new MazdaAction();
				action.btnType = btn;
				canbus.query(action);
				navigator.vibrate(20);
				clearTimeout(timeouts[btn]);
				timeouts[btn] = -1;
			}
		};

		/**
		 * Событие нажатия на кнопку
		 * @param {TMazdaButton} btn Кнопка
		 * @param {boolean} toggle Переключатель
		 */
		const onPress = (btn: TMazdaButton, toggle: boolean = false): void =>
		{
			if (!isTouchDevice()) press(btn, toggle);
		};

		/**
		 * Событие нажатия на кнопку
		 * @param {TMazdaButton} btn Кнопка
		 * @param {boolean} toggle Переключатель
		 */
		const onTouchPress = (btn: TMazdaButton, toggle: boolean = false): void =>
		{
			if (isTouchDevice()) press(btn, toggle);
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
	&__btns-main {
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

	&__btns-added {
		width: 100%;
		::v-deep(.v-btn) {
			width: calc(100% / 4);
		}
	}

	&__btns-main,
	&__btns-added {
		box-shadow: 0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
			0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
			0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
	}
}
</style>
