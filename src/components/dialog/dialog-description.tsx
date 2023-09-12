import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type DialogDescriptionProps = {} & QwikIntrinsicElements["p"]

const DialogDescription = component$<DialogDescriptionProps>((props) => {
	return (
		<p {...props}>
			<Slot />
		</p>
	)
})

const Description = DialogDescription

export { DialogDescription, Description }
