import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"

export type DialogCloseProps = {
	class: string
} & QwikIntrinsicElements["button"]

const DialogClose = component$<DialogCloseProps>((props) => {
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

const Close = DialogClose

export { DialogClose, Close }
