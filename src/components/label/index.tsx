import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik"

export type LabelProps = Omit<QwikIntrinsicElements["label"], "for"> & {
	for: string
}

export const Label = component$<LabelProps>((props) => {
	return (
		<label {...props}>
			<Slot />
		</label>
	)
})
