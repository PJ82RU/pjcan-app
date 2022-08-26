<template>
	<q-dialog class="about-modal" v-model="visible">
		<q-card class="about-modal__card">
			<q-card-section class="about-modal__card-title">
				<icon-custom class="about-modal__card-title-icon" name="PJ82" :size="24" />
				<div class="text-h6">{{ $t('About') }}</div>
			</q-card-section>

			<q-card-section class="about-modal__card-body scroll">
				<card-section-input :title="$t('About_Version')" v-model="version" readonly />
				<card-section-input :title="$t('About_VersionFirmware')" v-model="versionFirmware" readonly />
				<card-section-input :title="$t('About_CarSupport')" v-model="carSupport" readonly />
				<card-section-input class="about-modal__author" :title="$t('About_Author')" v-model="author" readonly />
			</q-card-section>

			<q-card-actions class="about-modal__card-actions" align="right">
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
import { computed, toRefs } from 'vue';
import api from '@/store/api';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import IconCustom from '@/components/common/iconCustom';

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

		const version = computed(() => pkg.version);
		const versionFirmware = computed(() => api.version.toString);
		const carSupport = computed(() => 'Mazda 3 BK');
		const author = computed(() => pkg.author);

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

.about-modal
	@include dialog()

	&__author
		.card-section-input
			&__input
				width: 100% !important
				min-width: 210px

	.card-section-input
		&__header
			width: 60%
		&__input
			width: 40%
</style>
