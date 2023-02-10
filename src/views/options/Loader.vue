<template>
	<suspense>
		<template #fallback>
			<Loading />
		</template>

		<template #default>
			<Component />
		</template>
	</suspense>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";

import Loading from "@/components/Loading.vue";
import Denied from "@/components/Denied.vue";
const Component = defineAsyncComponent(() => import("./index.vue"));

export default {
	name: "Loader",
	components: {
		Loading, Denied, Component
	}
};
</script>
