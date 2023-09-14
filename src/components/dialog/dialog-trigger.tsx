import { component$, $, Slot, type QwikIntrinsicElements } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { getState } from "utils/index"

export type DialogTriggerProps<C extends keyof QwikIntrinsicElements = "button"> = QwikIntrinsicElements[C] & {
	as?: C
}

export type HtmlElements = "div" | "a" | "span" | "button" | "ul" | "li" | "i" | "b" | "em" | "strong" | any

const DialogTrigger = component$<DialogTriggerProps<HtmlElements>>(({ as: Tag = "button" as any, ...props }) => {
	const portalContext = usePortalProviderContext()

	const onClick = $(() => {
		if (portalContext.openSig) {
			portalContext.openSig.value = !portalContext.openSig.value
		}
	})

	const Comp = Tag as any

	return (
		<Comp
			tabIndex={-1}
			aria-haspopup="dialog"
			aria-expanded={portalContext.openSig.value}
			data-state={getState(portalContext.openSig.value)}
			onClick$={onClick}
			{...props}
		>
			<Slot />
		</Comp>
	)
})

const Trigger = DialogTrigger

export { DialogTrigger, Trigger }
