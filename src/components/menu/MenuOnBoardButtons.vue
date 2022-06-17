<template>
	<div class="MenuOnBoardButtons">
		<q-btn-group push>
			<q-btn color="primary" size="xl">
				<q-icon left size="1.5em">
					<img src="/img/ico-info.svg" alt="" />
				</q-icon>
				<div>Info</div>
			</q-btn>
			<q-btn color="primary" size="xl">
				<q-icon left name="schedule" color="pjicon" size="2em" />
				<div>Clock</div>
			</q-btn>
			<q-btn v-if="bose" class="ico-bose" color="primary" size="xl">
				<q-icon center>
					<img src="/img/ico-bose.svg" alt="" />
				</q-icon>
			</q-btn>
		</q-btn-group>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'MenuOnBoardButtons',
	props: {
		bose: {
			type: Boolean,
			default: true
		}
	}
});
</script>

<style lang="sass">
.MenuOnBoardButtons
    position: fixed
    left: 20px
    top: 20px

    button
        min-width: 150px

    .ico-bose img
        width: auto
        height: auto

    .ico-bose .q-icon
        width: 150px
</style>
