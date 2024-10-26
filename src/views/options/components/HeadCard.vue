<template>
	<card
		class="head-card"
		:title="$t('options.head.title')"
		:menu="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST ? menu : undefined"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<v-select
						v-model="protocol"
						:label="$t('options.head.protocol.title')"
						:items="listProtocol"
						:hint="$t('options.head.protocol.description')"
						variant="underlined"
						item-title="label"
						item-value="value"
						persistent-hint
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="reverseUart"
						:title="$t('options.head.reverseUart.title')"
						:description="$t('options.head.reverseUart.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="onboardShow"
						:title="$t('options.head.onboardShow.title')"
						:description="$t('options.head.onboardShow.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendButton"
						:title="$t('options.head.sendButton.title')"
						:description="$t('options.head.sendButton.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col
					v-if="carModel !== TCarModel.CAR_MODEL_MAZDA_CX9 && carModel !== TCarModel.CAR_MODEL_MAZDA_CX9_REST"
					cols="12"
					class="pt-0 pb-0"
				>
					<switch-card-item
						v-model="sendClimate"
						:title="$t('options.head.sendClimate.title')"
						:description="$t('options.head.sendClimate.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col v-if="carModel === TCarModel.CAR_MODEL_MAZDA_3_BK || carModel === TCarModel.CAR_MODEL_MAZDA_3_BL" cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendDoors"
						:title="$t('options.head.sendDoors.title')"
						:description="$t('options.head.sendDoors.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="sendOnboard"
						:title="$t('options.head.sendOnboard.title')"
						:description="$t('options.head.sendOnboard.description')"
						color="success"
						:nodata="!headConfigLoaded"
						:disabled="!headConfigLoaded"
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
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { TProtocol } from "@/models/pjcan/head-unit";
import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "HeadCard",
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

		const headConfigLoaded = computed((): boolean => store.getters["config/head"].isData);

		const protocol = computed({
			get: (): TProtocol => store.getters["config/head"].protocol,
			set: (val: TProtocol) => store.commit("config/setHeadProtocol", val)
		});
		const reverseUart = computed({
			get: (): boolean => store.getters["config/head"].reverseUart,
			set: (val: boolean) => store.commit("config/setHeadReverseUart", val)
		});
		const onboardShow = computed({
			get: (): boolean => store.getters["config/head"].showTextOfLogo,
			set: (val: boolean) => store.commit("config/setHeadShowTextOfLogo", val)
		});
		const sendButton = computed({
			get: (): boolean => store.getters["config/head"].sendButton,
			set: (val: boolean) => store.commit("config/setHeadSendButton", val)
		});
		const sendClimate = computed({
			get: (): boolean => store.getters["config/head"].sendClimate,
			set: (val: boolean) => store.commit("config/setHeadSendClimate", val)
		});
		const sendDoors = computed({
			get: (): boolean => store.getters["config/head"].sendDoors,
			set: (val: boolean) => store.commit("config/setHeadSendDoors", val)
		});
		const sendOnboard = computed({
			get: (): boolean => store.getters["config/head"].sendOnboard,
			set: (val: boolean) => store.commit("config/setHeadSendOnboard", val)
		});
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);

		/** Список протоколов */
		const listProtocol = computed((): object[] =>
		{
			const list: any = tm("options.head.protocol.list");
			const result = [];
			for (const key in list) result.push({ label: list[key], value: Number(key) });
			return result;
		});

		const menu = computed((): IMenuItem[] => [
			{
				title: t("options.head.onboardShow.menu"),
				view: store.getters["view/headText"],
				disabled: !store.getters["view/headText"].isData
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
			headConfigLoaded,
			protocol,
			reverseUart,
			onboardShow,
			sendButton,
			sendClimate,
			sendDoors,
			sendOnboard,
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
