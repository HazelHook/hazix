import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectContentProps = {} & QwikIntrinsicElements["div"]

const SelectContent = component$<SelectContentProps>((props) => {
	return (
		<div {...props}>
			<Slot />
		</div>
	)
})

const Content = SelectContent

export { SelectContent, Content }
