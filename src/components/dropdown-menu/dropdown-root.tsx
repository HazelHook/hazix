import { component$, QwikIntrinsicElements, Signal, Slot, useSignal } from "@builder.io/qwik"
import { setupDropdownMenuContextProvider } from "./dropdown-context"

export type RootProps = {
	open?: Signal<boolean>
	defaultOpen?: boolean
} & QwikIntrinsicElements["div"]

export const Root = component$<RootProps>((props) => {
	const {
		// eslint-disable-next-line qwik/use-method-usage
		open = useSignal(props.defaultOpen ?? false),
		...rest
	} = props

	setupDropdownMenuContextProvider({
		open,
		contentRef: useSignal<HTMLElement>(),
	})

	return (
		<div {...rest}>
			<Slot />
		</div>
	)
})
