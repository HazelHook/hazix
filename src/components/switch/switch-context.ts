import { Signal, createContextId } from "@builder.io/qwik"

export type SwitchContext = {
	openSignal: Signal<boolean>
	disabled: boolean
}

export const SwitchContext = createContextId<SwitchContext>("switch")
