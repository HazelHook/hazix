import { QwikIntrinsicElements, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"

export type DialogPortalProps = {} & QwikIntrinsicElements["div"]

const DialogPortal = component$<DialogPortalProps>((props) => {
	const portalContext = usePortalProviderContext()
	const base = useSignal<HTMLElement>()

	useVisibleTask$(({ track }) => {
		const childSig = track(() => portalContext.contentRefSig)
		const isOpen = track(() => portalContext.openSig.value)
		if (childSig.value) {
			if (isOpen) {
				document.body.appendChild(childSig.value)
			} else {
				base.value?.appendChild(childSig.value)
			}
		}
	})

	return (
		<div
			ref={base}
			{...props}
			// onClick$={() => {
			// 	portalContext.openSig.value = false
			// }}
			hidden={!portalContext.openSig.value}
		>
			<Slot />
		</div>
	)
})

const Portal = DialogPortal

export { DialogPortal, Portal }
