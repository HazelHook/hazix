/* eslint-disable qwik/valid-lexical-scope */
import { component$, Signal, Slot } from "@builder.io/qwik"
import { setupPortalProviderContextProvider } from "./dialog-context"
import { makeSignal } from "utils/hooks/signal"

export interface DialogProps {
	open?: boolean | Signal<boolean>
	// onOpenChange?: (open: boolean) => void;
}

export const Root = component$<DialogProps>((props) => {
	const { open } = props

	const openSig = makeSignal(open ?? false)

	// Provide the public API for the PopupManager for other components.
	setupPortalProviderContextProvider({
		open: openSig,
	})

	return <Slot />
})
