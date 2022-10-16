<template>
	<v-dialog
		class="bluetooth-dialog"
		v-model="visible"
		transition="dialog-bottom-transition"
		:width="`${mobile ? 90 : 50}%`"
	>
		<v-card prepend-icon="mdi-bluetooth">
			<template v-slot:title>
				<span class="text-h5">
					{{ $t("BLE.title") }}
				</span>
			</template>

			<v-card-text>
				<span>
					{{ $t(!connected ? "BLE.dialog.noConnected" : "BLE.dialog.connected") }}
				</span>
			</v-card-text>

			<v-card-actions class="justify-end align-end">
				<v-btn-group class="border-dialog-btns">
					<v-btn color="#25323e" @click="$emit('click:apply')">
						{{ $t(!connected ? "BLE.btn.connect" : "BLE.btn.disconnect") }}
					</v-btn>
					<v-btn color="#25323e" @click="visible = false">
						{{ $t("btn.close") }}
					</v-btn>
				</v-btn-group>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { useDisplay } from "vuetify";

export default {
	name: "BluetoothDialog",
	props: {
		modelValue: Boolean,
		connected: Boolean
	},
	emits: ["update:modelValue", "click:apply"],
	setup(props: any, { emit }: { emit: any })
	{
		const { modelValue } = toRefs(props);
		const { mobile } = useDisplay();

		const visible = computed({
			get: () => modelValue.value,
			set: (val) => emit("update:modelValue", val)
		});

		return {
			visible,
			mobile
		};
	}
};
</script>
