<template>
	<card class="lcd-card" :title="$t('options.lcd.title')" :menu="menu" @click:menu="onMenuClick">
		<template #body>
			<v-row>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						v-model="enabled"
						:title="$t('options.lcd.enabled.title')"
						:description="$t('options.lcd.enabled.description')"
						color="success"
						:nodata="!onboardConfigLoaded"
						:disabled="!onboardConfigLoaded"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="logo"
						:label="$t('options.lcd.logo.title')"
						:hint="$t('options.lcd.logo.description')"
						variant="underlined"
						:disabled="!onboardConfigLoaded"
						persistent-hint
						dense
						@blur="setOnboardLogo"
					/>
				</v-col>
				<v-col cols="12" class="pb-0">
					<v-text-field
						v-model="hello"
						:label="$t('options.lcd.hello.title')"
						:hint="$t('options.lcd.hello.description')"
						variant="underlined"
						:disabled="!onboardConfigLoaded"
						persistent-hint
						dense
						@blur="setOnboardHello"
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
		delay-disabled
		@click:apply="onViewApply"
	/>
</template>

<script lang="ts">
import { computed, nextTick, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";

import Card from "@/components/cards/Card.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import ViewSettingDialog from "@/components/ViewSettingDialog.vue";

import { IMenuItem } from "@/components/MenuDots.vue";

export default {
	name: "LcdCard",
	components: { Card, SwitchCardItem, ViewSettingDialog },
	setup()
	{
		const { t } = useI18n();

		const onboardConfigLoaded = computed((): boolean => store.getters["config/onboard"].isData);
		const onboardViewLoaded = computed((): boolean => store.getters["view/onboard"].isData);

		const enabled = computed({
			get: (): boolean => store.getters["config/onboard"].lcd,
			set: (val: boolean) => store.commit("config/setOnboardLcd", val)
		});

		/**
         * Проверка ввода
         * @param {Ref<string>} input Объект ввода
         * @param {number} max Максимальное количество символов
         */
		const onInput = (input: Ref<string>, max: number): void =>
		{
			const { value } = input;
			const length = value.length;
			if (length > max) input.value = value.substring(0, max);
			else if (!/^[^а-яА-я]*$/.test(value)) input.value = value.substring(0, length - 1);
		};

		// Логотип
		const __logo = computed(() => store.getters["config/onboard"].logo.trim());
		const logo = ref(__logo.value);
		watch(__logo, (val: string) => (logo.value = val));
		watch(logo, (): void =>
		{
			nextTick(() => onInput(logo, 12));
		});
		const setOnboardLogo = (): void =>
		{
			const val = logo.value.trim();
			if (logo.value.length < 12)
			{
				const countSpace = Math.floor((12 - val.length) / 2);
				if (countSpace > 0)
				{
					let spaces = "";
					for (let i = 0; i < countSpace; i++) spaces += " ";
					logo.value = spaces + val;
				}
			}
			store.commit("config/setOnboardLogo", logo.value);
		};

		// Текст приветствия
		const __hello = computed(() => store.getters["config/onboard"].hello);
		const hello = ref(__hello.value);
		watch(__hello, (val: string) => (hello.value = val));
		watch(hello, (): void =>
		{
			nextTick(() => onInput(hello, 32));
		});
		const setOnboardHello = (): void => store.commit("config/setOnboardHello", hello.value);

		const menu = computed((): IMenuItem[] => [
			{ title: t("options.lcd.hello.menu"), view: store.getters["view/onboard"], disabled: !onboardViewLoaded.value }
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
			onboardConfigLoaded,
			onboardViewLoaded,
			enabled,
			logo,
			setOnboardLogo,
			hello,
			setOnboardHello,
			menu,
			menuVisible,
			menuSelected,
			onInput,
			onMenuClick,
			onViewApply
		};
	}
};
</script>
