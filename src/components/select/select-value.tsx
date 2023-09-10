import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { SelectContext } from "./select-context"

export type SelectValueProps = {} & Omit<QwikIntrinsicElements["span"], "placeholder">

const SelectValue = component$<SelectValueProps>((props) => {
	const selectContext = useContext(SelectContext)
	const value = selectContext.selectedOptionSig.value
	return (
		<span {...props} style={{ pointerEvents: "none" }}>
			{value ? value : <Slot name="placeholder" />}
		</span>
	)
})

const Value = SelectValue

export { SelectValue, Value }
