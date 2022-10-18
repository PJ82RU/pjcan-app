<template>
	<v-menu location="center end" transition="slide-x-reverse-transition">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</template>

		<v-list>
			<template v-for="(item, index) in menu">
				<v-list-item v-if="item" :key="`menu-item_${index}`" @click="item.on">
					<v-list-item-title>{{ item.label }}</v-list-item-title>
				</v-list-item>
				<v-divider v-else :key="`menu-divider_${index}`" />
			</template>
		</v-list>
	</v-menu>

	<about-modal v-model="visibleAbout" />
</template>

<script lang="ts">
import { computed, ref } from "vue";
import i18n from "@/lang";

import AboutModal from "./AboutModal.vue";
import { IMenuItem } from "@/models/IMenuItem";

export default {
	name: "MenuDots",
	components: { AboutModal },
	setup()
	{
		const visibleAbout = ref(false);

		const menu = computed((): IMenuItem[] => [
			{
				label: i18n.global.t("menu.language." + (i18n.global.locale === "ru" ? "english" : "russian")),
				on: (): void => null
			},
			null,
			{
				label: i18n.global.t("menu.about"),
				on: (): void => (visibleAbout.value = true)
			}
		]);

		return {
			menu,
			visibleAbout
		};
	}
};
</script>
