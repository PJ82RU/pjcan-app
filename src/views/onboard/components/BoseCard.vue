<template>
	<card class="climate-card" :title="$t('onboard.bose.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12">
					<icon-card-item
						v-model="enabled"
						:title="$t('onboard.bose.enabled.title')"
						:description="$t('onboard.bose.enabled.description')"
						:icon-name="['bose']"
						:nodata="!boseConfigLoaded"
						:disabled="!boseViewLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<slider-card-item
						v-model="volume"
						:title="$t('onboard.volume.level.title')"
						:description="$t('onboard.volume.level.description')"
						:max="63"
						:nodata="!boseConfigLoaded"
						:disabled="!enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="mute"
						:title="$t('onboard.volume.mute.title')"
						:description="$t('onboard.volume.mute.description')"
						color="warning"
						:nodata="!boseConfigLoaded"
						:disabled="!enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="audioPLT"
						:title="$t('onboard.bose.audioPLT.title')"
						:description="$t('onboard.bose.audioPLT.description')"
						color="success"
						:nodata="!boseConfigLoaded"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<select-card-item
						v-model="centerPoint"
						:title="$t('onboard.bose.centerPoint.title')"
						:description="$t('onboard.bose.centerPoint.description')"
						:items="centerPointList"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<slider-card-item
						v-model="balance"
						:title="$t('onboard.bose.balance.title')"
						:description="$t('onboard.bose.balance.description')"
						:min="-8"
						:max="8"
						prepend-icon="volume-l"
						append-icon="volume-r"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<slider-card-item
						v-model="fade"
						:title="$t('onboard.bose.fade.title')"
						:description="$t('onboard.bose.fade.description')"
						:min="-8"
						:max="8"
						prepend-icon="volume-fade-r"
						append-icon="volume-fade-f"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<slider-card-item
						v-model="treble"
						:title="$t('onboard.bose.treble.title')"
						:description="$t('onboard.bose.treble.description')"
						:min="-6"
						:max="6"
						prepend-icon-mdi="mdi-volume-medium"
						append-icon-mdi="mdi-volume-high"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<slider-card-item
						v-model="bass"
						:title="$t('onboard.bose.bass.title')"
						:description="$t('onboard.bose.bass.description')"
						:min="-6"
						:max="6"
						prepend-icon-mdi="mdi-volume-medium"
						append-icon-mdi="mdi-volume-high"
						:disabled="!boseViewLoaded || !enabled[0]"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="wow"
						:title="$t('onboard.bose.wow.title')"
						:description="$t('onboard.bose.wow.description')"
						color="success"
						:nodata="!boseConfigLoaded"
						:disabled="!boseViewLoaded || !enabled[0]"
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
	<bose-start-dialog
		v-model="startConfigVisible"
		:enabled="startConfig.start"
		:level="startConfig.start_volume"
		@click:apply="onStartApply"
	/>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import SelectCardItem from "@/components/cards/SelectCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";
import BoseStartDialog from "./BoseStartDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { IBoseConfig, TCenterPoint } from "@/models/pjcan/bose";

export default {
	name: "BoseCard",
	components: {
		ViewSettingDialog,
		BoseStartDialog,
		IconCardItem,
		InputCardItem,
		SwitchCardItem,
		SliderCardItem,
		SelectCardItem,
		Card
	},
	props: {
		carModel: {
			type: Number,
			default: 0
		}
	},
	setup()
	{
		const { t } = useI18n();

		const boseConfigLoaded = computed((): boolean => store.getters["config/bose"].isData);
		const boseViewLoaded = computed((): boolean => store.getters["view/bose"].isData);

		const enabled = computed({
			get: (): boolean[] => [store.getters["config/bose"].on],
			set: (val: boolean[]) => store.commit("config/setBoseEnabled", val[0])
		});
		const mute = computed({
			get: (): boolean => store.getters["config/bose"].mute,
			set: (val: boolean) => store.commit("config/setBoseMute", val)
		});
		const volume = computed({
			get: (): number => store.getters["config/bose"].volume,
			set: (val: number) => store.commit("config/setBoseVolume", val)
		});
		const audioPLT = computed({
			get: (): boolean => store.getters["config/bose"].audioPlt,
			set: (val: boolean) => store.commit("config/setBoseAudioPlt", val)
		});
		const radioFM = computed({
			get: (): boolean => store.getters["config/bose"].radioFM,
			set: (val: boolean) => store.commit("config/setBoseRadioFM", val)
		});
		const wow = computed({
			get: (): boolean => store.getters["config/bose"].wow,
			set: (val: boolean) => store.commit("config/setBoseWow", val)
		});
		const balance = computed({
			get: (): number => store.getters["config/bose"].balance,
			set: (val: number) => store.commit("config/setBoseBalance", val)
		});
		const bass = computed({
			get: (): number => store.getters["config/bose"].bass,
			set: (val: number) => store.commit("config/setBoseBass", val)
		});
		const fade = computed({
			get: (): number => store.getters["config/bose"].fade,
			set: (val: number) => store.commit("config/setBoseFade", val)
		});
		const treble = computed({
			get: (): number => store.getters["config/bose"].treble,
			set: (val: number) => store.commit("config/setBoseTreble", val)
		});
		const centerPoint = computed({
			get: (): TCenterPoint => store.getters["config/bose"].centerPoint,
			set: (val: TCenterPoint) => store.commit("config/setBoseCenterPoint", val)
		});
		const centerPointList = computed(() => [
			{ title: "OFF", value: TCenterPoint.CENTERPOINT_OFF },
			{ title: "MIN", value: TCenterPoint.CENTERPOINT_MIN },
			{ title: "LOW", value: TCenterPoint.CENTERPOINT_LOW },
			{ title: "MID", value: TCenterPoint.CENTERPOINT_MID },
			{ title: "HI", value: TCenterPoint.CENTERPOINT_HI },
			{ title: "MAX", value: TCenterPoint.CENTERPOINT_MAX }
		]);

		const startConfigVisible = ref(false);
		const startConfig = computed((): IBoseConfig => store.getters["config/bose"]);

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: t("onboard.bose.volumeConfig.title") },
			{
				id: 1,
				title: t("onboard.bose.menu"),
				view: store.getters["view/bose"],
				disabled: !boseViewLoaded.value
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
			if (item.view)
			{
				menuVisible.value = true;
				menuSelected.value = item;
			}
			else startConfigVisible.value = true;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {any} value Новые параметры отображения
		 */
		const onViewApply = (value: any): void =>
		{
			store.commit("view/setView", value);
		};

		/**
		 * Применить настройки запуска
		 * @param {boolean} enabled Вкл/выкл
		 * @param {number} level Уровень звука
		 */
		const onStartApply = (enabled: boolean, level: number): void =>
		{
			store.commit("config/setBoseVolumeStart", { enabled, level });
		};

		return {
			boseConfigLoaded,
			boseViewLoaded,
			enabled,
			audioPLT,
			radioFM,
			wow,
			balance,
			bass,
			fade,
			treble,
			centerPoint,
			centerPointList,
			mute,
			volume,
			startConfigVisible,
			startConfig,
			menu,
			menuVisible,
			menuSelected,
			onMenuClick,
			onViewApply,
			onStartApply
		};
	}
};
</script>
