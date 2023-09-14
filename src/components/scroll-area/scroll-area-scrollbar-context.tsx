import { createContextId, type Signal } from "@builder.io/qwik"

export type ScrollbarContext = {
	hasThumb: boolean
	scrollbarRef: Signal<Element | undefined>
	onThumbChange$(thumb: Element | null): void
	onThumbPointerUp$(): void
	onThumbPointerDown$(pointerPos: { x: number; y: number }): void
	onThumbPositionChange$(): void
}

export const ScrollbarContext = createContextId<ScrollbarContext>("scrollbar-context")
