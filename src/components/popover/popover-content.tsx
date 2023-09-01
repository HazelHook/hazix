import {
	component$,
	Slot,
	useVisibleTask$,
	useContext,
	useSignal,
	useStylesScoped$,
	QwikIntrinsicElements,
} from "@builder.io/qwik"
import styles from "./popover-content.css?inline"
import { PopoverContext } from "./popover-context"
import { getState } from "utils/index"

export type PopoverContentProps = {} & QwikIntrinsicElements["div"]

export const PopoverContent = component$<PopoverContentProps>(({ class: classes, ...rest }) => {
	const ref = useSignal<HTMLElement>()
	const contextService = useContext(PopoverContext)
	useStylesScoped$(styles)

	useVisibleTask$(() => {
		contextService.setOverlayRef$(ref)
	})

	return (
		<div
			ref={ref}
			role="dialog"
			aria-modal="true"
			aria-label="Popover"
			data-state={getState(contextService.open)}
			class={`popover-content ${classes}`}
			{...rest}
		>
			<Slot />
		</div>
	)
})
