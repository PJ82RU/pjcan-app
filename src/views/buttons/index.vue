<template>
	<flicking v-if="configLoaded" ref="flicking" class="listSW1" :options="{ bound: true, align: 'prev' }">
		<div
			v-for="(item, index) in listWithoutEmpty"
			:key="`button-item_${index}`"
			class="mr-4"
			:class="`flicking-${display}`"
		>
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				:icon="item.icon"
				:config="item.config"
				:mode="isMode"
				@update="onButtonConfigUpdate"
				@click="onButtonEdit(item)"
			/>
		</div>
	</flicking>

	<button-definition-dialog
		v-model="definitionDialog"
		:types="list"
		:value-id="value?.id"
		:value-resistance="value?.resistance"
		@click:apply="onButtonDefinitionApply"
	/>
	<button-edit-dialog
		v-model="addDialog"
		:name="selectedItem?.title"
		:press="selectedItem?.config?.exec[1]"
		:value-resistance="value?.resistance"
		:resistance-min="selectedItem?.config?.resistanceMin"
		:resistance-max="selectedItem?.config?.resistanceMax"
		@click:apply="onButtonAddApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import router from "@/router";
import store from "@/store";
import canbus from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";
import ButtonEditDialog from "./components/ButtonEditDialog.vue";

import {
	API_BUTTON_SW1_VALUE_EVENT,
	IButtonConfigItem,
	IButtonValue,
	TButtonExec
} from "@/models/pjcan/buttons";
import { IButtonCard } from "@/models/interfaces/IButtonCard";
import { IButtonKey } from "@/models/interfaces/IButtonKey";

export default {
	name: "Buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog, ButtonEditDialog },
	setup()
	{
		const { name: display } = useDisplay();
		const { t } = useI18n();
		const flicking = ref(null);
		provide("flicking", flicking);

		const __type = computed(() => router.currentRoute.value.query?.type);
		const __getKey = (type: any): IButtonKey | undefined =>
		{
			switch (type)
			{
				case "sw1":
					return {
						app: "app/sw1",
						set: "app/setSW1",
						read: "app/readSW1",
						write: "app/writeSW1",
						config: "config/sw1",
						setItem: "config/setSW1Item",
						setResistance: "config/setSW1Resistance",
						setProgramming: "config/setSW1Programming",
						value: "value/sw1"
					} as IButtonKey;
			}
		};

		const keys = computed((): IButtonKey | undefined => __getKey(__type.value));
		const configLoaded = computed((): boolean => keys.value && store.getters[keys.value.config].isData);
		const value = computed((): IButtonValue | undefined =>
			keys.value ? store.getters[keys.value.value] : undefined
		);
		const isMode = computed(() =>
		{
			return (
				keys.value &&
				(store.getters[keys.value.config].items
					?.filter((x: IButtonConfigItem) => x.extended)
					?.findIndex(
						(x: IButtonConfigItem) =>
							x.exec.findIndex((y: TButtonExec) => y === TButtonExec.BUTTON_EXEC_ENTERING_MODE) >= 0
					) >= 0 ??
					false)
			);
		});
		const list = ref([] as IButtonCard[]);
		const listWithoutEmpty = computed((): IButtonCard[] => list.value?.filter((x: IButtonCard) => x.title?.length) ?? []);
		const definitionDialog = ref(false);
		const addDialog = ref(false);
		const selectedItem = ref(undefined as IButtonCard | undefined);

		/** Загрузка списка кнопок */
		const loadButtons = (type: any): IButtonKey | undefined =>
		{
			const key = __getKey(type);
			if (key)
			{
				store.dispatch(key.read);
				list.value = store.getters[key.config].items.map((config: IButtonConfigItem) => ({
					...(store.getters[key.app]?.find((x: IButtonCard) => x.id === config.id) ??
						({ id: config.id, title: "", icon: "" } as IButtonCard)),
					config: { ...config }
				}));
			}
			return key;
		};
		// заполняем массив списка (значения могут быть пустыми, нужно для работы реактивности vue)
		loadButtons(__type.value);

		/** Сохранить список кнопок */
		const saveButtons = (): void =>
		{
			if (keys.value)
			{
				store.commit(keys.value.set, list.value);
				store.dispatch(keys.value.write);
			}
		};

		/** Изменение значений конфигурации кнопок */
		const onButtonConfigUpdate = (item: IButtonConfigItem): void =>
		{
			if (keys.value) store.commit(keys.value.setItem, item);
		};

		/**
		 * Применить конфигурацию определенной кнопки
		 * @param {number | undefined} id ID кнопки
		 * @param {number} min Минимальное сопротивление кнопки
		 * @param {number} max Максимальное сопротивление кнопки
		 */
		const onButtonDefinitionApply = (id: number | undefined, min: number, max: number): void =>
		{
			if (id && keys.value) store.commit(keys.value?.setResistance, { id, min, max });
		};

		/**
		 * Применить создание кнопки
		 * @param {string} name Наименование/тип кнопки
		 * @param {TButtonExec} press Функция кнопки
		 * @param {number} min Минимальное значение сопротивления
		 * @param {number} max Максимальное значение сопротивления
		 */
		const onButtonAddApply = (name: string, press: TButtonExec, min: number, max: number): void =>
		{
			if (selectedItem.value)
			{
				selectedItem.value.title = name;
				if (!selectedItem.value.icon?.length) selectedItem.value.icon = "mdi-card-outline";
				if (selectedItem.value.config)
				{
					const exec = [...selectedItem.value.config.exec];
					exec[1] = press;
					selectedItem.value.config = {
						...selectedItem.value.config,
						exec,
						resistanceMin: min,
						resistanceMax: max
					};
				}
				saveButtons();
			}
		};

		/**
		 * Редактирование кнопки
		 * @param {IButtonCard} item Значения кнопки
		 */
		const onButtonEdit = (item: IButtonCard): void =>
		{
			selectedItem.value = item;
			addDialog.value = true;
		};

		/** Событие нажатия кнопки */
		const onButtonsValueReceive = (): void =>
		{
			if (keys.value)
			{
				const res = store.getters[keys.value.value];
				if (res.isData)
				{
					selectedItem.value = list.value?.find((x: IButtonCard) => x.id === res.id);
					if (selectedItem.value)
					{
						if (selectedItem.value.title?.length) definitionDialog.value = true;
						else addDialog.value = true;
					}
				}
			}
		};
		const onBegin = (type: any): void =>
		{
			// загружаем список, если он пуст
			const key = listWithoutEmpty.value.length ? __getKey(type) : loadButtons(type);
			if (key)
			{
				canbus.addListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
				store.commit(key.setProgramming, true);

				setTimeout(() => toast.warning(t("help.buttons.notify"), { autoClose: false }), 1000);
			}
		};
		const onEnd = (): void =>
		{
			canbus.removeListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
			store.commit("config/setSW1Programming", false);
		};
		watch(configLoaded, () => onBegin(__type.value));
		watch(__type, (val: any) =>
		{
			if (val.name === "Buttons")
			{
				onEnd();
				onBegin(val);
			}
		});
		onMounted(() =>
		{
			if (configLoaded.value) onBegin(__type.value);
		});
		onUnmounted(() =>
		{
			onEnd();
			toast.clearAll();
		});

		return {
			flicking,
			display,
			configLoaded,
			value,
			isMode,
			list,
			listWithoutEmpty,
			definitionDialog,
			addDialog,
			selectedItem,
			onButtonConfigUpdate,
			onButtonDefinitionApply,
			onButtonAddApply,
			onButtonEdit
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
