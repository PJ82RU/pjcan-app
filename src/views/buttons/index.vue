<template>
	<flicking ref="flicking" class="listSW1" :options="{ bound: true, align: 'prev' }">
		<div
			v-for="(item, index) in listButtons"
			:key="`button-item_${index}`"
			class="mr-4"
			:class="`flicking-${display}`"
		>
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				:icon="item.icon"
				:config="item.config"
				:config-loaded="item.configLoaded"
				@update="onButtonConfigUpdate"
			/>
		</div>
	</flicking>

	<button-definition-dialog
		v-model="buttonDefinitionVisibleDialog"
		:list="listButtons"
		:resistance="buttonDefinitionResistance"
		:id="buttonDefinitionId"
		@click:apply="onButtonDefinitionApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useDisplay } from "vuetify";
// import { useI18n } from "vue-i18n";
import canbus from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";

import {
	API_BUTTON_SW1_VALUE_EVENT,
	API_BUTTON_SW3_VALUE_EVENT,
	API_BUTTONS_SW1_CONFIG_EVENT,
	API_BUTTONS_SW1_CONFIG_EXEC,
	API_BUTTONS_SW3_CONFIG_EVENT,
	API_BUTTONS_SW3_CONFIG_EXEC,
	ButtonsConfig,
	IButtonConfigItem,
	IButtonsConfig,
	IButtonValue
} from "@/models/pjcan/buttons";
import { API_CANBUS_EVENT } from "@/models/pjcan/base/BaseModel";
import { IButtonCard } from "@/models/interfaces/IButtonCard";
import router from "@/router";
import store from "@/store";

export default {
	name: "Buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog },
	setup()
	{
		const { name: display } = useDisplay();
		// const { t } = useI18n();
		const flicking = ref(null);
		provide("flicking", flicking);

		let buttonsConfig: IButtonsConfig;
		let buttonsValue: IButtonValue;

		const type = computed(() => router.currentRoute.value.query?.type);
		const buttonsConfigLoaded = ref(false);
		const buttonDefinitionVisibleDialog = ref(false);
		const buttonDefinitionResistance = computed((): number =>
			buttonDefinitionVisibleDialog.value ? buttonsValue.resistance : 0
		);
		const buttonDefinitionId = computed((): number =>
			buttonDefinitionVisibleDialog.value ? buttonsValue.id : 0
		);
		const listButtons = ref([] as IButtonCard[]);

		/** Загрузка списка кнопок */
		const loadListButtons = (): void =>
		{
			let readKey, getKey;

			if (type.value === "sw1")
			{
				readKey = "app/readListButtonsSW1";
				getKey = "app/listButtonsSW1";
			}
			else if (type.value === "sw3")
			{
				readKey = "app/readListButtonsSW3";
				getKey = "app/listButtonsSW3";
			}
			else
			{
				readKey = "";
				getKey = "";
			}

			if (readKey?.length)
			{
				store.dispatch(readKey);
				listButtons.value =
					store.getters[getKey]?.map((x: IButtonCard) => ({
						...x,
						config: null,
						configLoaded: false
					})) ?? ([] as IButtonCard[]);
			}
		};

		/** Сохранить список кнопок */
		const saveListButtons = (): void =>
		{
			let writeKey, setKey;

			if (type.value === "sw1")
			{
				writeKey = "app/writeListButtonsSW1";
				setKey = "app/setListButtonsSW1";
			}
			else if (type.value === "sw3")
			{
				writeKey = "app/writeListButtonsSW3";
				setKey = "app/setListButtonsSW3";
			}
			else
			{
				writeKey = "";
				setKey = "";
			}

			if (writeKey?.length)
			{
				store.commit(setKey, listButtons.value);
				store.dispatch(writeKey);
			}
		};

		/** Изменение значений конфигурации кнопок */
		const onButtonConfigUpdate = (item: IButtonConfigItem): void =>
		{
			const button = listButtons.value.find((x) => x.id === item.id);
			if (button && button.configLoaded)
			{
				button.configLoaded = false;
				canbus.query(buttonsConfig);
			}
		};

		/**
		 * Применить конфигурацию определенной кнопки
		 * @param {number | undefined} id ID кнопки
		 * @param {number} resistanceMin Минимальное сопротивление кнопки
		 * @param {number} resistanceMax Максимальное сопротивление кнопки
		 */
		const onButtonDefinitionApply = (id: number | undefined, resistanceMin: number, resistanceMax: number): void =>
		{
			if (id)
			{
				const item: IButtonConfigItem | undefined = buttonsConfig?.items?.find((x: IButtonConfigItem) => x.id === id);
				if (item && (item.resistanceMin !== resistanceMin || item.resistanceMax !== resistanceMax))
				{
					item.resistanceMin = resistanceMin;
					item.resistanceMax = resistanceMax;
					canbus.query(buttonsConfig);
				}
			}
		};

		/**
		 * Отправлять значение нажатой кнопки
		 * @param {boolean} enabled Вкл/выкл
		 */
		const enabledSendValue = (enabled: boolean): void =>
		{
			if (buttonsConfig.isData && buttonsConfig.programming !== enabled)
			{
				buttonsConfig.programming = enabled;
				canbus.query(buttonsConfig);
			}
		};

		const onButtonsConfigReceive = (res: IButtonsConfig): void =>
		{
			buttonsConfigLoaded.value = res.isData;
			buttonsConfig = res;

			/** Список конфигураций кнопок */
			if (res.isData)
			{
				buttonsConfig.items.forEach((item: IButtonConfigItem) =>
				{
					const button = listButtons.value.find((x) => x.id === item.id);
					if (button)
					{
						button.config = item;
						button.configLoaded = true;
					}
				});
			}

			// Включаем определение нажатой кнопки.
			// Выключится автоматически, при запросе значений или ручками в onUnmounted
			enabledSendValue(true);
		};
		const onButtonsValueReceive = (res: IButtonValue): void =>
		{
			if (res.isData && !buttonDefinitionVisibleDialog.value)
			{
				buttonsValue = res;
				buttonDefinitionVisibleDialog.value = true;
			}
		};

		const listener = (type?: any): void =>
		{
			canbus.removeListener(API_BUTTONS_SW1_CONFIG_EVENT, onButtonsConfigReceive);
			canbus.removeListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
			canbus.removeListener(API_BUTTONS_SW3_CONFIG_EVENT, onButtonsConfigReceive);
			canbus.removeListener(API_BUTTON_SW3_VALUE_EVENT, onButtonsValueReceive);

			buttonsConfigLoaded.value = false;
			buttonsConfig = {} as IButtonsConfig;

			if (type === "sw1")
			{
				canbus.addListener(API_BUTTONS_SW1_CONFIG_EVENT, onButtonsConfigReceive);
				canbus.addListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
				canbus.query(new ButtonsConfig(API_BUTTONS_SW1_CONFIG_EXEC), true);
			}
			else if (type === "sw3")
			{
				canbus.addListener(API_BUTTONS_SW3_CONFIG_EVENT, onButtonsConfigReceive);
				canbus.addListener(API_BUTTON_SW3_VALUE_EVENT, onButtonsValueReceive);
				canbus.query(new ButtonsConfig(API_BUTTONS_SW3_CONFIG_EXEC), true);
			}
		};
		watch(type, (val: any) =>
		{
			if (val.name === "Buttons") listener(val);
		});
		const onBegin = (status: boolean): void =>
		{
			if (status) listener(type.value);
		};
		onMounted(() =>
		{
			loadListButtons();
			canbus.addListener(API_CANBUS_EVENT, onBegin);
			onBegin(canbus.begin);
		});
		onUnmounted(() =>
		{
			enabledSendValue(false);
			listener();
			canbus.removeListener(API_CANBUS_EVENT, onBegin);
		});

		return {
			flicking,
			display,
			buttonsConfigLoaded,
			listButtons,
			buttonDefinitionVisibleDialog,
			buttonDefinitionResistance,
			buttonDefinitionId,
			onButtonConfigUpdate,
			onButtonDefinitionApply
		};
	}
};
</script>

<style lang="scss" scoped>
.listSW1 {
	height: 100%;

	::v-deep(.settings-card-1 .mdi-play) {
		transform: rotate(-90deg);
	}
	::v-deep(.settings-card-2 .mdi-play) {
		transform: rotate(90deg);
	}
}
</style>
