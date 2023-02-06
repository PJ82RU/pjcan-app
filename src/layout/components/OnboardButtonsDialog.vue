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
							@mousedown="onTouchPress('btnClock')"
							@mouseup="onTouchRelease('btnClock')"
							@mouseleave="onTouchRelease('btnClock')"
							@touchstart="onTouchPress('btnClock')"
							@touchend="onTouchRelease('btnClock')"
							@touchcancel="onTouchRelease('btnClock')"
						>
							CLOCK
						</v-btn>
						<v-btn
							color="primary"
							size="x-large"
							@mousedown="onTouchPress('btnInfo')"
							@mouseup="onTouchRelease('btnInfo')"
							@mouseleave="onTouchRelease('btnInfo')"
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
							@mousedown="onTouchPress('btnClockM')"
							@mouseup="onTouchRelease('btnClockM')"
							@mouseleave="onTouchRelease('btnClockM')"
							@touchstart="onTouchPress('btnClockM')"
							@touchend="onTouchRelease('btnClockM')"
							@touchcancel="onTouchRelease('btnClockM')"
						>
							H
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onTouchPress('btnClockM')"
							@mouseup="onTouchRelease('btnClockM')"
							@mouseleave="onTouchRelease('btnClockM')"
							@touchstart="onTouchPress('btnClockM')"
							@touchend="onTouchRelease('btnClockM')"
							@touchcancel="onTouchRelease('btnClockM')"
						>
							M
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onTouchPress('btnClockRM')"
							@mouseup="onTouchRelease('btnClockRM')"
							@mouseleave="onTouchRelease('btnClockRM')"
							@touchstart="onTouchPress('btnClockRM')"
							@touchend="onTouchRelease('btnClockRM')"
							@touchcancel="onTouchRelease('btnClockRM')"
						>
							RM
						</v-btn>
						<v-btn
							color="secondary"
							size="x-large"
							@mousedown="onTouchPress('flgClock24', true)"
							@touchstart="onTouchPress('flgClock24', true)"
						>
							24/12
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
import { computed, toRefs } from "vue";
import canbus from "@/api/canbus";

import DialogTemplate from "@/components/DialogTemplate.vue";

import { API_EXEC_LCD_VALUE } from "@/models/pjcan/lcd";

export default {
	name: "OnboardButtonsDialog",
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

		const timeouts = {
			btnInfo: 0,
			btnClock: 0,
			btnClockM: 0,
			btnClockH: 0,
			btnClockRM: 0
		} as any;

		/**
		 * Событие нажатия на кнопку
		 * @param {string} name Имя кнопки
		 * @param {boolean} toggle Переключатель
		 */
		const onTouchPress = (name: string, toggle: boolean = false): void =>
		{
			canbus.values.lcd[name] = !toggle ? true : !canbus.values.lcd[name];
			canbus.queryValue(API_EXEC_LCD_VALUE);
			navigator.vibrate(30);

			if (timeouts?.[name])
			{
				clearTimeout(timeouts[name]);
				timeouts[name] = setTimeout(onTouchRelease, 60000, name);
			}
		};

		/**
		 * Событие отпуска кнопки
		 * @param {string} name Имя кнопки
		 */
		const onTouchRelease = (name: string): void =>
		{
			if (canbus.values.lcd[name])
			{
				canbus.values.lcd[name] = false;
				canbus.queryValue(API_EXEC_LCD_VALUE);
				navigator.vibrate(20);
			}

			if (timeouts?.[name]) clearTimeout(timeouts[name]);
		};

		return {
			visible,
			onTouchPress,
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
