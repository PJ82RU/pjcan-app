<template>
	<q-item clickable v-ripple class="item-menu" v-for="item in langItems" @click="$emit('click', item)">
		<q-item-section avatar v-if="item.name">
			<div class="item-menu__icon">
				<icon-custom :name="item.name" :size="item.size" />
			</div>
		</q-item-section>

		<q-item-section> {{ item.lang }} </q-item-section>
	</q-item>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import { lang } from '@/i18n/i18nUtils';
import IconCustom from '@/components/common/iconCustom';

import { IItemMenu } from '@/models/menu';

export default {
	name: 'ItemMenu',
	components: { IconCustom },
	props: {
		items: {
			type: Array as () => IItemMenu[],
			require: true
		}
	},
	emits: ['click'],
	setup(props: any) {
		const { items } = toRefs(props);
		const langItems = computed(() => items.value?.map((x: IItemMenu) => ({ ...x, lang: lang(x.lang) })));

		return {
			langItems
		};
	}
};
</script>

<style lang="sass">
.item-menu
	&__icon
		width: 24px
		text-align: center
</style>
