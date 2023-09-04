import { createContextId, QRL, Signal } from "@builder.io/qwik"
import type { AlignedPlacement, Side } from "@floating-ui/dom"

interface PopoverContextProps {
	open: boolean
	placement?: Side | AlignedPlacement
	triggerEvent?: "click" | "mouseOver"
	setTriggerRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>
	setOverlayRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>
}
export const PopoverContext = createContextId<PopoverContextProps>("popover-context")
