<template>
	<flicking v-if="configLoaded" ref="flicking" class="list-sw1" :options="{ bound: true, align: 'prev' }">
		<div
			v-for="(cardButton, index) in cardButtons"
			:key="`button-item_${index}`"
			class="mr-4"
			:class="`flicking-${display}`"
		>
			<settings-card
				:class="`settings-card-${index}`"
				:title="cardButton.title"
				:icon="cardButton.icon"
				:extended="cardButton.extended"
				:id="cardButton.id"
				:exec="checkExecList(cardButton.exec, cardButton.extended)"
				:exec-mode="checkExecList(cardButton.execMode, cardButton.extended)"
				:list-of-functions="cardButton.extended ? listOfFunctionsExtended : listOfFunctions"
				:visible-extended="extendedVisible"
				@update:extended="onUpdateExtended(cardButton.id, $event)"
				@update:exec="onUpdateExec(cardButton.id, $event)"
				@update:exec-mode="onUpdateExecMode(cardButton.id, $event)"
				@click="onButtonEdit(cardButton)"
			/>
		</div>
	</flicking>
	<button-edit-dialog
		v-model="buttonEditVisible"
		:name="selected.title"
		:resistance="selected.resistanceTo"
		:list-of-resistance="listOfResistance"
		@click:apply="onButtonApply"
	/>
</template>

<script lang="ts">
import { computed, provide, ref } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Flicking from "@egjs/vue3-flicking";
import SettingsCard from "./components/SettingsCard.vue";
import ButtonEditDialog from "./components/ButtonEditDialog.vue";

import { ISW1ConfigButton, TButtonExec } from "@/models/pjcan/buttons";
import { ISW1Card } from "@/models/interfaces/ISW1Card";
import { TProtocol } from "@/models/pjcan/head-unit";
import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "Buttons",
	components: { Flicking, SettingsCard, ButtonEditDialog },
	setup()
	{
		const { name: display } = useDisplay();
		const { tm } = useI18n();
		const flicking = ref(null);
		provide("flicking", flicking);

		const buttonEditVisible = ref(false);
		const configLoaded = computed((): boolean => store.getters["config/sw1"].isData);
		const cardButtons = computed((): ISW1Card[] =>
			store.getters["app/sw1"]
				.map((cardButton: ISW1Card) => ({
					...cardButton,
					...(store.getters["config/sw1"].buttons.find(
						(button: ISW1ConfigButton) => button.id === cardButton.id
					) ?? ({} as ISW1ConfigButton))
				}))
				.filter((cardButton: ISW1Card) => cardButton.resistanceTo > 0)
		);
		const listOfResistance = computed((): number[] =>
			store.getters["config/sw1"].buttons.map((x: ISW1Card) => x.resistanceTo)
		);

		/**
		 * Список функций
		 * @param {number[]} excludeId Список ID функций, который нужно исключить
		 * @param {TProtocol} protocol Протокол UART
		 * @param {TCarModel} carModel Модель автомобиля
		 */
		const getListOfFunctions = (excludeId: number[], protocol: TProtocol, carModel: TCarModel): object[] =>
		{
			if (!(protocol === TProtocol.PROTOCOL_RAISE_HM_ND00 || protocol === TProtocol.PROTOCOL_RAISE_HM_ND03))
			{
				// список не доступных для данного протокола функций
				excludeId.push(
					...[
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_VOICE,
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_EQUALIZER,
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_RADIO,
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_RADIO_SEARCH,
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_CAMERA,
						TButtonExec.BUTTON_EXEC_HEAD_UNIT_PHONE
					]
				);
			}

			if (
				!(
					carModel === TCarModel.CAR_MODEL_MAZDA_CX7 ||
					carModel === TCarModel.CAR_MODEL_MAZDA_CX7_REST ||
					carModel === TCarModel.CAR_MODEL_MAZDA_CX9
				)
			)
			{
				// список функций Bose, который доступен только для моделей автомобилей CX
				excludeId.push(
					...[
						TButtonExec.BUTTON_EXEC_BOSE_ON,
						TButtonExec.BUTTON_EXEC_BOSE_AUDIO_PLT,
						TButtonExec.BUTTON_EXEC_BOSE_MUTE,
						TButtonExec.BUTTON_EXEC_BOSE_VOL_UP,
						TButtonExec.BUTTON_EXEC_BOSE_VOL_DOWN,
						TButtonExec.BUTTON_EXEC_BOSE_BALANCE_UP,
						TButtonExec.BUTTON_EXEC_BOSE_BALANCE_DOWN,
						TButtonExec.BUTTON_EXEC_BOSE_BASS_UP,
						TButtonExec.BUTTON_EXEC_BOSE_BASS_DOWN,
						TButtonExec.BUTTON_EXEC_BOSE_FADE_UP,
						TButtonExec.BUTTON_EXEC_BOSE_FADE_DOWN,
						TButtonExec.BUTTON_EXEC_BOSE_TREBLE_UP,
						TButtonExec.BUTTON_EXEC_BOSE_TREBLE_DOWN,
						TButtonExec.BUTTON_EXEC_BOSE_CENTER_POINT
					]
				);
			}

			const list: any = tm("buttons.functions");
			const result = [];
			for (const key in list)
			{
				const index = parseInt(key);
				if (excludeId.indexOf(index) < 0)
				{
					result.push({ label: list[key], value: index });
				}
			}
			return result;
		};
		const listOfFunctionsExtended = computed((): object[] =>
		{
			return getListOfFunctions([], store.getters["config/head"].protocol, store.getters["config/carModel"]);
		});
		const listOfFunctions = computed((): object[] =>
		{
			return getListOfFunctions(
				[TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_INFO, TButtonExec.BUTTON_EXEC_ON_BOARD_LONG_PRESS_CLOCK],
				store.getters["config/head"].protocol,
				store.getters["config/carModel"]
			);
		});
		const extendedVisible = computed(
			(): boolean =>
				cardButtons.value.findIndex((cardButton: ISW1Card) =>
					cardButton.extended
						? cardButton.exec.indexOf(TButtonExec.BUTTON_EXEC_CHANGE_CONTROL_MODE) >= 0
						: cardButton.exec[0] === TButtonExec.BUTTON_EXEC_CHANGE_CONTROL_MODE
				) >= 0
		);
		/**
		 * Проверяем наличие функции в списке
		 * @param {number[]} exec Список ID функций
		 * @param extended Расширенный режим
		 */
		const checkExecList = (exec: number[], extended: boolean): number[] =>
		{
			const funcs = extended ? listOfFunctionsExtended.value : listOfFunctions.value;
			return exec.map((x: number) => (funcs.findIndex((val: any) => val.value === x) >= 0 ? x : 0));
		};

		const selected = ref({} as ISW1Card);
		/**
		 * Открыть окно редактирования кнопки
		 * @param {ISW1Card} cardButton Значения кнопки
		 */
		const onButtonEdit = (cardButton: ISW1Card): void =>
		{
			selected.value = cardButton;
			store.commit("value/setSW1Resistance");
			buttonEditVisible.value = true;
		};
		/**
		 * Применить значения сопротивлений кнопок
		 * @param {number[]} list Список сопротивлений кнопок (см. listOfResistance)
		 */
		const onButtonApply = (list: number[]) =>
		{
			store.commit("config/setSW1ListOfResistance", list);
		};

		/**
		 * Обновление значения расширенного режима
		 * @param {number} id ID кнопки
		 * @param {boolean} value Значение
		 */
		const onUpdateExtended = (id: number, value: boolean): void =>
		{
			store.commit("config/setSW1Extended", { id, value });
		};
		/**
		 * Обновление функций кнопки
		 * @param {number} id ID кнопки
		 * @param {boolean} value Значение
		 */
		const onUpdateExec = (id: number, value: number[]): void =>
		{
			store.commit("config/setSW1Exec", { id, value });
		};
		/**
		 * Обновление функций кнопки в расширенном режиме
		 * @param {number} id ID кнопки
		 * @param {boolean} value Значение
		 */
		const onUpdateExecMode = (id: number, value: number[]): void =>
		{
			store.commit("config/setSW1ExecMode", { id, value });
		};

		return {
			flicking,
			display,
			configLoaded,
			cardButtons,
			listOfResistance,
			listOfFunctionsExtended,
			listOfFunctions,
			selected,
			buttonEditVisible,
			extendedVisible,
			checkExecList,
			onButtonEdit,
			onButtonApply,
			onUpdateExtended,
			onUpdateExec,
			onUpdateExecMode
		};
	}
};
</script>

<style lang="scss" scoped>
.list-sw1 {
	height: 100%;

	::v-deep(.settings-card-1 .mdi-play) {
		transform: rotate(-90deg);
	}

	::v-deep(.settings-card-2 .mdi-play) {
		transform: rotate(90deg);
	}
}
</style>
