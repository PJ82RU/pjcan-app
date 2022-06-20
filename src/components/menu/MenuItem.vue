<template>
	<q-item clickable v-ripple class="MenuItem" v-for="item in items" @click="$emit('click', item)">
		<q-item-section avatar v-if="item.name">
			<div class="MenuItem-icon">
				<IconCustom :name="item.name" color="primary" color-secondary="secondary" :size="item.size" />
			</div>
		</q-item-section>

		<q-item-section> {{ item.lang }} </q-item-section>
	</q-item>
</template>

<script lang="ts">
import IconCustom from '@/components/common/IconCustom';
import { i18n } from '@/boot/i18n';
import menuState from '@/store/menuState';
import { IItemMenuState, IMenuState } from '@/models/menu';

export default {
	name: 'MenuItem',
	components: { IconCustom },
	props: {
		name: {
			types: String,
			require: true
		}
	},
	emits: ['click'],
	setup(props: any) {
		const name: keyof IMenuState = props.name as keyof IMenuState;
		const items = menuState[name]?.map((x: IItemMenuState) => ({ ...x, lang: i18n.global.t(x.lang) }));
		return { items };
	}
};
</script>

<style lang="sass">
.MenuItem
	&-icon
		width: 24px
		text-align: center
</style>
