<template>
	<v-menu content-class="menu-dots" location="center end" transition="slide-x-reverse-transition">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" icon="mdi-dots-vertical" :color="color" />
		</template>

		<v-list class="pa-0">
			<template v-for="(item, index) in menu">
				<v-list-item
					v-if="item.title?.length > 0"
					:key="`menu-item_${index}`"
					@click="$emit('click:item', item)"
				>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
				<v-divider v-else :key="`menu-divider_${index}`" />
			</template>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { ref } from "vue";

export interface IMenuItem {
	id: number;
	title: string;
}

export default {
	name: "MenuDots",
	emits: ["click:item"],
	props: {
		menu: {
			type: Array as () => IMenuItem[],
			required: true
		},
		color: String
	},
	setup()
	{
		const visibleAbout = ref(false);
		return {
			visibleAbout
		};
	}
};
</script>
