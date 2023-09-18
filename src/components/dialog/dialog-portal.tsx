import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { Portal as PrimitivPortal } from "components/portal"

export type DialogPortalProps = {} & QwikIntrinsicElements["div"]

const DialogPortal = component$<DialogPortalProps>((props) => {
	const portalContext = usePortalProviderContext()

	return (
		<PrimitivPortal openSig={portalContext.openSig} contentRefSig={portalContext.contentRefSig} {...props}>
			<Slot />
		</PrimitivPortal>
	)
})

const Portal = DialogPortal

export { DialogPortal, Portal }
