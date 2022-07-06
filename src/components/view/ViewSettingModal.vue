<template>
	<q-dialog class="ViewSettingModal" v-model="visible">
		<q-card class="ViewSettingModal-card">
			<q-card-section class="ViewSettingModal-card-title">
				<IconCustom
					class="ViewSettingModal-card-title-icon"
					name="on-board"
					color="primary"
					color-secondary="secondary"
					:size="30"
				/>
				<div class="text-h6">{{ title }}</div>
			</q-card-section>

			<q-card-section class="ViewSettingModal-card-body">
				<CardSectionToggle
					:title="$t('ViewSetting_Enabled')"
					:comment="$t('ViewSetting_Enabled_Comment')"
					v-model="viewEnabled"
				/>
				<CardSectionSelect
					:title="$t('ViewSetting_Type')"
					:comment="$t('ViewSetting_Type_Comment')"
					v-model="viewType"
					:options="viewTypeItems"
				/>
				<CardSectionInput
					:title="$t('ViewSetting_Time')"
					:comment="$t('ViewSetting_Time_Comment')"
					v-model="viewTime"
					type="number"
					:min="0"
					:max="60"
				/>
			</q-card-section>

			<q-card-actions class="ViewSettingModal-card-actions" align="right">
				<q-btn :label="$t('Cancel')" color="grey" v-close-popup />
				<q-btn :label="$t('Apply')" color="primary" v-close-popup @click="onApply" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionSelect from '@/components/cardSections/CardSectionSelect.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import IconCustom from '@/components/common/iconCustom';
import { IViewConfig, TViewType } from '@/models/pjcan';

export default {
	name: 'ViewSettingModal',
	components: { CardSectionToggle, CardSectionSelect, CardSectionInput, IconCustom },
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			require: true
		},
		viewConfig: {
			type: Object as () => IViewConfig,
			require: true
		}
	},
	emits: ['update:modelValue', 'apply'],
	setup(props: any, context: any) {
		const { modelValue, viewConfig } = toRefs(props);
		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => context.emit('update:modelValue', val)
		});

		const viewEnabled = ref(false);
		const viewType = ref(TViewType.VIEW_TEXT_SIMPLE);
		const viewTime = ref(0);
		watch(viewConfig, (val: IViewConfig): void => {
			viewEnabled.value = val.enabled;
			viewType.value = val.type;
			viewTime.value = val.time;
		});

		const viewTypeItems = computed((): any[] => [
			{ label: 'Обычный текст', value: TViewType.VIEW_TEXT_SIMPLE },
			{ label: 'Мигание текста', value: TViewType.VIEW_TEXT_FLICKERING },
			{ label: 'Бегущая строка', value: TViewType.VIEW_TEXT_TICKER }
		]);

		const onApply = () => {
			context.emit('apply', {
				enabled: viewEnabled.value,
				type: viewType.value,
				time: viewTime.value
			} as IViewConfig);
		};

		return {
			visible,
			viewEnabled,
			viewType,
			viewTime,
			viewTypeItems,
			onApply
		};
	}
};
</script>

<style lang="sass">
.ViewSettingModal
	&-card
		&-title
			padding: 16px 16px 0 16px
			display: flex
			flex-direction: row
			align-items: center

			&-icon
				margin-right: 10px

			.text-h6
				font-size: 22px

		&-body
			padding: 16px
			font-size: 17px

			.q-card__section
				margin-bottom: 10px
				align-items: center

			.CardSectionSelect-input
				width: 250px

		&-actions
			padding: 16px
</style>
