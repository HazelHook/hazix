import { QwikIntrinsicElements, component$, $, Slot } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { getState } from "utils/index"

export type DialogTriggerProps = {
	dialog?: string
} & QwikIntrinsicElements["button"]

const DialogTrigger = component$<DialogTriggerProps>((props) => {
	const portalContext = usePortalProviderContext()

	const onClick = $(() => {
		if (portalContext.openSig) {
			portalContext.openSig.value = !portalContext.openSig.value
		}
	})

	return (
		<button
			tabIndex={-1}
			type="button"
			aria-haspopup="dialog"
			aria-expanded={portalContext.openSig.value}
			data-state={getState(portalContext.openSig.value)}
			onClick$={onClick}
			{...props}
		>
			<Slot />
		</button>
	)
})

const Trigger = DialogTrigger

export { DialogTrigger, Trigger }
