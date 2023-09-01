import { QRL, createContextId } from "@builder.io/qwik"

export type RadioGroupContext = {
	required: boolean
	disabled: boolean
	value?: string
	setValue$: QRL<(value: string) => void>
}

export const RadioGroupContext = createContextId<RadioGroupContext>("radio-group")
