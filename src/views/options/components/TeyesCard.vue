<template>
	<card
		class="teyes-card"
		:title="$t('options.teyes.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
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
import { TProtocol } from "@/models/pjcan/teyes";
import { TCarModel } from "@/models/pjcan/mazda";

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

		const teyesConfigLoaded = computed((): boolean => store.getters["config/teyes"].isData);

		const protocol = computed({
			get: (): TProtocol => store.getters["config/teyes"].protocol,
			set: (val: TProtocol) => store.commit("config/setTeyesProtocol", val)
		});
		const reverseUart = computed({
			get: (): boolean => store.getters["config/teyes"].reverseUart,
			set: (val: boolean) => store.commit("config/setTeyesReverseUart", val)
		});
		const lcdShow = computed({
			get: (): boolean => store.getters["config/teyes"].lcdShow,
			set: (val: boolean) => store.commit("config/setTeyesLcdShow", val)
		});
		const sendButton = computed({
			get: (): boolean => store.getters["config/teyes"].sendButton,
			set: (val: boolean) => store.commit("config/setTeyesSendButton", val)
		});
		const sendClimate = computed({
			get: (): boolean => store.getters["config/teyes"].sendClimate,
			set: (val: boolean) => store.commit("config/setTeyesSendClimate", val)
		});
		const sendDoors = computed({
			get: (): boolean => store.getters["config/teyes"].sendDoors,
			set: (val: boolean) => store.commit("config/setTeyesSendDoors", val)
		});
		const parseVolume = computed({
			get: (): boolean => store.getters["config/teyes"].parseVolume,
			set: (val: boolean) => store.commit("config/setTeyesParseVolume", val)
		});
		const receiveClock = computed({
			get: (): boolean => store.getters["config/teyes"].receiveClock,
			set: (val: boolean) => store.commit("config/setTeyesReceiveClock", val)
		});
		const receiveText = computed({
			get: (): boolean => store.getters["config/teyes"].receiveText,
			set: (val: boolean) => store.commit("config/setTeyesReceiveText", val)
		});
		const receiveButtons = computed({
			get: (): boolean => store.getters["config/teyes"].receiveButtons,
			set: (val: boolean) => store.commit("config/setTeyesReceiveButtons", val)
		});
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		/** Список протоколов */
		const listProtocol = computed((): object[] =>
		{
			const list: any = tm("options.teyes.protocol.list");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		const menu = computed((): IMenuItem[] => [
			{
				title: t("options.teyes.lcdShow.menu"),
				view: store.getters["view/teyesText"],
				disabled: !store.getters["view/teyesText"].isData
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
			teyesConfigLoaded,
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
			onMenuClick,
			onViewApply
		};
	}
};
</script>
