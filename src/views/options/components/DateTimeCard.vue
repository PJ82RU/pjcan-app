<template>
	<card
		class="datetime-card"
		:title="$t('options.datetime.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showDate"
						:title="$t('options.datetime.date.title')"
						:description="$t('options.datetime.date.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showTime"
						:title="$t('options.datetime.time.title')"
						:description="$t('options.datetime.time.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showDayWeek"
						:title="$t('options.datetime.dayWeek.title')"
						:description="$t('options.datetime.dayWeek.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showDateAndDayWeek"
						:title="$t('options.datetime.dateAndDayWeek.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('options.datetime.dateAndDayWeek.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showTimeAndDayWeek"
						:title="$t('options.datetime.timeAndDayWeek.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('options.datetime.timeAndDayWeek.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="showFullDatetime"
						:title="$t('options.datetime.fullDatetime.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
						:description="$t('options.datetime.fullDatetime.description')"
						color="success"
						:nodata="!configLoaded"
						:disabled="!configLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-5 datetime-card__description">
					<span> {{ $t("options.datetime.description") }} </span>
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
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "DatetimeCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const configLoaded = computed((): boolean => store.getters["config/datetime"].isData);
		const viewLoaded = computed((): boolean => store.getters["view/datetime"].isData);

		const showDate = computed({
			get: (): boolean => store.getters["config/datetime"].showDate,
			set: (val: boolean) => store.commit("config/setDatetimeShowDate", val)
		});
		const showTime = computed({
			get: (): boolean => store.getters["config/datetime"].showTime,
			set: (val: boolean) => store.commit("config/setDatetimeShowTime", val)
		});
		const showDayWeek = computed({
			get: (): boolean => store.getters["config/datetime"].showDayWeek,
			set: (val: boolean) => store.commit("config/setDatetimeShowDayWeek", val)
		});
		const showDateAndDayWeek = computed({
			get: (): boolean => store.getters["config/datetime"].showDateAndDayWeek,
			set: (val: boolean) => store.commit("config/setDatetimeShowDateAndDayWeek", val)
		});
		const showTimeAndDayWeek = computed({
			get: (): boolean => store.getters["config/datetime"].showTimeAndDayWeek,
			set: (val: boolean) => store.commit("config/setDatetimeShowTimeAndDayWeek", val)
		});
		const showFullDatetime = computed({
			get: (): boolean => store.getters["config/datetime"].showFullDatetime,
			set: (val: boolean) => store.commit("config/setDatetimeShowFullDatetime", val)
		});
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		const menu = computed((): IMenuItem[] => [
			{ title: t("options.datetime.menu"), view: store.getters["view/datetime"], disabled: !viewLoaded.value }
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
			configLoaded,
			viewLoaded,
			showDate,
			showTime,
			showDayWeek,
			showDateAndDayWeek,
			showTimeAndDayWeek,
			showFullDatetime,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onViewApply
		};
	}
};
</script>

<style lang="scss" scoped>
.datetime-card {
	&__description {
		font-weight: 300;
		font-size: 0.875rem;
		line-height: 1rem !important;
		opacity: var(--v-disabled-opacity);
	}
}
</style>
