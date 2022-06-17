<template>
	<div class="MazdaSpeedometer">
		<div class="MazdaSpeedometer-position" :style="speedometerPositionStyle">
			<q-circular-progress
				class="q-ma-md outer"
				show-value
				:value="speedx"
				:size="sizeOuter"
				:thickness="0.02"
				color="cyan"
				track-color="grey-10"
				:max="smMax"
				:angle="smAngle"
			/>
			<q-circular-progress
				class="q-ma-md inner-limit"
				:value="118"
				:size="sizeInner"
				:thickness="smThickness"
				color="grey-10"
				:max="smMax"
				:angle="smAngle"
			/>
			<q-circular-progress
				class="q-ma-md inner-prohibit"
				:value="100"
				:size="sizeInner"
				:thickness="smThickness"
				color="red"
				:max="smMax"
				:angle="9"
			/>
			<q-circular-progress
				class="q-ma-md needle-limit"
				:value="speedLimit"
				:size="sizeInner"
				:thickness="smThickness"
				color="primary"
				:max="smMax"
				:angle="smAngle"
			/>
			<q-circular-progress
				class="q-ma-md needle-prohibit"
				:value="speedProhibit"
				:size="sizeInner"
				:thickness="smThickness"
				color="red"
				:max="smMax"
				:angle="9"
			/>
			<div class="q-ma-md steer" :style="steerStyle">
				<span class="rpm text-grey-9">{{ rpm }}</span>
			</div>

			<MazdaPanel />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MazdaPanel from './MazdaPanel.vue';

export default defineComponent({
	name: 'MazdaSpeedometer',
	components: {
		MazdaPanel
	},
	props: {
		speed: {
			type: Number,
			default: 0
		},
		rpm: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			diameter: 0,
			smMax: 300,
			smAngle: -135,
			smThickness: 0.25
		};
	},
	computed: {
		speedometerPositionStyle(): string {
			return `width: ${this.diameter}px; height: ${this.diameter}px;`;
		},
		steerStyle(): string {
			return `width: ${this.diameter}px; height: ${this.diameter - 15}px;`;
		},
		speedx(): number {
			return this.speed < 0 ? 0 : this.speed > 220 ? 220 : this.speed;
		},
		sizeOuter(): string {
			return this.diameter + 'px';
		},
		sizeInner(): string {
			return this.diameter - 20 + 'px';
		},
		speedLimit(): number {
			return this.speedx < 118 ? this.speedx : 118;
		},
		speedProhibit(): number {
			let val: number = this.speedx - 120;
			return val > 0 ? val : 0;
		}
	},
	mounted() {
		this.updateRadius();
		// событие изменения ориентации
		window.addEventListener(
			'orientationchange',
			() => {
				setTimeout(() => this.updateRadius(), 1);
			},
			false
		);

		// скорость
		const elSpeed = document.querySelector('.q-circular-progress__text');
		if (elSpeed) {
			elSpeed.children[0].className = 'progress-speed';

			// иконка машины
			const elCar = document.createElement('div');
			elCar.className = 'car';
			const icoDoors = document.getElementById('ico-doors');
			if (icoDoors) {
				elCar.append(icoDoors);
				elSpeed.append(elCar);
			}
		}
	},
	methods: {
		/** Радиус спидоментра */
		updateRadius(): void {
			this.diameter = window.innerWidth > window.innerHeight ? window.innerWidth * 0.25 : window.innerWidth * 0.7;
		}
	}
});
</script>

<style lang="sass">
.MazdaSpeedometer
    &-position
        position: relative

    .outer,
    .inner-limit,
    .inner-prohibit,
    .needle-limit,
    .needle-prohibit,
    .steer
        position: absolute

    .inner-limit,
    .inner-prohibit,
    .needle-limit,
    .needle-prohibit
        top: 10px
        left: 10px

    .inner-prohibit
        opacity: 0.2

    .steer
        font-size: 24px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: flex-end

    .q-ma-md
        margin: 0

    .q-circular-progress__text
        flex-direction: column

    .progress-speed
        position: relative
        bottom: 10%

    .car
        position: relative
        bottom: 7%
        left: -17px
</style>
