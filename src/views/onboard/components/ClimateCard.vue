<template>
	<card class="climate-card" :title="$t('onboard.climate.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[power]"
						:title="$t('onboard.climate.enabled.title')"
						:description="$t('onboard.climate.enabled.description')"
						:icon-name="['climate']"
						:rotation="rotation"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="autoMode"
						:title="$t('onboard.climate.autoMode.title')"
						:description="$t('onboard.climate.autoMode.description')"
						color="success"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="ac"
						:title="$t('onboard.climate.ac.title')"
						:description="$t('onboard.climate.ac.description')"
						color="success"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.climate.temperature.title')"
						:description="$t('onboard.climate.temperature.description')"
						type="temperature"
						:nodata="!climateValueLoaded || temperature <= 0"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[power]"
						:title="$t('onboard.climate.air.title')"
						:description="$t('onboard.climate.air.description')"
						:icon-name="[airIconName]"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[heatedFrontWindow, blowEnabled]"
						:title="$t('onboard.climate.blow.title')"
						:description="$t('onboard.climate.blow.description')"
						:icon-name="['blow-windshield', blowName]"
						:margin="10"
						:nodata="!climateValueLoaded"
						:disabled="!climateViewLoaded"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:view="menuSelected.view"
		:disabled="menuSelected.disabled"
		@click:apply="onViewApply"
	/>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";

export default {
	name: "ClimateCard",
	components: { Card, InputCardItem, IconCardItem, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const climateValueLoaded = computed((): boolean => store.getters["value/climate"].isData);
		const climateViewLoaded = computed((): boolean => store.getters["view/climate"].isData);

		const power = computed((): boolean => store.getters["value/climate"].power);
		const rotation = computed((): number =>
		{
			const res = store.getters["value/climate"].driver;
			return res.airRate > 0 && res.airRate < 8 ? 1 - res.airRate / 10 : 0;
		});
		const autoMode = computed((): boolean => store.getters["value/climate"].automode);
		const ac = computed((): boolean => store.getters["value/climate"].ac);
		const temperature = computed((): number =>
		{
			const res = store.getters["value/climate"].driver;
			return res.temperature > 0 ? res.temperature / 10 : 0;
		});
		const airIconName = computed((): string =>
			store.getters["value/climate"].airIntake ? "air-inside" : "air-outside"
		);
		const blowEnabled = computed((): boolean =>
		{
			const res = store.getters["value/climate"].driver;
			return res.airFlowBody || res.airFlowLegs;
		});
		const blowName = computed((): string =>
		{
			const res = store.getters["value/climate"].driver;
			return res.airFlowLegs && res.airFlowBody
				? "blow-feet-body"
				: res.airFlowLegs
					? "blow-feet"
					: res.airFlowBody
						? "blow-body"
						: "blow-none";
		});
		const heatedFrontWindow = computed((): boolean => store.getters["value/climate"].heatedFrontWindow);

		const menu = computed((): IMenuItem[] => [
			{
				title: t("onboard.climate.menu"),
				view: store.getters["view/climate"],
				disabled: !climateViewLoaded.value
			}
		]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
		};

		/**
         * Применить параметры отображения на информационном экране
         * @param {any} value Новые параметры отображения
         */
		const onViewApply = (value: any): void =>
		{
			store.commit("view/setView", value);
		};

		return {
			climateValueLoaded,
			climateViewLoaded,
			power,
			rotation,
			autoMode,
			ac,
			temperature,
			airIconName,
			blowEnabled,
			blowName,
			heatedFrontWindow,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onViewApply
		};
	}
};
</script>
