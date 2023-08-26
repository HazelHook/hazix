import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"
import { useCheckboxContext } from "./checkbox-context"

export type IndicatorProps = Omit<QwikIntrinsicElements["div"], "data-state">

export const Indicator = component$<QwikIntrinsicElements["div"]>((props) => {
	const { checked } = useCheckboxContext()
	return checked.value ? (
		<div {...props} data-state={checked.value}>
			<Slot />
		</div>
	) : null
})
