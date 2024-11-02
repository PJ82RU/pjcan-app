<template>
	<card
		class="onboard-card"
		:title="$t('options.onboard.' + ($vuetify.display.xs ? 'titleShort' : 'title'))"
		:menu="menu"
		@click:menu="onMenuClick"
	>
		<template #body>
			<v-row>
				<v-col cols="12">
					<draggable
						v-model="cardList"
						group="onboard"
						item-key="name"
						:move="() => isLoading"
						@start="flicking.disableInput()"
						@end="
							flicking.enableInput();
							onCardListChange();
						"
					>
						<template #item="{ element }">
							<v-card
								v-if="element.visible"
								class="mt-1 mb-1 onboard-card__item"
								:class="{ 'onboard-card__item--disabled': element.disabled }"
							>
								<v-card-text class="d-flex align-center justify-space-between">
									<div class="d-flex align-center">
										<icon-custom class="mr-2" name="mdi-menu" size="24" color="secondary" />
										<span> {{ $t("onboard." + element.name + ".title") }} </span>
									</div>
									<div>
										<v-switch
											v-model="element.enabled"
											density="compact"
											color="success"
											hide-details
											:disabled="!isLoading || element.disabled"
											@change="onCardListChange"
										/>
									</div>
								</v-card-text>
							</v-card>
						</template>
					</draggable>
				</v-col>
				<v-col cols="12" class="pt-0 onboard-card__description">
					<span> {{ $t("options.onboard.description") }} </span>
				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, inject, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import store from "@/store";
import draggable from "vuedraggable";

import Card from "@/components/cards/Card.vue";
import IconCustom from "@/components/common/icon-custom/IconCustom.vue";

import { IMenuItem } from "@/components/MenuDots.vue";
import { IOnboardCard } from "@/models/interfaces/IOnboardCard";
import { TCarModel } from "@/models/pjcan/onboard";

export default {
	name: "OnboardCard",
	components: { IconCustom, Card, draggable },
	setup()
	{
		const { t } = useI18n();
		const flicking = inject("flicking") as any;

		store.dispatch("app/readOnboardCards");
		const carModel = computed((): TCarModel => store.getters["config/carModel"]);
		const isLoading = computed((): boolean => carModel.value !== TCarModel.CAR_MODEL_UNKNOWN);
		const cardList = ref([] as any);
		const setCardList = (model: TCarModel): void =>
		{
			cardList.value = [...store.getters["app/onboardCards"]].map((x: IOnboardCard) => ({
				...x,
				disabled: false,
				visible: x.car.indexOf(model) >= 0
			}));
		};
		setCardList(carModel.value);

		watch(carModel, (val: TCarModel) => setCardList(val));
		watch(isLoading, (val: boolean) =>
		{
			if (val)
			{
				cardList.value.forEach((x: IOnboardCard) =>
				{
					x.disabled = false;
					x.visible = x.car.indexOf(carModel.value) >= 0;
				});
			}
		});

		/** Изменение списка */
		const onCardListChange = (): void =>
		{
			store.commit("app/setOnboardCards", cardList.value);
			store.dispatch("app/writeOnboardCards");
		};

		const menu = computed((): IMenuItem[] => [{ id: 0, title: t("options.onboard.reset.menu") }]);

		/**
		 * Выбор пункта меню отображения на информационном экране
		 * @param {IMenuItem} item Элемент меню
		 */
		const onMenuClick = (item: IMenuItem): void =>
		{
			store.dispatch("app/resetOnboardCards");
			setCardList(carModel.value);
		};

		return {
			isLoading,
			flicking,
			cardList,
			menu,
			onCardListChange,
			onMenuClick
		};
	}
};
</script>

<style lang="scss" scoped>
.onboard-card {
	&__item {
		box-shadow: none;
		background: $primary;
		border-radius: 6px;

		&--disabled {
			background: $disable !important;
		}
	}
	&__description {
		font-weight: 300;
		font-size: 0.875rem;
		line-height: 1rem !important;
		opacity: var(--v-disabled-opacity);
	}
}
</style>
