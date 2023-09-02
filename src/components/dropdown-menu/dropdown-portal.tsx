import { QwikIntrinsicElements, Slot, component$, useStylesScoped$ } from "@builder.io/qwik"
import { useDropdownMenuContext } from "./dropdown-context"
import styles from "./dropdown-portal.css?inline"

export const Portal = component$<QwikIntrinsicElements["div"]>(({ class: classes, ...props }) => {
	const context = useDropdownMenuContext()
	useStylesScoped$(styles)
	return (
		<div
			{...props}
			class={`dropdown-portal ${context.open.value ? "open" : "closed"} ${classes}`}
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
