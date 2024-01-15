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
						:nodata="!boseConfigLoaded"
						:disabled="!boseViewLoaded"
						@change="onApplyBoseConfig"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<slider-card-item
						v-model="volume"
						:title="$t('onboard.volume.level.title')"
						:description="$t('onboard.volume.level.description')"
						:max="63"
						:nodata="!volumeConfigLoaded"
						:disabled="!enabled[0]"
						@change="onApplyVolumeConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="mute"
						:title="$t('onboard.volume.mute.title')"
						:description="$t('onboard.volume.mute.description')"
						color="warning"
						:nodata="!volumeConfigLoaded"
						:disabled="!enabled[0]"
						@change="onApplyVolumeConfig"
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
						@change="onApplyBoseConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0">
					<select-card-item
						v-model="centerPoint"
						:title="$t('onboard.bose.centerPoint.title')"
						:description="$t('onboard.bose.centerPoint.description')"
						:items="centerPointList"
						:disabled="!boseViewLoaded || !enabled[0]"
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
						:disabled="!boseViewLoaded || !enabled[0]"
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
						:disabled="!boseViewLoaded || !enabled[0]"
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
						:disabled="!boseViewLoaded || !enabled[0]"
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
						:disabled="!boseViewLoaded || !enabled[0]"
						@change="onApplyBoseConfig"
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
						@change="onApplyBoseConfig"
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
		@click:apply="onViewSettingApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { createDebounce } from "@/utils/debounce";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";
import SliderCardItem from "@/components/cards/SliderCardItem.vue";
import SelectCardItem from "@/components/cards/SelectCardItem.vue";
import ViewSettingDialog from "@/views/onboard/components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_BOSE_CONFIG_EVENT,
	API_BOSE_CONFIG_EXEC,
	API_BOSE_VIEW_EVENT,
	API_BOSE_VIEW_EXEC,
	BoseConfig,
	IBoseConfig,
	TCenterPoint
} from "@/models/pjcan/bose";
import {
	API_VOLUME_CONFIG_EVENT,
	API_VOLUME_CONFIG_EXEC,
	IVolumeConfig,
	VolumeConfig
} from "@/models/pjcan/volume";
import { IViewConfig } from "@/models/pjcan/view";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { ChoiceValue } from "@/models/pjcan/choice";

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

		const boseConfigLoaded = ref(false);
		const boseViewLoaded = ref(false);
		const volumeConfigLoaded = ref(false);

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
		const mute = ref(false);
		const volume = ref(0);

		let boseView: IViewConfig;

		const menu = computed((): IMenuItem[] => [
			{ id: 0, title: t("onboard.bose.menu"), view: boseView, disabled: !boseViewLoaded.value }
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
		 * @param {IViewConfig} data Новые параметры отображения
		 */
		const onViewSettingApply = (data: IViewConfig): void =>
		{
			canbus.query(data);
		};

		let disabledBoseConfig = false;
		const debounceBoseConfig = createDebounce();

		/** Применить значения Bose */
		const onApplyBoseConfig = (): void =>
		{
			if (boseConfigLoaded.value && !disabledBoseConfig)
			{
				disabledBoseConfig = true;
				debounceBoseConfig(() => (disabledBoseConfig = false), 1000);

				const config = new BoseConfig();
				config.on = enabled.value[0];
				config.audioPlt = audioPLT.value;
				config.radioFM = radioFM.value;
				config.wow = wow.value;
				config.balance = balance.value;
				config.bass = bass.value;
				config.fade = fade.value;
				config.treble = treble.value;
				config.centerPoint = centerPoint.value;
				canbus.query(config);
			}
		};

		let disabledVolumeConfig = false;
		const debounceVolumeConfig = createDebounce();

		/** Применить значения звука */
		const onApplyVolumeConfig = (): void =>
		{
			if (volumeConfigLoaded.value && !disabledVolumeConfig)
			{
				disabledVolumeConfig = true;
				debounceVolumeConfig(() => (disabledVolumeConfig = false), 1000);

				const config = new VolumeConfig();
				config.muteBose = mute.value;
				config.volumeBose = volume.value;
				canbus.query(config);
			}
		};

		/** Входящие значения Bose */
		const onBoseConfigReceive = (res: IBoseConfig): void =>
		{
			boseConfigLoaded.value = res.isData;
			if (res.isData)
			{
				enabled.value[0] = res.on;
				audioPLT.value = res.audioPlt;
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
		const onBoseViewReceive = (res: IViewConfig): void =>
		{
			boseViewLoaded.value = res.isData;
			boseView = res;
		};
		/** Входящие конфигурация звука */
		const onVolumeConfigReceive = (res: IVolumeConfig): void =>
		{
			volumeConfigLoaded.value = res.isData;
			if (res.isData)
			{
				mute.value = res.muteBose;
				volume.value = res.volumeBose;

				disabledVolumeConfig = false;
			}
		};

		const choiceId = Math.round(Math.random() * 1000000);
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.id = choiceId;
				choice.listID = [
					API_BOSE_CONFIG_EXEC,
					API_BOSE_VIEW_EXEC,
					API_VOLUME_CONFIG_EXEC
				];
				canbus.query(choice, true);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_BOSE_CONFIG_EVENT, onBoseConfigReceive);
			canbus.addListener(API_BOSE_VIEW_EVENT, onBoseViewReceive);
			canbus.addListener(API_VOLUME_CONFIG_EVENT, onVolumeConfigReceive);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_BOSE_CONFIG_EVENT, onBoseConfigReceive);
			canbus.removeListener(API_BOSE_VIEW_EVENT, onBoseViewReceive);
			canbus.removeListener(API_VOLUME_CONFIG_EVENT, onVolumeConfigReceive);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			boseConfigLoaded,
			boseViewLoaded,
			volumeConfigLoaded,
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
			menu,
			menuVisible,
			menuSelected,
			onApplyBoseConfig,
			onApplyVolumeConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
