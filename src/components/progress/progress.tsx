import { QwikIntrinsicElements, Slot, component$, useContextProvider } from "@builder.io/qwik"
import { ProgressContext } from "./progress-context"

const DEFAULT_MAX = 100

export type ProgressState = "indeterminate" | "complete" | "loading"

export type ProgressProps = {
	value?: number | null | undefined
	max?: number
	getValueLabel?(value: number, max: number): string
} & QwikIntrinsicElements["div"]

export const Progress = component$((props: ProgressProps) => {
	const { value: valueProp, max: maxProp, getValueLabel = defaultGetValueLabel, ...progressProps } = props

	const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX
	const value = isValidValueNumber(valueProp, max) ? valueProp : null
	const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined

	useContextProvider(ProgressContext, {
		max,
		value,
	})

	return (
		<div
			aria-valuemax={max}
			aria-valuemin={0}
			aria-valuenow={isNumber(value) ? value : undefined}
			aria-valuetext={valueLabel}
			role="progressbar"
			data-state={getProgressState(value, max)}
			data-value={value ?? undefined}
			data-max={max}
			{...progressProps}
		>
			<Slot />
		</div>
	)
})

function defaultGetValueLabel(value: number, max: number) {
	return `${Math.round((value / max) * 100)}%`
}

export function getProgressState(value: number | undefined | null, maxValue: number): ProgressState {
	return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading"
}

function isNumber(value: any): value is number {
	return typeof value === "number"
}

function isValidMaxNumber(max: any): max is number {
	return isNumber(max) && !isNaN(max) && max > 0
}

function isValidValueNumber(value: any, max: number): value is number {
	return isNumber(value) && !isNaN(value) && value <= max && value >= 0
}
