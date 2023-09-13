import { createContextId } from "@builder.io/qwik"

export type DismissableLayerContext = {
	layers: Set<HTMLElement>
	layersWithOutsidePointerEventsDisabled: Set<HTMLElement>
	branches: Set<HTMLElement>
}

export const DismissableLayerContext = createContextId<DismissableLayerContext>("dismissable-layer-context")
