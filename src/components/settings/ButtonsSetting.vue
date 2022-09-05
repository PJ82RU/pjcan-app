<template>
	<card-section
		class="buttons-setting"
		type="ButtonsSetting"
		:title="title"
		icon-name="steering"
		:menu-card-section="menuCard"
		@click:options="onClickOptions"
		show-options
		show-bookmark
		show-apply
		show-cancel
	>
		<q-card-section class="buttons-setting__content">
			<card-section-input
				:title="$t('BtnsSetting_Resistance')"
				:comment="$t('BtnsSetting_Resistance_Comment')"
				v-model="btnResistance"
				readonly
			/>
			<card-section-select
				:title="$t('BtnsSetting_PressSingle')"
				:comment="$t('BtnsSetting_PressSingle_Comment')"
				v-model="btnPressSingle"
				:options="funcItems"
			/>
			<card-section-select
				:title="$t('BtnsSetting_PressDual')"
				:comment="$t('BtnsSetting_PressDual_Comment')"
				v-model="btnPressDual"
				:options="funcItems"
			/>
			<card-section-select
				:title="$t('BtnsSetting_PressTriple')"
				:comment="$t('BtnsSetting_PressTriple_Comment')"
				v-model="btnPressTriple"
				:options="funcItems"
			/>
			<card-section-select
				:title="$t('BtnsSetting_PressHold')"
				:comment="$t('BtnsSetting_PressHold_Comment')"
				v-model="btnPressHold"
				:options="funcItems"
			/>
			<card-section-select
				:title="$t('BtnsSetting_Release')"
				:comment="$t('BtnsSetting_Release_Comment')"
				v-model="btnRelease"
				:options="funcItems"
			/>
		</q-card-section>
	</card-section>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { lang } from '@/i18n/i18nUtils';

import api, { API_EVENT_BUTTONS_CONFIG } from '@/store/api';
import { menuButtonsSettingCard } from '@/store/menu/MenuButtonsSetingCard';

import { CardSection, CardSectionInput, CardSectionSelect } from '@/components/cardSections';

import { ButtonsConfig, IButtonsConfig, TButtonExec, TButtonItem, TButtonPress } from '@/models/pjcan';
import { TItemMenu } from '@/models/menu';

export default {
	name: 'ButtonsSetting',
	components: { CardSection, CardSectionInput, CardSectionSelect },
	setup() {
		// конфигурация кнопок
		const btnsConfig = ref(new ButtonsConfig());
		// входящие значения конфигурации кнопок
		const onReceiveValue = (res: IButtonsConfig): void => {
			btnsConfig.value.setModel(res);
			console.log(res);
		};

		// регистрируем события
		onMounted(() => {
			api.addListener(API_EVENT_BUTTONS_CONFIG, onReceiveValue);
		});
		// удаляем события
		onUnmounted(() => {
			api.removeListener(API_EVENT_BUTTONS_CONFIG, onReceiveValue);
		});

		/** Тип текущей кнопки */
		const btnType = ref(TButtonItem.BUTTON_MODE);
		const btnResistance = computed((): number => btnsConfig?.value?.items[btnType.value]?.inR ?? 0);
		/** Массив методов текущей кнопки */
		const btnExec = computed(
			(): TButtonExec[] | undefined =>
				(btnsConfig?.value?.items[btnType.value]?.exec as TButtonExec[]) ?? undefined
		);
		/** Метод текущей кнопки - кнопка нажата 1 раз */
		const btnPressSingle = computed({
			get: (): TButtonExec => btnExec.value?.[TButtonPress.PRESS_SINGLE] ?? TButtonExec.TEYES_NONE,
			set: (val: any) => {
				if (btnExec.value) btnExec.value[TButtonPress.PRESS_SINGLE] = val.value;
			}
		});
		/** Метод текущей кнопки - кнопка нажата 2 раза */
		const btnPressDual = computed({
			get: (): TButtonExec => btnExec.value?.[TButtonPress.PRESS_DUAL] ?? TButtonExec.TEYES_NONE,
			set: (val: any) => {
				if (btnExec.value) btnExec.value[TButtonPress.PRESS_DUAL] = val.value;
			}
		});
		/** Метод текущей кнопки - кнопка нажата 3 раза */
		const btnPressTriple = computed({
			get: (): TButtonExec => btnExec.value?.[TButtonPress.PRESS_TRIPLE] ?? TButtonExec.TEYES_NONE,
			set: (val: any) => {
				if (btnExec.value) btnExec.value[TButtonPress.PRESS_TRIPLE] = val.value;
			}
		});
		/** Метод текущей кнопки - удержание кнопки */
		const btnPressHold = computed({
			get: (): TButtonExec => btnExec.value?.[TButtonPress.PRESS_HOLD] ?? TButtonExec.TEYES_NONE,
			set: (val: any) => {
				if (btnExec.value) btnExec.value[TButtonPress.PRESS_HOLD] = val.value;
			}
		});
		/** Метод текущей кнопки - кнопка отпущена */
		const btnRelease = computed({
			get: (): TButtonExec => btnExec.value?.[TButtonPress.RELEASE] ?? TButtonExec.TEYES_NONE,
			set: (val: any) => {
				if (btnExec.value) btnExec.value[TButtonPress.RELEASE] = val.value;
			}
		});

		const selectItemMenu = ref(TItemMenu.SETTING_BUTTON_MODE);
		const selectNameItemMenu = computed(() => {
			// noinspection JSUnreachableSwitchBranches
			switch (selectItemMenu.value) {
				case TItemMenu.SETTING_BUTTON_MODE:
					return lang('BtnsSetting_MenuMode');
				case TItemMenu.SETTING_BUTTON_SEEK_UP:
					return lang('BtnsSetting_MenuSeekUp');
				case TItemMenu.SETTING_BUTTON_SEEK_DOWN:
					return lang('BtnsSetting_MenuSeekDown');
				case TItemMenu.SETTING_BUTTON_VOL_UP:
					return lang('BtnsSetting_MenuVolUp');
				case TItemMenu.SETTING_BUTTON_VOL_DOWN:
					return lang('BtnsSetting_MenuVolDown');
				case TItemMenu.SETTING_BUTTON_VOL_MUTE:
					return lang('BtnsSetting_MenuVolMute');
				default:
					return '';
			}
		});
		const title = computed(() => `${lang('BtnsSetting_Title')}: ${selectNameItemMenu.value}`);

		const menuCard = ref(menuButtonsSettingCard);
		const funcItems = computed((): any[] => [
			{ label: lang('BtnsSetting_Func_Teyes_None'), value: TButtonExec.TEYES_NONE },
			{ label: lang('BtnsSetting_Func_Teyes_Mode'), value: TButtonExec.TEYES_MODE },
			{ label: lang('BtnsSetting_Func_Teyes_SeekUp'), value: TButtonExec.TEYES_SEEK_UP },
			{ label: lang('BtnsSetting_Func_Teyes_SeekDown'), value: TButtonExec.TEYES_SEEK_DOWN },
			{ label: lang('BtnsSetting_Func_Teyes_VolUp'), value: TButtonExec.TEYES_VOL_UP },
			{ label: lang('BtnsSetting_Func_Teyes_VolDown'), value: TButtonExec.TEYES_VOL_DOWN },
			{ label: lang('BtnsSetting_Func_Teyes_VolMute'), value: TButtonExec.TEYES_VOL_MUTE },
			{ label: lang('BtnsSetting_Func_LCD_ClockPress'), value: TButtonExec.LCD_CLOCK_PRESS },
			{ label: lang('BtnsSetting_Func_LCD_ClockRelease'), value: TButtonExec.LCD_CLOCK_RELEASE },
			{ label: lang('BtnsSetting_Func_LCD_ClockHPress'), value: TButtonExec.LCD_CLOCK_H_PRESS },
			{ label: lang('BtnsSetting_Func_LCD_ClockHRelease'), value: TButtonExec.LCD_CLOCK_H_RELEASE },
			{ label: lang('BtnsSetting_Func_LCD_ClockMPress'), value: TButtonExec.LCD_CLOCK_M_PRESS },
			{ label: lang('BtnsSetting_Func_LCD_ClockMRelease'), value: TButtonExec.LCD_CLOCK_M_RELEASE },
			{ label: lang('BtnsSetting_Func_LCD_InfoPress'), value: TButtonExec.LCD_INFO_PRESS },
			{ label: lang('BtnsSetting_Func_LCD_InfoRelease'), value: TButtonExec.LCD_INFO_RELEASE },
			{ label: lang('BtnsSetting_Func_Engine'), value: TButtonExec.VARIABLE_ENGINE },
			{ label: lang('BtnsSetting_Func_Fuel'), value: TButtonExec.VARIABLE_FUEL },
			{ label: lang('BtnsSetting_Func_Movement'), value: TButtonExec.VARIABLE_MOVEMENT },
			{ label: lang('BtnsSetting_Func_Temperature'), value: TButtonExec.VARIABLE_TEMPERATURE }
		]);

		/** Настройка функционала/сопротивления кнопок */
		const onClickOptions = (e: any): void => {
			//console.log('ButtonsSetting -> onClickOptions', e);

			switch (e.type) {
				case TItemMenu.SETTING_BUTTON_MODE:
					btnType.value = TButtonItem.BUTTON_MODE;
					break;

				case TItemMenu.SETTING_BUTTON_SEEK_UP:
					btnType.value = TButtonItem.BUTTON_SEEK_UP;
					break;

				case TItemMenu.SETTING_BUTTON_SEEK_DOWN:
					btnType.value = TButtonItem.BUTTON_SEEK_DOWN;
					break;

				case TItemMenu.SETTING_BUTTON_VOL_UP:
					btnType.value = TButtonItem.BUTTON_VOL_UP;
					break;

				case TItemMenu.SETTING_BUTTON_VOL_DOWN:
					btnType.value = TButtonItem.BUTTON_VOL_DOWN;
					break;

				case TItemMenu.SETTING_BUTTON_VOL_MUTE:
					btnType.value = TButtonItem.BUTTON_VOL_MUTE;
					break;

				default:
					return;
			}
			selectItemMenu.value = e.type;
		};

		return {
			title,
			menuCard,
			btnResistance,
			btnPressSingle,
			btnPressDual,
			btnPressTriple,
			btnPressHold,
			btnRelease,
			funcItems,
			onClickOptions
		};
	}
};
</script>

<style lang="sass">
.buttons-setting
	.card-section__container
		width: calc(100% - 58px)

	.card-section-select__input .q-field__inner
		width: fit-content
</style>
