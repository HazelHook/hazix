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

export type PopoverTriggerProps = {
	tabIndex?: number
} & QwikIntrinsicElements["span"]

export const PopoverTrigger = component$<PopoverTriggerProps>(({ class: classes, ...props }) => {
	const ref = useSignal<HTMLElement>()
	const contextService = useContext(PopoverContext)
	useStylesScoped$(styles)

	useVisibleTask$(() => {
		contextService.setTriggerRef$(ref)
	})

	const mouseOverHandler = $(() => {
		contextService.open = true
	})
	return (
		<span
			ref={ref}
			{...props}
			role="button"
			class={`popover-trigger ${classes}`}
			onMouseOver$={contextService.triggerEvent === "mouseOver" ? mouseOverHandler : undefined}
		>
			<Slot />
		</span>
	)
})
