<template>
	<div class="Mazda">
		<div class="Mazda-position">
			<!--<img src="/img/cars/mazda3.2008.png">-->
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Mazda'
};
</script>

<style lang="sass">
.Mazda
    display: flex
    justify-content: center
    align-content: center

    &-position
        display: flex
        flex-direction: column
        justify-content: flex-end

    img
        width: 550px
</style>
