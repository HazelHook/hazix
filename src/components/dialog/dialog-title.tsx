import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type DialogTitleProps = {} & QwikIntrinsicElements["p"]

const DialogTitle = component$<DialogTitleProps>((props) => {
	return (
		<h2 {...props}>
			<Slot />
		</h2>
	)
})

const Title = DialogTitle

export { DialogTitle, Title }
