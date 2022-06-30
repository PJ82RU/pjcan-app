<!--suppress RequiredAttributes -->
<template>
	<CardSection title="Тестовые данные">
		<TimeCardSection title="Время работы" comment="Время туды-сюды" v-model="time" realtime />
		<ToggleCardSection title="ACC" comment="То что током ебашит" v-model="value" />
		<InputCardSection title="Температура за бортом" comment="Дубак на улице" v-model="text" readonly />
		<InputCardSection title="Ввод числа" comment="Число число" v-model="text" type="number" :min="0" />
		<SelectCardSection
			title="Список"
			comment="Писка насяльника"
			v-model="select"
			:options="selectOptions"
			width="200px"
		/>
	</CardSection>
</template>

<script lang="ts">
import CardSection from '@/components/common/CardSections/CardSection.vue';
import TimeCardSection from '@/components/common/CardSections/TimeCardSection.vue';
import ToggleCardSection from '@/components/common/CardSections/ToggleCardSection.vue';
import InputCardSection from '@/components/common/CardSections/InputCardSection.vue';
import SelectCardSection from '@/components/common/CardSections/SelectCardSection.vue';

export default {
	name: 'InfoCard',
	components: { CardSection, TimeCardSection, ToggleCardSection, InputCardSection, SelectCardSection },
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
	}
};
</script>

<style lang="sass"></style>
