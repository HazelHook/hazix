import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectPortalProps = {} & QwikIntrinsicElements["div"]

const SelectPortal = component$<SelectPortalProps>((props) => {
	return (
		<div class="peer" {...props}>
			<Slot />
		</div>
	)
})

const Portal = SelectPortal

export { SelectPortal, Portal }
