<template>
	<div class="MazdaOnboardData">
		<q-card flat bordered class="MazdaOnboardData-card">
			<q-item class="bg-primary">
				<q-item-section avatar>
					<img src="/img/ico-info.svg" alt="" />
				</q-item-section>

				<q-item-section>
					<q-item-label>Расход</q-item-label>
					<q-item-label caption> расход топлива </q-item-label>
				</q-item-section>
			</q-item>

			<q-card-section class="q-pa-sm">
				<div class="MazdaOnboardData-item">
					<span class="title">Текущий:</span>
					<span class="value">13 л/ч</span>
				</div>

				<div class="MazdaOnboardData-item">
					<span class="title">Средний:</span>
					<span class="value">9 л/ч</span>
				</div>
			</q-card-section>
		</q-card>

		<div class="delimer" />

		<q-card flat bordered class="MazdaOnboardData-card">
			<q-item class="bg-primary">
				<q-item-section avatar>
					<img src="/img/ico-engine.svg" alt="" />
				</q-item-section>

				<q-item-section>
					<q-item-label>ДВС</q-item-label>
					<q-item-label caption> работа двигателя </q-item-label>
				</q-item-section>
			</q-item>

			<q-card-section class="q-pa-sm">
				<div class="MazdaOnboardData-item">
					<span class="title">Статус:</span>
					<span class="value">работает</span>
				</div>

				<div class="MazdaOnboardData-item">
					<span class="title">Время работы:</span>
					<span class="value">00:15:45</span>
				</div>

				<div class="MazdaOnboardData-item">
					<span class="title">Общее время работы:</span>
					<span class="value">3.10:15:45</span>
				</div>

				<div class="MazdaOnboardData-item">
					<span class="title">Общий RPM:</span>
					<span class="value">40333 тыс.</span>
				</div>
			</q-card-section>
		</q-card>

		<div class="delimer" />

		<q-card flat bordered class="MazdaOnboardData-card">
			<q-item class="bg-primary">
				<q-item-section avatar>
					<img src="/img/ico-other.svg" alt="" />
				</q-item-section>

				<q-item-section>
					<q-item-label>Разное</q-item-label>
					<q-item-label caption> разное безобразное </q-item-label>
				</q-item-section>
			</q-item>

			<q-card-section class="q-pa-sm">
				<div class="MazdaOnboardData-item">
					<span class="title">Температура за бортом:</span>
					<span class="value">-20°С</span>
				</div>

				<div class="MazdaOnboardData-item">
					<span class="title">Температура жопы:</span>
					<span class="value">100°С</span>
				</div>
			</q-card-section>
		</q-card>
	</div>
</template>

<script lang="ts">
export default {
	name: 'MazdaOnboardData'
};
</script>

<style lang="sass">
.MazdaOnboardData
    display: flex
    width: 100%

    .delimer
        width: 12px
        height: 12px

    &-card
        width: 100%
        font-size: 22px

    &-item
        display: flex
        justify-content: space-between

        .title
            color: #ccc
</style>
