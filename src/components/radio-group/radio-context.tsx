import { createContextId } from "@builder.io/qwik"

export type RadioContext = {
	value: string
}

export const RadioContext = createContextId<RadioContext>("radio")
