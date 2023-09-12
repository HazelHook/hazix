import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"
import { getState } from "utils/index"
import { usePortalProviderContext } from "./dialog-context"

export type DialogOverlayProps = {} & QwikIntrinsicElements["div"]

const DialogOverlay = component$<DialogOverlayProps>((props) => {
	const context = usePortalProviderContext()
	return (
		<div
			data-state={getState(context.openSig.value)}
			{...props}
			// We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
			style={{ pointerEvents: "auto" }}
		/>
	)
})

const Overlay = DialogOverlay

export { DialogOverlay, Overlay }
