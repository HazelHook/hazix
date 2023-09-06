import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"

export type SelectSeparatorProps = {} & QwikIntrinsicElements["div"]

const SelectSeparator = component$<SelectSeparatorProps>((props) => {
	return <div aria-hidden {...props} />
})

const Separator = SelectSeparator

export { SelectSeparator, Separator }
