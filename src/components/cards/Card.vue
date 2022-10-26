<template>
	<v-card class="card">
		<v-card-text class="card__text">
			<slot name="body" />
		</v-card-text>
		<v-card-actions class="justify-space-between">
			<div class="pl-4 pr-4 text-h5 text-uppercase">
				{{ title }}
			</div>
			<v-btn-group class="border-dialog-btns">
				<v-btn icon="mdi-heart" color="primary" @click="$emit('click:like')" />
				<menu-dots :menu="menu" color="primary" @click:item="onMenuClick" />
			</v-btn-group>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { computed } from "vue";
import i18n from "@/lang";

import MenuDots from "@/components/MenuDots.vue";

export default {
	name: "Card",
	components: { MenuDots },
	props: {
		title: String
	},
	emits: ["click:like", "click:menu"],
	setup()
	{
		const menu = computed((): string[] => [
			i18n.global.t("onboard.info.acc.menu"),
			i18n.global.t("onboard.info.timeWork.menu"),
			i18n.global.t("onboard.info.temperature.menu"),
			i18n.global.t("onboard.info.handbrake.menu"),
			i18n.global.t("onboard.info.reverse.menu"),
			i18n.global.t("onboard.info.safetyBelt.menu"),
			i18n.global.t("onboard.info.signal.menu")
		]);

		/** Событие выбора пункта меню */
		const onMenuClick = (data: any) => {};

		return {
			menu,
			onMenuClick
		};
	}
};
</script>

<style lang="scss" scoped>
.card
{
	width: 100%;
	height: 100%;
	background: rgba(120, 144, 156, 0.1);
	box-shadow: 0 4px 16px rgba(27, 44, 61, 0.18);
	border-radius: 6px;

	&__text {
		overflow-y: auto;
	}

	::v-deep(.v-card-text) {
		height: calc(100% - 48px);
		padding: 16px !important;
	}
	::v-deep(.v-btn .v-icon) {
		color: white;
	}
}
</style>
