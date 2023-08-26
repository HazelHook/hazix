import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"
import { Direction } from "./internal/data"

export type RootProps = QwikIntrinsicElements["input"] & {
	value?: number[]
	defaultValue?: number[]
	min?: number
	max?: number
	onValueChange?: (value: number) => void
	onValueCommit?: (value: number) => void
	name?: string
	disabled?: boolean
	orientation?: "horizontal" | "vertical"
	dir?: Direction
	inverted?: boolean
	step?: number
	minStepsBetweenThumbs?: number
}

export const Root = component$<RootProps>(() => {
	return <></>
})
