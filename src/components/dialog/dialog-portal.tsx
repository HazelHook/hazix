import { QwikIntrinsicElements, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"

export const Portal = component$<QwikIntrinsicElements["div"]>(({ class: classProp, ...props }) => {
	const portalContext = usePortalProviderContext()
	const base = useSignal<HTMLElement>()
	const child = useSignal<HTMLElement>()

	useVisibleTask$(() => () => base.value?.appendChild?.(child.value!))

	useVisibleTask$(({ track }) => {
		const childEl = track(() => child.value)
		const isOpen = track(() => portalContext.openSig.value)
		if (childEl) {
			if (isOpen) {
				document.body.appendChild(childEl)
			} else {
				base.value?.appendChild(childEl)
			}
		}
	})

	return (
		<div
			ref={base}
			{...props}
			class={`z-30 absolute w-screen h-screen top-0 left-0 justify-center items-center align-middle flex ${classProp}`}
			onClick$={() => {
				portalContext.openSig.value = false
			}}
			style={{
				display: portalContext.openSig.value ? "flex" : "none",
				marginTop: "0px",
			}}
		>
			<div ref={child} />
		</div>
	)
})

export type ComboboxTriggerProps = {
	class: string
} & QwikIntrinsicElements["button"]

export const Close = component$<ComboboxTriggerProps>((props) => {
	const portalContext = usePortalProviderContext()

	return (
		<button
			type="button"
			{...props}
			onClick$={() => {
				portalContext.openSig.value = false
			}}
			window:onKeyDown$={(e) => {
				if (e.key === "Escape") portalContext.openSig.value = false
			}}
		>
			<Slot />
		</button>
	)
})
