import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectLabelProps = {} & QwikIntrinsicElements["div"]

const SelectLabel = component$<SelectLabelProps>((props) => {
	return (
		<div {...props}>
			<Slot />
		</div>
	)
})

const Label = SelectLabel

export { SelectLabel, Label }
