


import { QwikIntrinsicElements, Slot, component$, useStylesScoped$ } from "@builder.io/qwik"
import { useDropdownMenuContext } from "./dropdown-context"
import styles from "./dropdown-portal.css?inline"

export type DropdownItemProps = {
    disabled?: boolean
    text?: string
} & QwikIntrinsicElements["div"]

export const Item = component$<DropdownItemProps>(({ class: classes, disabled, text, ...props }) => {
	const context = useDropdownMenuContext()
	useStylesScoped$(styles)
	return (
		<div
			{...props}
			class={`dropdown-portal ${context.open.value ? 'open' : 'closed'} ${classes}`}
			data-state={context.open.value ? "open" : "closed"}
			onClick$={() => {
				context.open.value = false
			}}
			style={{
				display: context.open?.value ? "flex" : "none",
				marginTop: "0px",
			}}
		>
			<Slot />
		</div>
	)
})
