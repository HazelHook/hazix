import { QwikIntrinsicElements, Signal, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"

export type PortalProps = {
	contentRefSig: Signal<HTMLElement | undefined>
	openSig: Signal<boolean>
} & QwikIntrinsicElements["div"]

const Portal = component$<PortalProps>(({ openSig, contentRefSig, ...props }) => {
	const base = useSignal<HTMLElement>()

	useVisibleTask$(({ track }) => {
		const childSig = track(() => contentRefSig)
		const isOpen = track(() => openSig.value)
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
			onClick$={() => {
				openSig.value = false
			}}
			hidden={!openSig.value}
		>
			<Slot />
		</div>
	)
})

export { Portal }
