<!--suppress RequiredAttributes -->
<template>
	<CardSection title="Тестовые данные" @click-options="onClickOptions">
		<CardSectionTime title="Время работы" comment="Время туды-сюды" v-model="time" realtime />
		<CardSectionToggle title="ACC" comment="То что током ебашит" v-model="value" />
		<CardSectionInput title="Температура за бортом" comment="Дубак на улице" v-model="text" readonly />
		<CardSectionInput title="Ввод числа" comment="Число число" v-model="text" type="number" :min="0" />
		<CardSectionSelect
			title="Список"
			comment="Писка насяльника"
			v-model="select"
			:options="selectOptions"
			width="200px"
		/>
	</CardSection>
</template>

<script lang="ts">
import CardSection from '@/components/cardSections/CardSection.vue';
import CardSectionTime from '@/components/cardSections/CardSectionTime.vue';
import CardSectionToggle from '@/components/cardSections/CardSectionToggle.vue';
import CardSectionInput from '@/components/cardSections/CardSectionInput.vue';
import CardSectionSelect from '@/components/cardSections/CardSectionSelect.vue';

export default {
	name: 'InfoCard',
	components: { CardSection, CardSectionTime, CardSectionToggle, CardSectionInput, CardSectionSelect },
	data() {
		return {
			value: true,
			//text: '25°C',
			text: '',
			time: '10:00:22',
			num: Number(0),
			select: 'тест',
			selectOptions: ['тест', 'тест2']
		};
	},
	methods: {
		onClickOptions(e: any): void {
			console.log(e);
		}
	}
};
</script>

<style lang="sass"></style>
