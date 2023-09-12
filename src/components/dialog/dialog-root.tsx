import { component$, Signal, Slot, useSignal } from "@builder.io/qwik"
import { setupPortalProviderContextProvider } from "./dialog-context"
import { makeSignal } from "utils/hooks/signal"

export interface DialogProps {
	open?: boolean | Signal<boolean>
}

const Dialog = component$<DialogProps>((props) => {
	const { open } = props

	const openSig = makeSignal(open ?? false)

	const contentRefSig = useSignal<HTMLElement>()

	// Provide the public API for the PopupManager for other components.
	setupPortalProviderContextProvider({
		openSig,
		contentRefSig,
	})

	return <Slot />
})

const Root = Dialog

export { Dialog, Root }
