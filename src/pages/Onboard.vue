<template>
	<MenuOnBoardButtons />
	<Mazda />
	<MazdaSpeedometer :speed="speed" :rpm="rpm" />
	<MazdaOnboardData />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MenuOnBoardButtons from '@/components/menu/MenuOnBoardButtons.vue';
import MazdaSpeedometer from '@/components/mazda/MazdaSpeedometer.vue';
import Mazda from '@/components/mazda/Mazda.vue';
import MazdaOnboardData from '@/components/mazda/MazdaOnboardData.vue';

export default defineComponent({
	name: 'Onboard',
	components: {
		MenuOnBoardButtons,
		MazdaSpeedometer,
		Mazda,
		MazdaOnboardData
	},
	data() {
		return {
			speed: 0,
			rpm: 0
		};
	},
	mounted() {
		setTimeout(() => {
			this.speed = 60;
			this.rpm = 1500;
		}, 5000);
	}
});
</script>

<style lang="sass">
/* портретная ориентация */
@media screen and (orientation: portrait)
    .MazdaSpeedometer
        top: 150px
        width: calc(100% - 16px)
        display: flex
        justify-content: center

    #app .Mazda
        height: 55%

        &-position
            display: none

    .MazdaOnboardData
        flex-direction: column
        justify-content: flex-end
        height: 45%

/* горизонтальная ориентация */
@media screen and (orientation: landscape)
    .MazdaSpeedometer
        right: 490px
        top: 90px

    .Mazda
        width: 65%
        height: calc(65% - 32px)
        margin-bottom: 32px

    .MazdaOnboardData
        flex-direction: row
        height: 35%
</style>
