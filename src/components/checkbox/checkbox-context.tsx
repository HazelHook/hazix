import { Signal, createContextId } from "@builder.io/qwik"

export interface CheckboxRootContext {
	checked: Signal<boolean | "indeterminate">
}


export const checkboxRootContextId = createContextId<CheckboxRootContext>("checkbox-root")
