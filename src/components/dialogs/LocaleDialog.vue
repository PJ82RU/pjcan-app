<template>
    <dialog-template
        content-class="locale"
        v-model="visible"
        :title="$t('language.title')"
        icon="service"
        width="480px"
        text
        actions
    >
        <template #body>
            <v-row class="pb-2">
                <v-col cols="12">
                    <v-select
                        v-model="language"
                        :label="$t('language.label')"
                        :items="locales"
                        :hint="$t('language.description')"
                        variant="underlined"
                        item-title="label"
                        item-value="value"
                        persistent-hint
                    />
                </v-col>
            </v-row>
        </template>

        <template #btns>
            <v-btn color="primary" @click="onApplyClick">
                {{ $t("btn.apply") }}
            </v-btn>
            <v-btn color="primary" prepend-icon="mdi-close" @click="visible = false">
                {{ $t("btn.close") }}
            </v-btn>
        </template>
    </dialog-template>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import moment from "moment";

import DialogTemplate from "@/layout/components/DialogTemplate.vue";

export default {
	name: "LocaleDialog",
	components: { DialogTemplate },
	props: {
		modelValue: {
			type: Boolean,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup(props: any, { emit }: { emit: any })
	{
		const { locale } = useI18n();
		const { modelValue } = toRefs(props);

		const visible = computed({
			get: (): boolean => modelValue.value,
			set: (val: boolean): void => emit("update:modelValue", val)
		});
		const locales = computed(() => ([
			{ label: "Русский", value: "ru" },
			{ label: "English", value: "en" }
		]));
		const language = computed({
			get: (): string => store.getters["app/language"],
			set: (val: string): void => store.commit("app/setLanguage", val)
		});

		/** Применить язык интерфейса */
		const onApplyClick = (): void =>
		{
			locale.value = language.value;
			moment.locale(language.value);
			store.dispatch("app/writeLanguage");
			visible.value = false;
		};

		return {
			visible,
			locales,
			language,
			onApplyClick
		};
	}
};
</script>
