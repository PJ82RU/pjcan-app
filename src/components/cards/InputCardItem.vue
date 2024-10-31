<template>
	<div class="input-card-item d-flex">
		<v-text-field
			class="input-card-item__message"
			:model-value="title"
			:hint="description"
			:suffix="textValue"
			variant="underlined"
			density="compact"
			persistent-hint
			readonly
			dense
			:disabled="disabled"
		/>
	</div>
</template>

<script lang="ts">
import { computed, ComputedRef, toRefs } from "vue";
import { getFormatTime } from "@/utils/time";

export default {
	name: "InputCardItem",
	props: {
		/** Значение */
		value: {
			type: [String, Number],
			required: true
		},
		/** Заголовок */
		title: {
			type: String,
			required: true
		},
		/** Описание */
		description: {
			type: String,
			default: undefined
		},
		/** Тип: text, time, temperature */
		type: {
			type: String,
			default: "text"
		},
		/** Нет данных */
		nodata: {
			type: Boolean,
			default: false
		},
		/** Выкл. */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(props: any)
	{
		const { value, type, nodata } = toRefs(props);
		const textValue: ComputedRef<string | number> = computed((): string | number =>
		{
			switch (type.value)
			{
				case "mtime":
					if (!nodata.value)
					{
						switch (typeof value.value)
						{
							case "number":
							case "bigint":
								return getFormatTime(value.value);
							case "string":
								return value.value;
						}
					}
					return "--:--:--";

				case "time":
					if (!nodata.value)
					{
						switch (typeof value.value)
						{
							case "number":
							case "bigint":
								return getFormatTime(value.value, false);
							case "string":
								return value.value;
						}
					}
					return "--:--:--";

				case "temperature":
					if (!nodata.value)
					{
						switch (typeof value.value)
						{
							case "number":
								return value.value.toFixed(1) + "°C";
							case "string":
								return value.value + "°C";
						}
					}
					return "-.-°C";

				case "volts":
					if (!nodata.value)
					{
						switch (typeof value.value)
						{
							case "number":
								return "+" + value.value.toFixed(2) + "V";
							case "string":
								return value.value;
						}
					}
					return "-";

				default:
					if (!nodata.value)
					{
						switch (typeof value.value)
						{
							case "number":
								return value.value.toFixed();
							case "string":
								return value.value;
						}
					}
					return "--";
			}
		});

		return {
			textValue
		};
	}
};
</script>

<style lang="scss" scoped>
.input-card-item {
	&__message {
		&.nodata {
			::v-deep(.v-text-field__suffix) {
				color: $disable;
			}
		}

		::v-deep(.v-text-field__suffix) {
			font-family: $font-family !important;
		}
	}

	&__value {
		max-width: 80px;
		min-width: 80px;
		font-family: $font-family;

		&.nodata {
			color: $disable;
		}

		::v-deep(input) {
			color: var(--v-theme-primary);
		}
	}
}
</style>
