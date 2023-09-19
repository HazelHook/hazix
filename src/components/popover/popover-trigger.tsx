import {
	$,
	QwikIntrinsicElements,
	Slot,
	component$,
	useContext,
	useSignal,
	useStylesScoped$,
	useVisibleTask$,
} from "@builder.io/qwik"
import { PopoverContext } from "./popover-context"
import styles from "./popover-trigger.css?inline"
import { getState } from "utils/index"

export type PopoverTriggerProps = {
	tabIndex?: number
} & QwikIntrinsicElements["span"]

export const PopoverTrigger = component$<PopoverTriggerProps>(({ class: classes, ...props }) => {
	const ref = useSignal<HTMLElement>()
	const contextService = useContext(PopoverContext)
	useStylesScoped$(styles)

	useVisibleTask$(({ track }) => {
		track(() => ref)
		contextService.triggerRef = ref
	})

	const mouseOverHandler = $(() => {
		contextService.openSig.value = true
	})

	return (
		<span
			ref={ref}
			{...props}
			role="button"
			class={`popover-trigger ${classes}`}
			data-state={getState(contextService.openSig.value)}
			onClick$={contextService.triggerEvent === "click" ? mouseOverHandler : undefined}
			onMouseOver$={contextService.triggerEvent === "mouseOver" ? mouseOverHandler : undefined}
		>
			<Slot />
		</span>
	)
})
