<template>
	<card class="info-card" :title="$t('onboard.info.title')">
		<template #body>
			<v-row>
				<v-col cols="12" class="pb-0">
					<icon-card-item
						:model-value="[acc]"
						:title="$t('onboard.info.acc.title')"
						:description="$t('onboard.info.acc.description')"
						:icon-name="['key']"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="timeWork"
						:title="$t('onboard.info.timeWork.title')"
						:description="$t('onboard.info.timeWork.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<input-card-item
						:value="temperature"
						:title="$t('onboard.info.temperature.title')"
						:description="$t('onboard.info.temperature.description')"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="handbrake"
						:title="$t('onboard.info.handbrake.title')"
						:description="$t('onboard.info.handbrake.description')"
						color="error"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<switch-card-item
						:model-value="reverse"
						:title="$t('onboard.info.reverse.title')"
						:description="$t('onboard.info.reverse.description')"
						color="warning"
					/>
				</v-col>
				<v-col cols="12" class="pt-0 pb-0">
					<icon-card-item
						:model-value="[seatbeltPassenger, seatbeltDriver]"
						:title="$t('onboard.info.safetyBelt.title')"
						:description="$t('onboard.info.safetyBelt.description')"
						:icon-name="['passenger', 'passenger']"
						:colorsTrue="{ primary: '#66bb6a' }"
						:colorsFalse="{ primary: '#ef5350' }"
					/>
				</v-col>
			</v-row>
		</template>
	</card>
</template>

<script lang="ts">
import { computed, ref } from "vue";

import Card from "@/components/cards/Card.vue";
import InputCardItem from "@/components/cards/InputCardItem.vue";
import SwitchCardItem from "@/components/cards/SwitchCardItem.vue";
import IconCardItem from "@/components/cards/IconCardItem.vue";

import { SensorsValue } from "@/models/pjcan/variables/sensors";
import { TemperatureValue } from "@/models/pjcan/variables/temperature";

export default {
	name: "InfoCard",
	components: { Card, InputCardItem, SwitchCardItem, IconCardItem },
	setup()
	{
		// датчики
		const sensorValue = ref(new SensorsValue());
		// температура
		const temperatureValue = ref(new TemperatureValue());

		const acc = computed((): boolean => true ?? sensorValue.value.acc);
		const timeWork = computed((): string => "01:05:30");
		const temperature = computed((): string => `${temperatureValue.value.out.toFixed(1)}°C`);
		const handbrake = computed((): boolean => true ?? sensorValue.value.handbrake);
		const reverse = computed((): boolean => true ?? sensorValue.value.reverse);
		const seatbeltDriver = computed((): boolean => true ?? sensorValue.value.seatbeltDriver);
		const seatbeltPassenger = computed((): boolean => sensorValue.value.seatbeltPassenger);

		return {
			acc,
			timeWork,
			temperature,
			handbrake,
			reverse,
			seatbeltDriver,
			seatbeltPassenger
		};
	}
};
</script>

<style lang="scss" scoped>
.info-card {
}
</style>
