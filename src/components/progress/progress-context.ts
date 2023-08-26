import { createContextId } from "@builder.io/qwik"

export type PogressContext = {
	value: number
	max: number
}

export const ProgressContext = createContextId<PogressContext>("hazix-progress")
