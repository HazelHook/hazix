import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"

export type SelectItemIndicatorProps = {} & QwikIntrinsicElements["div"]

const SelectItemIndicator = component$<SelectItemIndicatorProps>((props) => {
	return <div {...props} />
})

const ItemIndicator = SelectItemIndicator

export { SelectItemIndicator, ItemIndicator }
