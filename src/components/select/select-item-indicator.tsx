import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { SelectContext } from "./select-context"

export type SelectItemIndicatorProps = {} & QwikIntrinsicElements["div"]

const SelectItemIndicator = component$<SelectItemIndicatorProps>((props) => {
	const selectContext = useContext(SelectContext)

	// TODO: CREATE SELECT ITEM CONTEXT TO GET THE RIGHT VALUE HERE
	return (
		<div {...props}>
			<Slot />
		</div>
	)
})

const ItemIndicator = SelectItemIndicator

export { SelectItemIndicator, ItemIndicator }
