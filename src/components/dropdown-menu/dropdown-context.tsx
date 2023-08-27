import { Signal, createContextId, useContext, useContextProvider } from "@builder.io/qwik"

export type DropdownMenuContext = {
	open: Signal<boolean>
}

const dropdownMenuContextId = createContextId<DropdownMenuContext>("portal-provider")

export function useDropdownMenuContext() {
	return useContext(dropdownMenuContextId)
}
export function setupDropdownMenuContextProvider(context: DropdownMenuContext) {
	// eslint-disable-next-line qwik/use-method-usage
	useContextProvider(dropdownMenuContextId, context)
}
