<template>
	<flicking ref="flicking" class="listSW1" :options="{ bound: true, align: 'prev' }">
		<div v-for="(item, index) in list" :key="`button-item_${index}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				:icon="item.icon"
				:config="item.config"
				:mode="isMode"
				@update="onButtonConfigUpdate"
			/>
		</div>
	</flicking>

	<button-definition-dialog
		v-model="buttonDefinitionDialog"
		:list="list"
		:resistance="buttonDefinitionResistance"
		:id="buttonDefinitionId"
		@click:apply="onButtonDefinitionApply"
	/>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import router from "@/router";
import store from "@/store";
import canbus from "@/api/canbus";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonDefinitionDialog from "./components/ButtonDefinitionDialog.vue";

import { API_BUTTON_SW1_VALUE_EVENT, IButtonConfigItem, TButtonExec } from "@/models/pjcan/buttons";
import { IButtonCard } from "@/models/interfaces/IButtonCard";
import { IButtonKey } from "@/models/interfaces/IButtonKey";

export default {
	name: "Buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog },
	setup()
	{
		const { name: display } = useDisplay();
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
		const buttonsConfigLoaded = computed((): boolean => keys.value && store.getters[keys.value.config].isData);
		const buttonDefinitionDialog = ref(false);
		const buttonDefinitionResistance = computed((): number =>
			keys.value ? store.getters[keys.value.value].resistance : 0
		);
		const buttonDefinitionId = computed((): number => (keys.value ? store.getters[keys.value.value].id : 0));
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

		/** Загрузка списка кнопок */
		const loadButtons = (type: any): IButtonKey | undefined =>
		{
			const key = __getKey(type);
			if (key)
			{
				store.dispatch(key.read);
				list.value =
					store.getters[key.app]?.map((x: IButtonCard) =>
					{
						const config =
							store.getters[key.config]?.items?.find((item: IButtonConfigItem) => item.id === x.id) ??
							undefined;
						return { ...x, config };
					}) ?? ([] as IButtonCard[]);
			}
			return key;
		};
		loadButtons(__type.value);

		/** Сохранить список кнопок */
		const saveButtons = (type: any): IButtonKey | undefined =>
		{
			const key = __getKey(type);
			if (key)
			{
				store.commit(key.set, list.value);
				store.dispatch(key.write);
			}
			return key;
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

		const onButtonsValueReceive = (): void =>
		{
			buttonDefinitionDialog.value = true;
		};
		const onBegin = (type: any): void =>
		{
			const key = loadButtons(type);
			if (key)
			{
				canbus.addListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
				store.commit(key.setProgramming, true);
			}
		};
		const onEnd = (): void =>
		{
			canbus.removeListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
			store.commit("config/setSW1Programming", false);
		};
		watch(buttonsConfigLoaded, () => onBegin(__type.value));
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
			if (buttonsConfigLoaded.value) onBegin(__type.value);
		});
		onUnmounted(() =>
		{
			onEnd();
		});

		return {
			flicking,
			display,
			buttonsConfigLoaded,
			isMode,
			list,
			buttonDefinitionDialog,
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
