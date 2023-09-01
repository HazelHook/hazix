import { QwikIntrinsicElements, component$, $, Slot } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { getState } from "utils/index"

export type ComboboxTriggerProps = {
	dialog?: string
} & QwikIntrinsicElements["button"]

export const Trigger = component$<ComboboxTriggerProps>((props) => {
	const portalContext = usePortalProviderContext()

	const onClick = $(() => {
		if (portalContext.open) {
			portalContext.open.value = !portalContext.open.value
		}
	})

	return (
		<>
			<button
				tabIndex={-1}
				type="button"
				aria-haspopup="dialog"
				aria-expanded={portalContext.open.value}
				data-state={getState(portalContext.open.value)}
				{...props}
				onClick$={onClick}
			>
				<Slot />
			</button>
		</>
	)
})
