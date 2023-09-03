import { QwikIntrinsicElements, Slot, component$, useStylesScoped$ } from "@builder.io/qwik"
import { useDropdownMenuContext } from "./dropdown-context"
import styles from "./dropdown-portal.css?inline"

export type DropdownItemProps = {
	disabled?: boolean
} & QwikIntrinsicElements["div"]

export const Item = component$<DropdownItemProps>(({ class: classes, disabled, ...props }) => {
	const context = useDropdownMenuContext()
	useStylesScoped$(styles)
	return (
		<div
			{...props}
			class={`dropdown-item ${classes}`}
			data-state={context.open.value ? "open" : "closed"}
			onClick$={() => {
				// context.open.value = false
			}}
		>
			<Slot />
		</div>
	)
})
