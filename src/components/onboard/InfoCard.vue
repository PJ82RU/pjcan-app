<!--suppress RequiredAttributes -->
<template>
	<q-card class="InfoCard">
		<q-card-section horizontal>
			<q-card-section :horizontal="false" class="InfoCard-container">
				<q-card-section class="InfoCard-title">
					<div class="text-h6">Общие показания</div>
					<q-separator />
				</q-card-section>

				<q-card-section class="InfoCard-info">
					<q-card-section horizontal>
						<div class="InfoCard-info-variable">Время работы</div>
						<q-input
							class="InfoCard-info-time"
							outlined
							dense
							readonly
							v-model="time"
							type="time"
							step="2"
						/>
						<q-icon class="InfoCard-info-time-icon" color="primary" name="schedule" size="22px" />
					</q-card-section>
					<q-card-section horizontal>
						<div class="InfoCard-info-variable">ACC</div>
						<q-toggle class="InfoCard-info-value" dense disable v-model="value" color="red" />
					</q-card-section>
					<q-card-section horizontal>
						<div class="InfoCard-info-variable">Температура за бортом</div>
						<q-input class="InfoCard-info-value" outlined dense readonly v-model="text" />
					</q-card-section>
				</q-card-section>
			</q-card-section>

			<q-card-actions vertical class="InfoCard-menu">
				<q-btn flat round color="secondary" icon="more_vert" />
				<q-btn flat round color="primary" icon="bookmark" />
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
export default {
	name: 'InfoCard',
	data() {
		return {
			value: true,
			text: '25°C',
			time: 0
		};
	}
};
</script>

<style lang="sass">
.InfoCard
	width: 100%
	max-width: 400px

	.q-card__actions
		justify-content: flex-start

	&-container
		background-color: #f5f5f5

	&-title
		padding-top: 10px
		padding-bottom: 0

		.text-h6
			padding-bottom: 6px

	&-container
		width: 100%
		padding: 0

	&-info
		padding-bottom: 0

		.q-card__section
			align-items: center
			margin-bottom: 16px

		&-variable
			width: 100%

		&-value
			.q-field__inner
				width: 80px
			input
				text-align: right

		&-time
			.q-field__inner
				width: 120px
			input
				text-align: right

			&-icon
				position: absolute
				right: 12px
</style>
