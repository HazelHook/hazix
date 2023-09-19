import { createContextId, Signal } from "@builder.io/qwik"
import type { AlignedPlacement, Side } from "@floating-ui/dom"

interface PopoverContextProps {
	placement?: Side | AlignedPlacement
	triggerEvent?: "click" | "mouseOver"
	openSig: Signal<boolean>
	triggerRef: Signal<HTMLElement | undefined>
	contentRef: Signal<HTMLElement | undefined>
}

export const PopoverContext = createContextId<PopoverContextProps>("popover-context")
