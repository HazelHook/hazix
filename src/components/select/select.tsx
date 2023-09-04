import { PropFunction, QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

type Direction = "ltr" | "rtl"

export type SelectProps = {
	defaultValue?: string
	value?: string
	onValueChange?: PropFunction<(value: string) => void>
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: PropFunction<(open: boolean) => void>
	dir: Direction
	name?: string
	disabled?: boolean
	required?: boolean
} & QwikIntrinsicElements["select"]

const Select = component$<SelectProps>(() => {
	return <Slot />
})

const Root = Select

export { Root, Select }
