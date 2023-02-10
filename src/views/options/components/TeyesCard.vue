<template>
	<card class="teyes-card" :title="$t('options.teyes.title')">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">

				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import Card from "@/components/cards/Card.vue";

export default {
	name: "TeyesCard",
	components: { Card }
};
</script>
