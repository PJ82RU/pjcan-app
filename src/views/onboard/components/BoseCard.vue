<template>
	<card class="climate-card" :title="$t('onboard.bose.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						v-model="enabled"
						:title="$t('onboard.bose.enabled.title')"
						:description="$t('onboard.bose.enabled.description')"
						:icon-name="['bose']"
						:nodata="!isLoadedBoseConfig"
						:disabled="!isLoadedBoseView"
						@change="onApplyBoseConfig"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<slider-card-item
						v-model="volume"
						:title="$t('onboard.volume.level.title')"
						:description="$t('onboard.volume.level.description')"
						:max="max"
						:nodata="!isLoadedVolumeConfig"
						:disabled="!isLoadedVolumeView || !enabled[0]"
                        @change="onApplyVolumeConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="mute"
						:title="$t('onboard.volume.mute.title')"
						:description="$t('onboard.volume.mute.description')"
						color="warning"
						:nodata="!isLoadedVolumeConfig"
						:disabled="!isLoadedVolumeView || !enabled[0]"
                        @change="onApplyVolumeConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="audioPLT"
						:title="$t('onboard.bose.audioPLT.title')"
						:description="$t('onboard.bose.audioPLT.description')"
						color="success"
						:nodata="!isLoadedBoseConfig"
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<select-card-item
						v-model="centerPoint"
						:title="$t('onboard.bose.centerPoint.title')"
						:description="$t('onboard.bose.centerPoint.description')"
						:items="centerPointList"
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
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
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
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
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
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
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
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
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<switch-card-item
						v-model="wow"
						:title="$t('onboard.bose.wow.title')"
						:description="$t('onboard.bose.wow.description')"
						color="success"
						:nodata="!isLoadedBoseConfig"
						:disabled="!isLoadedBoseView || !enabled[0]"
						@change="onApplyBoseConfig"
					/>
				</v-col>
			</v-row>
		</template>
	</card>

	<view-setting-dialog
		v-model="menuVisible"
		:title="menuSelected.title"
		:enabled="menuViewConfig.enabled"
		:type="menuViewConfig.type"
		:time="menuViewConfig.time"
		:disabled="!isLoadedBoseView"
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import SelectCardItem from "@/components/cards/SelectCardItem.vue";
import ViewSettingDialog from "@/views/onboard/components/ViewSettingDialog.vue";

import {
	API_VARIABLE_BOSE_EVENT,
	API_VARIABLE_BOSE_EXEC,
	API_VARIABLE_BOSE_VIEW_EVENT,
	API_VARIABLE_BOSE_VIEW_EXEC,
	IBoseConfig,
	IBoseView,
	TCenterPoint
} from "@/models/pjcan/variables/bose";
import { IViewConfig } from "@/models/pjcan/view";
import { IMenuItem } from "@/components/MenuDots.vue";

import canbus from "@/api/canbus";
import {
	API_VARIABLE_VOLUME_CONFIG_EVENT,
	API_VARIABLE_VOLUME_CONFIG_EXEC,
	API_VARIABLE_VOLUME_VIEW_EVENT,
	IVolumeConfig,
	IVolumeView
} from "@/models/pjcan/variables/volume";

import { createDebounce } from "@/utils/debounce";

export default {
	name: "BoseCard",
	components: {
		ViewSettingDialog,
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

		// Bose

		const isLoadedBoseConfig = ref(false);
		const isLoadedBoseView = ref(false);

		const enabled = ref([false]);
		const audioPLT = ref(false);
		const radioFM = ref(false);
		const wow = ref(false);
		const balance = ref(0);
		const bass = ref(0);
		const fade = ref(0);
		const treble = ref(0);
		const centerPoint = ref(TCenterPoint.CENTERPOINT_OFF);

		const centerPointList = computed(() => [
			{ title: "OFF", value: TCenterPoint.CENTERPOINT_OFF },
			{ title: "MIN", value: TCenterPoint.CENTERPOINT_MIN },
			{ title: "LOW", value: TCenterPoint.CENTERPOINT_LOW },
			{ title: "MID", value: TCenterPoint.CENTERPOINT_MID },
			{ title: "HI", value: TCenterPoint.CENTERPOINT_HI },
			{ title: "MAX", value: TCenterPoint.CENTERPOINT_MAX }
		]);

		let disabledBoseConfig = false;
		const debounceBoseConfig = createDebounce();

		/** Входящие значения Bose */
		const onReceiveBoseConfig = (res: IBoseConfig): void =>
		{
			isLoadedBoseConfig.value = res.isData;
			if (res.isData)
			{
				enabled.value[0] = res.enabled;
				audioPLT.value = res.audioPLT;
				radioFM.value = res.radioFM;
				wow.value = res.wow;
				balance.value = res.balance;
				bass.value = res.bass;
				fade.value = res.fade;
				treble.value = res.treble;
				centerPoint.value = res.centerPoint as TCenterPoint;

				disabledBoseConfig = false;
			}
		};
		/** Входящие значения отображения климат-контроля */
		const onReceiveBoseView = (res: IBoseView): void =>
		{
			isLoadedBoseView.value = res.isData;
		};
		/** Применить значения Bose */
		const onApplyBoseConfig = (): void =>
		{
			if (isLoadedBoseConfig.value && !disabledBoseConfig)
			{
				disabledBoseConfig = true;
				debounceBoseConfig(() => (disabledBoseConfig = false), 1000);

				canbus.configs.variable.bose.enabled = enabled.value[0];
				canbus.configs.variable.bose.audioPLT = audioPLT.value;
				canbus.configs.variable.bose.radioFM = radioFM.value;
				canbus.configs.variable.bose.wow = wow.value;
				canbus.configs.variable.bose.balance = balance.value;
				canbus.configs.variable.bose.bass = bass.value;
				canbus.configs.variable.bose.fade = fade.value;
				canbus.configs.variable.bose.treble = treble.value;
				canbus.configs.variable.bose.centerPoint = centerPoint.value;
				canbus.queryConfig(API_VARIABLE_BOSE_EXEC);
			}
		};

		// Volume

		const isLoadedVolumeConfig = ref(false);
		const isLoadedVolumeView = ref(false);

		const mute = ref(false);
		const volume = ref(0);
		const max = ref(0);

		let disabledVolumeConfig = false;
		const debounceVolumeConfig = createDebounce();

		/** Входящие конфигурация звука */
		const onReceiveVolumeConfig = (res: IVolumeConfig): void =>
		{
			isLoadedVolumeConfig.value = res.isData;
			if (res.isData)
			{
				mute.value = res.mute;
				volume.value = res.volume;
				max.value = res.max;

				disabledVolumeConfig = false;
			}
		};
		/** Входящие значения отображения звука */
		const onReceiveVolumeView = (res: IVolumeView): void =>
		{
			isLoadedVolumeView.value = res.isData;
		};
		/** Применить значения звука */
		const onApplyVolumeConfig = (): void =>
		{
			if (isLoadedVolumeConfig.value && !disabledVolumeConfig)
			{
				disabledVolumeConfig = true;
				debounceVolumeConfig(() => (disabledVolumeConfig = false), 1000);

				canbus.configs.variable.volume.mute = mute.value;
				canbus.configs.variable.volume.volume = volume.value;
				canbus.queryConfig(API_VARIABLE_VOLUME_CONFIG_EXEC);
			}
		};

		// регистрируем события
		onMounted(() =>
		{
			canbus.addListener(API_VARIABLE_BOSE_EVENT, onReceiveBoseConfig);
			canbus.addListener(API_VARIABLE_BOSE_VIEW_EVENT, onReceiveBoseView);
			canbus.addListener(API_VARIABLE_VOLUME_CONFIG_EVENT, onReceiveVolumeConfig);
			canbus.addListener(API_VARIABLE_VOLUME_VIEW_EVENT, onReceiveVolumeView);
			onReceiveBoseConfig(canbus.configs.variable.bose);
			onReceiveBoseView(canbus.views.variable.bose);
			onReceiveVolumeConfig(canbus.configs.variable.volume);
			onReceiveVolumeView(canbus.views.variable.volume);
		});
		// удаляем события
		onUnmounted(() =>
		{
			canbus.removeListener(API_VARIABLE_BOSE_EVENT, onReceiveBoseConfig);
			canbus.removeListener(API_VARIABLE_BOSE_VIEW_EVENT, onReceiveBoseView);
			canbus.removeListener(API_VARIABLE_VOLUME_CONFIG_EVENT, onReceiveVolumeConfig);
			canbus.removeListener(API_VARIABLE_VOLUME_VIEW_EVENT, onReceiveVolumeView);
		});

		// МЕНЮ ОТОБРАЖЕНИЯ

		const menu = computed((): IMenuItem[] => [{ id: 0, title: t("onboard.bose.menu") }]);
		const menuVisible = ref(false);
		const menuSelected = ref({} as IMenuItem);
		const menuViewConfig = ref({} as IViewConfig);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			menuVisible.value = true;
			menuSelected.value = item;
			menuViewConfig.value = canbus.views.variable.bose.view;
		};

		/**
		 * Применить параметры отображения на информационном экране
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.views.variable.bose.view = data;
			canbus.queryView(API_VARIABLE_BOSE_VIEW_EXEC);
		};

		return {
			isLoadedBoseConfig,
			isLoadedBoseView,
			isLoadedVolumeConfig,
			isLoadedVolumeView,
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
			max,
			menu,
			menuVisible,
			menuSelected,
			menuViewConfig,
			onApplyBoseConfig,
			onApplyVolumeConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
