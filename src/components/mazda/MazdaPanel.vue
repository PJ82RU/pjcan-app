<template>
	<div class="MazdaPanel">
		<div class="MazdaPanel-body"><img src="/images/cars/panel-car-01.png" alt="" /></div>
		<div class="MazdaPanel-item" :class="classDoorFrontLeftClose">
			<img src="/images/cars/panel-car-03.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorFrontLeftOpen">
			<img src="/images/cars/panel-car-02.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorFrontRightClose">
			<img src="/images/cars/panel-car-05.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorFrontRightOpen">
			<img src="/images/cars/panel-car-04.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorBackLeftClose">
			<img src="/images/cars/panel-car-07.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorBackLeftOpen">
			<img src="/images/cars/panel-car-06.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorBackRightClose">
			<img src="/images/cars/panel-car-09.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classDoorBackRightOpen">
			<img src="/images/cars/panel-car-08.png" alt="" />
		</div>
		<div class="MazdaPanel-item" :class="classSeatLeft"><img src="/images/cars/panel-car-10.png" alt="" /></div>
		<div class="MazdaPanel-item" :class="classSeatRight"><img src="/images/cars/panel-car-11.png" alt="" /></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MazdaPanel',
	props: {
		doorFrontLeft: {
			type: Boolean,
			default: false
		},
		doorFrontRight: {
			type: Boolean,
			default: false
		},
		doorBackLeft: {
			type: Boolean,
			default: false
		},
		doorBackRight: {
			type: Boolean,
			default: false
		},
		seatLeft: {
			type: Boolean,
			default: false
		},
		seatRight: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		classDoorFrontLeftOpen(): string | undefined {
			if (!this.doorFrontLeft) return 'hide';
		},
		classDoorFrontRightOpen(): string | undefined {
			if (!this.doorFrontRight) return 'hide';
		},
		classDoorBackLeftOpen(): string | undefined {
			if (!this.doorBackLeft) return 'hide';
		},
		classDoorBackRightOpen(): string | undefined {
			if (!this.doorBackRight) return 'hide';
		},
		classDoorFrontLeftClose(): string | undefined {
			if (!this.doorFrontLeft) return 'hide';
		},
		classDoorFrontRightClose(): string | undefined {
			if (!this.doorFrontRight) return 'hide';
		},
		classDoorBackLeftClose(): string | undefined {
			if (!this.doorBackLeft) return 'hide';
		},
		classDoorBackRightClose(): string | undefined {
			if (!this.doorBackRight) return 'hide';
		},
		classSeatLeft(): string | undefined {
			if (!this.seatLeft) return 'hide';
		},
		classSeatRight(): string | undefined {
			if (!this.seatRight) return 'hide';
		}
	}
});
</script>

<style lang="sass">
.MazdaPanel
    position: fixed
    z-index: 1000
    font-size: 24px
    left: 860px
    top: 40px

    img
        width: 400px

    &-body,
    &-item
        position: absolute

    .hide
        display: none
</style>
