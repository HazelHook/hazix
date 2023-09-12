import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { getState } from "utils/index"

export type DialogContentProps = {} & QwikIntrinsicElements["div"]

const DialogContent = component$<DialogContentProps>((props) => {
	const portalContext = usePortalProviderContext()

	return (
		<div
			ref={portalContext.contentRefSig}
			{...props}
			onClick$={(e) => e.stopPropagation()}
			data-state={getState(portalContext.openSig.value)}
		>
			<Slot />
		</div>
	)
})

const Content = DialogContent

export { DialogContent, Content }
