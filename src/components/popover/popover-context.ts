import { createContextId, QRL, Signal } from "@builder.io/qwik"

interface PopoverContextProps {
	open: boolean
	triggerEvent?: "click" | "mouseOver"
	setTriggerRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>
	setOverlayRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>
}
export const PopoverContext = createContextId<PopoverContextProps>("popover-context")
