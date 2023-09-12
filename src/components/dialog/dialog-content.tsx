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
			<div class="flex flex-row justify-between">
				<div class="mr-4">
					<Slot name="title" />
				</div>
				<Slot name="close" />
			</div>
			<Slot name="description" />
			<Slot />
		</div>
	)
})

const Content = DialogContent

export { DialogContent, Content }
