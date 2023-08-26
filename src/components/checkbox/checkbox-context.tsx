import { Signal, createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik"
import { CheckedState } from "."

export type CheckboxRootContext = {
	checked: Signal<CheckedState>
}

const checkboxContextId = createContextId<CheckboxRootContext>("checkbox-root")

export function useCheckboxContext() {
	return useContext(checkboxContextId)
}

export function setupCheckboxContextProvider(checked: Signal<CheckedState>) {
	// eslint-disable-next-line qwik/use-method-usage
	const store = useStore({
		checked,
	})
	// eslint-disable-next-line qwik/use-method-usage
	useContextProvider(checkboxContextId, store)

	return store
}
