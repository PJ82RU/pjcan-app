<template>
	<flicking ref="flicking" class="listSW1" :options="{ bound: true, align: 'prev' }">
		<div v-for="(item, index) in list" :key="`button-item_${index}`" class="mr-4" :class="`flicking-${display}`">
			<settings-card
				:class="`settings-card-${index}`"
				:title="item.title"
				:icon="item.icon"
				:config="item.config"
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

import { API_BUTTON_SW1_VALUE_EVENT, IButtonConfigItem } from "@/models/pjcan/buttons";
import { IButtonCard } from "@/models/interfaces/IButtonCard";

export default {
	name: "Buttons",
	components: { Flicking, SettingsCard, ButtonDefinitionDialog },
	setup()
	{
		const { name: display } = useDisplay();
		const flicking = ref(null);
		provide("flicking", flicking);

		const __type = computed(() => router.currentRoute.value.query?.type);
		const buttonsConfigLoaded = computed((): boolean => store.getters["config/sw1"].isData);
		const buttonDefinitionDialog = ref(false);
		const buttonDefinitionResistance = computed((): number => store.getters["value/sw1"].resistance);
		const buttonDefinitionId = computed((): number => store.getters["value/sw1"].id);
		const list = ref([] as IButtonCard[]);

		/** Загрузка списка кнопок */
		const loadButtons = (type: any): void =>
		{
			let res: any, items: IButtonConfigItem[];
			switch (type)
			{
				case "sw1":
					store.dispatch("app/readSW1");
					res = store.getters["app/sw1"];
					items = store.getters["config/sw1"]?.items;
					break;
				default:
					return;
			}

			list.value =
				res?.map((x: IButtonCard) =>
				{
					const config = items?.find((item: IButtonConfigItem) => item.id === x.id) ?? undefined;
					return { ...x, config };
				}) ?? ([] as IButtonCard[]);
		};
		loadButtons(__type.value);

		/** Сохранить список кнопок */
		const saveButtons = (type: any): void =>
		{
			switch (type)
			{
				case "sw1":
					store.commit("app/setSW1", list.value);
					store.dispatch("app/writeSW1");
					break;
			}
		};

		/** Изменение значений конфигурации кнопок */
		const onButtonConfigUpdate = (item: IButtonConfigItem): void =>
		{
			switch (__type.value)
			{
				case "sw1":
					store.commit("config/setSW1Item", item);
					break;
			}
		};

		/**
		 * Применить конфигурацию определенной кнопки
		 * @param {number | undefined} id ID кнопки
		 * @param {number} min Минимальное сопротивление кнопки
		 * @param {number} max Максимальное сопротивление кнопки
		 */
		const onButtonDefinitionApply = (id: number | undefined, min: number, max: number): void =>
		{
			if (id)
			{
				switch (__type.value)
				{
					case "sw1":
						store.commit("config/setSW1Resistance", { id, min, max });
						break;
				}
			}
		};

		const onButtonsValueReceive = (): void =>
		{
			buttonDefinitionDialog.value = true;
		};
		const onBegin = (type: any): void =>
		{
			loadButtons(type);
			switch (type)
			{
				case "sw1":
					canbus.addListener(API_BUTTON_SW1_VALUE_EVENT, onButtonsValueReceive);
					store.commit("config/setSW1Programming", true);
					break;
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
