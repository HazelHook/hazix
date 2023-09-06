import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectItemProps = {} & QwikIntrinsicElements["div"]

const SelectItem = component$<SelectItemProps>((props) => {
	return (
		<div class="peer" {...props}>
			<Slot />
		</div>
	)
})

const Item = SelectItem

export { SelectItem, Item }
