import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"

export type SelectItemTextProps = {} & QwikIntrinsicElements["div"]

const SelectItemText = component$<SelectItemTextProps>((props) => {
	return <div aria-hidden {...props} />
})

const ItemText = SelectItemText

export { SelectItemText, ItemText }
