import { component$, $, Slot, type QwikIntrinsicElements, Component } from "@builder.io/qwik"
import { usePortalProviderContext } from "./dialog-context"
import { getState } from "utils/index"

type AsProp<T extends {} | keyof QwikIntrinsicElements> = T extends keyof QwikIntrinsicElements
	? { as?: QwikIntrinsicElements[T] }
	: { as?: Component<T> }

export type DialogTriggerProps<T extends {} | keyof QwikIntrinsicElements> = AsProp<T> &
	T extends keyof QwikIntrinsicElements
	? QwikIntrinsicElements[T]
	: T

const DialogTrigger = component$(<T extends {}>({ as: Tag = "button" as any, ...props }: DialogTriggerProps<T>) => {
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
