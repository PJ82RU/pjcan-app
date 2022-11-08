<template>
	<v-container class="loading fill-height d-flex align-center justify-center" fluid>
		<v-progress-circular :size="70" color="primary" indeterminate />
	</v-container>
</template>

<script lang="ts">
export default {
	name: "Loading"
};
</script>
