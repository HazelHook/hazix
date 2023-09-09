import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { SelectItemContext } from "./select-item"

export type SelectItemIndicatorProps = {} & QwikIntrinsicElements["div"]

const SelectItemIndicator = component$<SelectItemIndicatorProps>((props) => {
	const selectItemContext = useContext(SelectItemContext)

	if (!selectItemContext.isSelectedSig.value) {
		return <></>
	}

	return (
		<div {...props}>
			<Slot />
		</div>
	)
})

const ItemIndicator = SelectItemIndicator

export { SelectItemIndicator, ItemIndicator }
