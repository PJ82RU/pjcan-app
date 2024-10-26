<template>
	<div class="multi-range">
		<div class="multi-range__range-wrap">
			<div v-for="item in ranges" :data-idx="item.index" class="multi-range__range" :style="{ left: item.left }">
				<div class="multi-range__handle">
					<div
						class="multi-range__handle__value"
						:class="{ 'multi-range__selected': item.selected }"
					>
						{{ item.value }}
					</div>
				</div>
			</div>
		</div>
		<div class="multi-range__ticks">
			<div v-for="tick in ticks" :data-value="tick"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from "vue";

export default {
	name: "MultiRange",
	props: {
		/** Список точек */
		points: {
			type: Array,
			default: () => []
		},
		/** Минимальное значение */
		min: {
			type: Number,
			default: 0
		},
		/** Максимальное значение */
		max: {
			type: Number,
			default: 100
		},
		/** Шаг линейки */
		numberOfTicks: {
			type: Number,
			default: 10
		},
		/** Выбранная точка */
		selectPoint: {
			type: Number,
			default: 0
		}
	},
	setup(props: any)
	{
		const { points, min, max, numberOfTicks, selectPoint } = toRefs(props);

		const delta = computed(() => max.value - min.value);
		const ranges = computed(() =>
			[0, ...points.value].map((point, i) => ({
				value: point,
				selected: selectPoint.value === point,
				left: (point * 100) / delta.value + "%"
			}))
		);
		const ticks = computed(() =>
		{
			const result = new Array(numberOfTicks.value);
			const tick = delta.value / numberOfTicks.value;
			for (let i = 0; i < numberOfTicks.value; i++) result[i] = (tick * i).toFixed();
			return result;
		});

		return {
			ranges,
			ticks
		};
	}
};
</script>

<style lang="scss" scoped>
.multi-range {
	margin: 2em 0;
	width: 100%;
	min-width: 150px;
}

.multi-range {
	$height: 12px;

	@mixin rangesColors($size: 6) {
		@for $i from 1 through $size {
			&:nth-child(#{$i}) {
				color: hsl($i * 35, 70%, 66%);
			}
		}
	}
	user-select: none;

	&__range-wrap {
		height: $height;
		background: #e8e8e8;
		border-radius: 3px;
		position: relative;
		z-index: 5;
	}

	&__range {
		@include rangesColors(6);

		height: 100%;
		position: absolute;
		right: 0;
		background: currentColor;

		&:first-child {
			> .multi-range__handle {
				display: none;
			}
		}

		.multi-range__handle {
			$C: #22262a;
			$out: -3px;
			width: 2px;

			position: absolute;
			top: $out;
			bottom: $out;
			left: -1px;

			cursor: grab;
			background: currentColor;
			box-shadow:
				1px 0 $C,
				-1px 0 $C;
			transition: 0.2s;

			&:active {
				cursor: inherit;
			}

			&__value {
				$C: #22262a;
				position: absolute;
				transform: translate(-50%, -6px);
				min-width: 10px;
				background: white;
				color: $C;
				padding: 2px 6px;
				top: -160%;
				left: 1px;
				white-space: nowrap;
				font-size: 14px;
				text-align: center;
				border-radius: 4px;
				cursor: default;

				&::after {
					content: "";
					position: absolute;
					left: 50%;
					bottom: -4px;
					border-color: white transparent transparent;
					border-style: solid;
					border-width: 4px 5px;
					transform: translate(-50%, 50%);
					color: white;
					font-size: 15px;
				}
			}
		}
	}

	&__ticks {
		display: flex;
		justify-content: space-between;
		height: 6px;
		margin: 2px 0 0 0;
		font: 10px Arial;
		cursor: default;

		> div {
			height: 100%;
			width: 1px;
			background: #888;
			color: #888;

			&:nth-child(5n - 4) {
				height: 200%;
				&::before {
					display: block;
					content: attr(data-value);
					transform: translate(-50%, 100%);
					text-align: center;
					width: 40px;
					margin-top: 4px;
				}
			}
		}
	}

	&__selected {
		background: $primary !important;
		color: white !important;
		z-index: 6;

		&::after {
			border-color: $primary transparent transparent !important;
		}
	}
}
</style>
