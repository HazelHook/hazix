import { Signal, createContextId } from "@builder.io/qwik"

type Direction = "ltr" | "rtl"

export type ScrollAreaContext = {
	type: "auto" | "always" | "scroll" | "hover"
	dir: Direction
	scrollHideDelay: number
	scrollAreaRef: Signal<Element | undefined>
	viewportRef: Signal<Element | undefined>
	contentRef: Signal<Element | undefined>
	scrollbarXRef: Signal<Element | undefined>
	scrollbarXEnabledSig: Signal<boolean>
	scrollbarYRef: Signal<Element | undefined>
	scrollbarYEnabledSig: Signal<boolean>
	cornerWidthSig: Signal<number>
	cornerHeightSig: Signal<number>
}

export const ScrollAreaContext = createContextId<ScrollAreaContext>("scroll-area-context")
