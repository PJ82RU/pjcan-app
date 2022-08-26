<template>
	<card-section
		class="fuel-card"
		type="FuelCard"
		:title="$t('FuelCard_Title')"
		icon-name="fuel"
		:menu-card-section="menuFuelCard"
		@click-options="onClickOptions"
	>
		<card-section-input
			:title="$t('FuelCard_Current_Title')"
			:comment="$t('FuelCard_Current_Comment')"
			v-model="current"
			readonly
		/>
		<card-section-input
			:title="$t('FuelCard_AVG_Title')"
			:comment="$t('FuelCard_AVG_Comment')"
			v-model="avg"
			readonly
		/>
		<card-section-input
			:title="$t('FuelCard_Total_Title')"
			:comment="$t('FuelCard_Total_Comment')"
			v-model="total"
			readonly
		/>
		<card-section-input
			:title="$t('FuelCard_Consumption_Title')"
			:comment="$t('FuelCard_Consumption_Comment')"
			v-model="consumption"
			readonly
		/>
	</card-section>
	<view-setting-modal
		v-model="viewSettingModel"
		:title="viewSettingTitle"
		:view-config="viewConfig"
		@apply="onApplyViewConfig"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import ViewSettingModal from '@/components/view/ViewSettingModal.vue';
import { menuFuelCard } from '@/store/menu/MenuFuelCard';
import { FuelValue, FuelView, IFuelValue, IViewConfig, TViewType } from '@/models/pjcan';
import api, { API_EVENT_VARIABLE_FUEL, API_EVENT_VARIABLE_FUEL_VIEW } from '@/store/api';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'FuelCard',
	components: { CardSection, CardSectionInput, ViewSettingModal },
	setup() {
		// расход топлива
		const fuelValue = ref(new FuelValue());
		const fuelView = new FuelView();
		// входящие значения расхода топлива
		const onReceiveValue = (res: IFuelValue): void => {
			fuelValue.value.setModel(res);
		};
		// входящие значения отображения расхода топлива
		const onReceiveView = (res: IFuelValue): void => {
			fuelView.setModel(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			api.addListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_VARIABLE_FUEL, onReceiveValue);
			api.removeListener(API_EVENT_VARIABLE_FUEL_VIEW, onReceiveView);
		});

		const current = computed((): string => fuelValue.value.current.toFixed(1));
		const avg = computed((): string => fuelValue.value.avg.toFixed(1));
		const total = computed((): string => fuelValue.value.total.toFixed(2));
		const consumption = computed((): string => fuelValue.value.consumption.toFixed(2));

		// настройки отображения
		const viewSettingModel = ref(false);
		const viewSettingTitle = ref('');
		const viewConfig = ref({ enabled: false, type: TViewType.VIEW_TEXT_SIMPLE, time: 0 } as IViewConfig);
		let selectItemMenu: TItemMenu;

		/** Выбор пункта меню отображения на информационном экране */
		const onClickOptions = (e: any): void => {
			// console.log('FuelCard -> onClickOptions', e);

			selectItemMenu = e.type;
			switch (selectItemMenu) {
				case TItemMenu.VIEW_FUEL_CURRENT:
					viewConfig.value = fuelView.current;
					break;

				case TItemMenu.VIEW_FUEL_AVG:
					viewConfig.value = fuelView.avg;
					break;

				case TItemMenu.VIEW_FUEL_TOTAL:
					viewConfig.value = fuelView.total;
					break;

				case TItemMenu.VIEW_FUEL_CONSUMPTION:
					viewConfig.value = fuelView.consumption;
					break;
			}

			viewSettingTitle.value = e.lang;
			viewSettingModel.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} res Новые параметры отображения
		 */
		const onApplyViewConfig = (res: IViewConfig): void => {
			switch (selectItemMenu) {
				case TItemMenu.VIEW_FUEL_CURRENT:
					fuelView.current = res;
					break;

				case TItemMenu.VIEW_FUEL_AVG:
					fuelView.avg = res;
					break;

				case TItemMenu.VIEW_FUEL_TOTAL:
					fuelView.total = res;
					break;

				case TItemMenu.VIEW_FUEL_CONSUMPTION:
					fuelView.consumption = res;
					break;
			}
			api.send(fuelView);
		};

		return {
			current,
			avg,
			total,
			consumption,
			menuFuelCard,
			viewSettingModel,
			viewSettingTitle,
			viewConfig,
			onClickOptions,
			onApplyViewConfig
		};
	}
};
</script>
