<template>
	<q-dialog class="AboutModal" v-model="visible">
		<q-card class="AboutModal-card">
			<q-card-section class="AboutModal-card-title">
				<IconCustom
					class="AboutModal-card-title-icon"
					name="steering"
					color="primary"
					color-secondary="secondary"
					:size="24"
				/>
				<div class="text-h6">{{ $t('About') }}</div>
			</q-card-section>

			<q-card-section class="AboutModal-card-body scroll">
				<CardSectionInput :title="$t('About_Version')" v-model="version" readonly />
				<CardSectionInput :title="$t('About_VersionFirmware')" v-model="versionFirmware" readonly />
				<CardSectionInput :title="$t('About_CarSupport')" v-model="carSupport" readonly />
				<CardSectionInput class="AboutModal-author" :title="$t('About_Author')" v-model="author" readonly />
			</q-card-section>

			<q-card-actions class="AboutModal-card-actions" align="right">
				<q-btn
					:label="$t('About_DeviceInfo')"
					color="secondary"
					v-close-popup
					@click="$emit('clickDeviceInfo')"
				/>
				<q-btn label="OK" color="primary" v-close-popup />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { computed, ref, toRefs } from 'vue';
import api from '@/store/api';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import IconCustom from '@/components/common/iconCustom';
import { BLUETOOTH_EVENT_CONNECTED } from '@/components/bluetooth';

const pkg = require('/package.json');

export default {
	name: 'AboutModal',
	components: { CardSectionInput, IconCustom },
	props: {
		modelValue: {
			type: Boolean,
			default: false
		}
	},
	emits: ['update:modelValue', 'clickDeviceInfo'],
	setup(props: any, context: any) {
		const { modelValue } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit('update:modelValue', val)
		});

		const version = ref(pkg.version);
		const versionFirmware = ref(api.version.toString);
		const carSupport = ref('Mazda 3 BK');
		const author = ref(pkg.author);

		api.bluetooth.addListener(BLUETOOTH_EVENT_CONNECTED, () => {
			versionFirmware.value = api.version.toString;
		});

		return {
			visible,
			version,
			versionFirmware,
			carSupport,
			author
		};
	}
};
</script>

<style lang="sass">
@import "@/css/mixins"

.AboutModal
	@include dialog()

	&-author
		.CardSectionInput
			&-input
				width: 100% !important
				min-width: 210px

	.CardSectionInput
		&-header
			width: 60%
		&-input
			width: 40%
</style>
