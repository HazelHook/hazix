import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectValueProps = {} & Omit<QwikIntrinsicElements["span"], "placeholder">

const SelectValue = component$<SelectValueProps>((props) => {
	return (
		<span {...props} style={{ pointerEvents: "none" }}>
			<Slot name="placeholder" />
		</span>
	)
})

const Value = SelectValue

export { SelectValue, Value }
