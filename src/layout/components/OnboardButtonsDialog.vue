<template>
	<dialog-template
		content-class="onboard-buttons"
		v-model="visible"
		:title="$t('onboardButtons.title')"
		:info="$t('onboardButtons.description')"
		icon="steering-wheel"
		width="500px"
		text
		info
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col cols="12" class="pb-0 d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-main">
						<v-btn color="primary" size="x-large"> CLOCK </v-btn>
						<v-btn color="primary" size="x-large"> INFO </v-btn>
					</v-btn-group>
				</v-col>
				<v-col cols="12" class="d-flex justify-center">
					<v-btn-group class="onboard-buttons__btns-added">
						<v-btn color="secondary" size="x-large"> H </v-btn>
						<v-btn color="secondary" size="x-large"> M </v-btn>
						<v-btn color="secondary" size="x-large"> RM </v-btn>
						<v-btn color="secondary" size="x-large"> 24/12 </v-btn>
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
import DialogTemplate from "@/components/DialogTemplate.vue";
import { computed, toRefs } from "vue";
import canbus from "@/api/canbus";

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
			btnClockH: 0
		} as any;

		/**
		 * Событие нажатия на кнопку
		 * @param {string} name Имя кнопки
		 * @param {boolean} value Значение нажатия
		 */
		const onTouchPress = (name: string, value: boolean = true): void =>
		{
			console.log("onTouchPress");
			canbus.values.lcd[name] = value;
			// canbus.queryValueLCD();
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
			console.log("onTouchRelease");
			// canbus.values.lcd[name] = false;
			navigator.vibrate(20);

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
		height: 64px;
		::v-deep(.v-btn) {
			width: 200px;
		}
		::v-deep(.v-btn__content) {
			font-size: 2rem;
			line-height: 2.25rem;
		}
	}

	&__btns-added {
		::v-deep(.v-btn) {
			width: 100px;
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
