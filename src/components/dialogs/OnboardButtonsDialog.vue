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
							@mousedown="onPress('btnClock')"
							@mouseup="onRelease('btnClock')"
							@mouseleave="onRelease('btnClock')"
							@touchstart="onTouchPress('btnClock')"
							@touchend="onTouchRelease('btnClock')"
							@touchcancel="onTouchRelease('btnClock')"
						>
							CLOCK
						</v-btn>
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onPress('btnInfo')"
							@mouseup="onRelease('btnInfo')"
							@mouseleave="onRelease('btnInfo')"
							@touchstart="onTouchPress('btnInfo')"
							@touchend="onTouchRelease('btnInfo')"
							@touchcancel="onTouchRelease('btnInfo')"
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
							@mousedown="onPress('btnClockH')"
							@mouseup="onRelease('btnClockH')"
							@mouseleave="onRelease('btnClockH')"
							@touchstart="onTouchPress('btnClockH')"
							@touchend="onTouchRelease('btnClockH')"
							@touchcancel="onTouchRelease('btnClockH')"
						>
							H
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress('btnClockM')"
							@mouseup="onRelease('btnClockM')"
							@mouseleave="onRelease('btnClockM')"
							@touchstart="onTouchPress('btnClockM')"
							@touchend="onTouchRelease('btnClockM')"
							@touchcancel="onTouchRelease('btnClockM')"
						>
							M
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onPress('btnClockRM')"
							@mouseup="onRelease('btnClockRM')"
							@mouseleave="onRelease('btnClockRM')"
							@touchstart="onTouchPress('btnClockRM')"
							@touchend="onTouchRelease('btnClockRM')"
							@touchcancel="onTouchRelease('btnClockRM')"
						>
							RM
						</v-btn>
						<v-btn
							v-if="carModel === ECarModel.CAR_MODEL_MAZDA_CX9_GEN2"
							color="secondary"
							size="x-large"
							@mousedown="onPress('flgClock24')"
							@mouseup="onRelease('flgClock24')"
							@mouseleave="onRelease('flgClock24')"
							@touchstart="onTouchPress('flgClock24')"
							@touchend="onTouchRelease('flgClock24')"
							@touchcancel="onTouchRelease('flgClock24')"
						>
							24/12
						</v-btn>
						<v-btn
							v-else
							color="secondary"
							size="x-large"
							@mousedown="onPress('flgClock24', true)"
							@touchstart="onTouchPress('flgClock24', true)"
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
import canbus from "@/api/canbus";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

import { API_LCD_VALUE_EXEC } from "@/models/pjcan/lcd";
import { ECarModel } from "@/models/pjcan/car";

export default {
	name: "OnboardButtonsDialog",
	computed: {
		ECarModel()
		{
			return ECarModel;
		}
	},
	components: { DialogTemplate },
	props: {
		modelValue: Boolean,
		carModel: {
			type: Number,
			default: 0
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

		const isTouchDevice = (): boolean =>
		{
			// @ts-ignore
			return "ontouchstart" in window || navigator?.maxTouchPoints > 0 || navigator?.msMaxTouchPoints > 0;
		};

		const timeouts = {
			btnInfo: null,
			btnClock: null,
			btnClockH: null,
			btnClockM: null,
			btnClockRM: null,
			flgClock24: null
		} as any;

		const press = (name: string, toggle: boolean): void =>
		{
			if (timeouts?.[name] === null)
			{
				canbus.values.lcd[name] = !toggle ? true : !canbus.values.lcd[name];
				canbus.queryValue(API_LCD_VALUE_EXEC);
				navigator.vibrate(30);
			}
			else
			{
				clearTimeout(timeouts[name]);
			}

			if (!toggle)
			{
				timeouts[name] = setTimeout(release, 60000, name);
			}
		};

		const release = (name: string): void =>
		{
			if (timeouts?.[name] !== null)
			{
				canbus.values.lcd[name] = false;
				canbus.queryValue(API_LCD_VALUE_EXEC);
				navigator.vibrate(20);

				clearTimeout(timeouts[name]);
				timeouts[name] = null;
			}
		};

		/**
         * Событие нажатия на кнопку
         * @param {string} name Имя кнопки
         * @param {boolean} toggle Переключатель
         */
		const onPress = (name: string, toggle: boolean = false): void =>
		{
			if (!isTouchDevice()) press(name, toggle);
		};

		/**
		 * Событие нажатия на кнопку
		 * @param {string} name Имя кнопки
		 * @param {boolean} toggle Переключатель
		 */
		const onTouchPress = (name: string, toggle: boolean = false): void =>
		{
			if (isTouchDevice()) press(name, toggle);
		};

		/**
         * Событие отпуска кнопки
         * @param {string} name Имя кнопки
         */
		const onRelease = (name: string): void =>
		{
			if (!isTouchDevice()) release(name);
		};

		/**
		 * Событие отпуска кнопки
		 * @param {string} name Имя кнопки
		 */
		const onTouchRelease = (name: string): void =>
		{
			if (isTouchDevice()) release(name);
		};

		return {
			visible,
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
