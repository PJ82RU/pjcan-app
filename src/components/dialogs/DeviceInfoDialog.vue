<template>
	<dialog-template
		content-class="device-info"
		v-model="visible"
		:title="$t('deviceInfo.title')"
		icon="on-board"
		width="400px"
		text
		actions
	>
		<template #body>
			<v-row class="pb-2">
				<v-col
					v-for="(item, key) in modelDeviceInfo"
					:key="'deviceInfo-' + key"
					cols="12"
					class="height-48 mb-2"
				>
					<v-text-field
						:model-value="item"
						:label="$t('deviceInfo.' + key)"
						variant="underlined"
						:disabled="!isLoadedValue"
						readonly
						dense
					/>
				</v-col>
			</v-row>
		</template>

		<template #btns>
			<v-btn
				v-if="showButtonTest"
				color="secondary"
				icon="mdi-ab-testing"
				:disabled="!isLoadedValue"
				@click="visibleTest = true"
			/>
			<v-btn color="secondary" icon="mdi-magnify-scan" :disabled="!isLoadedValue" @click="onScanClick" />
			<v-btn color="secondary" icon="mdi-restart" :disabled="!isLoadedValue" @click="visibleReset = true" />
			<v-btn color="primary" @click="visible = false">
				{{ $t("btn.close") }}
			</v-btn>
		</template>
	</dialog-template>

	<device-reset-dialog v-model="visibleReset" />
	<scanner v-model="startedScanner" />
	<test-dialog v-model="visibleTest" />
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import store from "@/store";
import { useI18n } from "vue-i18n";
import { arrayToHex, toMac } from "@/utils/conversion";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";
import DeviceResetDialog from "./DeviceResetDialog.vue";
import Scanner from "@/components/Scanner.vue";
import TestDialog from "@/components/dialogs/TestDialog.vue";

import { IMessage } from "@/models/interfaces/message/IMessage";
import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "DeviceInfoDialog",
	components: { TestDialog, Scanner, DialogTemplate, DeviceResetDialog },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, context: any)
	{
		const { t } = useI18n();
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit("update:modelValue", val)
		});

		const isLoadedValue = computed(() => store.getters["config/info"].isData);
		const visibleReset = ref(false);
		const startedScanner = ref(false);
		const visibleTest = ref(false);
		const showButtonTest = computed(
			(): boolean => store.getters["config/carModel"] !== TCarModel.CAR_MODEL_MAZDA_CX9_REST
		);
		const modelDeviceInfo = computed(() =>
		{
			const info = store.getters["config/info"];
			return {
				hardware: info.hardware,
				temperatureChip: (info.temperatureChip / 100).toFixed(2) + "°C",
				sdkVersion: info.sdkVersion.replaceAll("-", ""),
				efuseMac: toMac(info.efuseMac),
				sha: arrayToHex(info.sha)
			};
		});

		/** Циклический запрос данных Info */
		watch(modelValue, (val: boolean): void =>
		{
			store.dispatch("config/infoUpdateLoop", val);
		});

		/** Показать диалог запроса на сканирование can-шины */
		const onScanClick = (): void =>
		{
			store.commit("app/setMessage", {
				title: t("scanner.dialog.title"),
				icon: "mdi-magnify-scan",
				text: t("scanner.dialog.text"),
				btns: [
					{
						title: t("scanner.btn.start"),
						on: () =>
						{
							setTimeout(() => (visible.value = false), 200);
							setTimeout(() => (startedScanner.value = true), 400);
						}
					},
					{ title: t("btn.close") }
				]
			} as IMessage);
		};

		return {
			visible,
			isLoadedValue,
			modelDeviceInfo,
			visibleReset,
			startedScanner,
			visibleTest,
			showButtonTest,
			onScanClick
		};
	}
};
</script>
