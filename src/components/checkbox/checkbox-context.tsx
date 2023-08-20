import { Signal, createContextId, useContext } from "@builder.io/qwik"
import { CheckedState } from "."

export interface CheckboxRootContext {
	checked: Signal<CheckedState>
}

const checkboxContextId = createContextId<CheckboxRootContext>("checkbox-root")
export function useCheckboxContext() {
	return useContext(checkboxContextId)
}
export function setupCheckboxContextProvider(checked: Signal<CheckedState>) {
	return {
		checked
	}
}