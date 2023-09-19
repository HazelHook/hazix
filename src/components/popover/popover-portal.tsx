import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { PopoverContext } from "./popover-context"
import { Portal as PrimitivPortal } from "components/portal"

export type PopoverPortalProps = {} & QwikIntrinsicElements["div"]

const PopoverPortal = component$<PopoverPortalProps>((props) => {
	const context = useContext(PopoverContext)

	return (
		<PrimitivPortal openSig={context.openSig} contentRefSig={context.contentRef} {...props}>
			<Slot />
		</PrimitivPortal>
	)
})

const Portal = PopoverPortal

export { PopoverPortal, Portal }
