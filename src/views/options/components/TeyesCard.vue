<template>
	<card class="teyes-card" :title="$t('options.teyes.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<v-select
						v-model="protocol"
						:label="$t('options.teyes.protocol.title')"
						:items="listProtocol"
						:hint="$t('options.teyes.protocol.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!teyesConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="reverseUart"
						:title="$t('options.teyes.reverseUart.title')"
						:description="$t('options.teyes.reverseUart.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="lcdShow"
						:title="$t('options.teyes.lcdShow.title')"
						:description="$t('options.teyes.lcdShow.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendButton"
						:title="$t('options.teyes.sendButton.title')"
						:description="$t('options.teyes.sendButton.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col
					v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9 && carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST"
					cols="12"
					class="pt-0 pb-0"
				>
					<switch-card-item
						v-model="sendClimate"
						:title="$t('options.teyes.sendClimate.title')"
						:description="$t('options.teyes.sendClimate.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendDoors"
						:title="$t('options.teyes.sendDoors.title')"
						:description="$t('options.teyes.sendDoors.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="parseVolume"
						:title="$t('options.teyes.parseVolume.title')"
						:description="$t('options.teyes.parseVolume.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="receiveText"
						:title="$t('options.teyes.receiveText.title')"
						:description="$t('options.teyes.receiveText.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="receiveButtons"
						:title="$t('options.teyes.receiveButtons.title')"
						:description="$t('options.teyes.receiveButtons.description')"
						color="success"
						:nodata="!teyesConfigLoaded"
						:disabled="!teyesConfigLoaded"
						@change="onApplyTeyesConfig"
					/>
				</v-col>
				<!--<v-col cols="12" class="pt-0 pb-0">-->
				<!--	<switch-card-item-->
				<!--		v-model="receiveClock"-->
				<!--		:title="$t('options.teyes.receiveClock.title')"-->
				<!--		:description="$t('options.teyes.receiveClock.description')"-->
				<!--		color="success"-->
				<!--		:nodata="!teyesConfigLoaded"-->
				<!--		:disabled="!teyesConfigLoaded"-->
				<!--		@change="onApplyTeyesConfig"-->
				<!--	/>-->
				<!--</v-col>-->
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
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import canbus from "@/api/canbus";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";
import { IMenuItem } from "@/components/MenuDots.vue";

import {
	API_TEYES_CONFIG_EVENT,
	API_TEYES_CONFIG_EXEC,
	API_TEYES_TEXT_VIEW_EVENT,
	API_TEYES_TEXT_VIEW_EXEC,
	ITeyesConfig,
	TeyesConfig
} from "@/models/pjcan/teyes";
import { IViewConfig } from "@/models/pjcan/view";
import { TCarModel } from "@/models/pjcan/mazda";
import { ChoiceValue } from "@/models/pjcan/choice";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";

export default {
	name: "TeyesCard",
	computed: {
		TCarModel()
		{
			return TCarModel;
		}
	},
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t, tm } = useI18n();

		const teyesConfigLoaded = ref(true);
		const teyesTextViewLoaded = ref(false);

		const protocol = ref(2);
		const reverseUart = ref(false);
		const lcdShow = ref(false);
		const sendButton = ref(false);
		const sendClimate = ref(false);
		const sendDoors = ref(false);
		const parseVolume = ref(false);
		const receiveClock = ref(false);
		const receiveText = ref(false);
		const receiveButtons = ref(false);

		const carModel = computed((): TCarModel => store.getters["app/carModel"]);

		/** Список протоколов */
		const listProtocol = computed((): object[] =>
		{
			const list: any = tm("options.teyes.protocol.list");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		watch(protocol, (val) =>
		{
			if (val && teyesConfigLoaded.value) onApplyTeyesConfig();
		});

		let teyesView: IViewConfig;

		const menu = computed((): IMenuItem[] => [
			{ title: t("options.teyes.lcdShow.menu"), view: teyesView, disabled: !teyesTextViewLoaded.value }
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

		/**
		 * Входящие значения отображения
		 * @param {ITeyesView} res
		 */
		const onReceiveTeyesTextView = (res: IViewConfig): void =>
		{
			teyesTextViewLoaded.value = res.isData;
			teyesView = res;
		};

		/**
		 * Входящая конфигурация Teyes
		 * @param {ITeyesConfig} res
		 */
		const onReceiveTeyesConfig = (res: ITeyesConfig): void =>
		{
			teyesConfigLoaded.value = res.isData;
			if (res.isData)
			{
				protocol.value = res.protocol;
				reverseUart.value = res.reverseUart;
				lcdShow.value = res.lcdShow;
				sendButton.value = res.sendButton;
				sendClimate.value = res.sendClimate;
				sendDoors.value = res.sendDoors;
				parseVolume.value = res.parseVolume;
				receiveClock.value = res.receiveClock;
				receiveText.value = res.receiveText;
				receiveButtons.value = res.receiveButtons;
			}
		};

		/** Применить новые значения конфигурации Teyes */
		const onApplyTeyesConfig = (): void =>
		{
			const conf = new TeyesConfig();
			conf.protocol = protocol.value;
			conf.reverseUart = reverseUart.value;
			conf.lcdShow = lcdShow.value;
			conf.sendButton = sendButton.value;
			conf.sendClimate = sendClimate.value;
			conf.sendDoors = sendDoors.value;
			conf.parseVolume = parseVolume.value;
			conf.receiveClock = receiveClock.value;
			conf.receiveText = receiveText.value;
			conf.receiveButtons = receiveButtons.value;
			canbus.query(conf);
		};

		const choiceId = Math.round(Math.random() * 1000000);
		const onBegin = (status: boolean): void =>
		{
			if (status)
			{
				const choice = new ChoiceValue();
				choice.id = choiceId;
				choice.listID = [API_TEYES_CONFIG_EXEC, API_TEYES_TEXT_VIEW_EXEC];
				canbus.query(choice, true);
			}
		};
		onMounted(() =>
		{
			canbus.addListener(API_TEYES_CONFIG_EVENT, onReceiveTeyesConfig);
			canbus.addListener(API_TEYES_TEXT_VIEW_EVENT, onReceiveTeyesTextView);
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			canbus.removeListener(API_TEYES_CONFIG_EVENT, onReceiveTeyesConfig);
			canbus.removeListener(API_TEYES_TEXT_VIEW_EVENT, onReceiveTeyesTextView);
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			teyesConfigLoaded,
			teyesTextViewLoaded,
			protocol,
			reverseUart,
			lcdShow,
			sendButton,
			sendClimate,
			sendDoors,
			parseVolume,
			receiveClock,
			receiveText,
			receiveButtons,
			listProtocol,
			carModel,
			menu,
			menuVisible,
			menuSelected,
			onApplyTeyesConfig,
			onMenuClick,
			onViewSettingApply
		};
	}
};
</script>
