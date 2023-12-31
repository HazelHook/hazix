import { Signal, createContextId, useContext, useContextProvider } from "@builder.io/qwik"

export type PortalProviderContext = {
	openSig: Signal<boolean>
	contentRefSig: Signal<HTMLElement | undefined>
}

const portalProviderContextId = createContextId<PortalProviderContext>("portal-provider")

export function usePortalProviderContext() {
	return useContext(portalProviderContextId)
}
export function setupPortalProviderContextProvider(context: PortalProviderContext) {
	// eslint-disable-next-line qwik/use-method-usage
	useContextProvider(portalProviderContextId, context)
}
