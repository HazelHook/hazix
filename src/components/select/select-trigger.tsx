import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { SelectContext } from "./select-context"

export type SelectTriggerProps = {
	disabled?: boolean
} & QwikIntrinsicElements["button"]

function shouldShowPlaceholder(value?: string) {
	return value === "" || value === undefined
}

const SelectTrigger = component$<SelectTriggerProps>((props) => {
	const { disabled = false, ...triggerProps } = props
	const context = useContext(SelectContext)

	const isDisabled = context.disabled || disabled

	return (
		<button
			type="button"
			role="combobox"
			aria-controls={"context.contentId"}
			aria-expanded={context.open}
			aria-required={context.required}
			aria-autocomplete="none"
			dir={context.dir}
			data-state={context.open ? "open" : "closed"}
			disabled={isDisabled}
			data-disabled={isDisabled ? "" : undefined}
			data-placeholder={shouldShowPlaceholder(context.value) ? "" : undefined}
			{...triggerProps}
		>
			<Slot />
		</button>
	)
})

const Trigger = SelectTrigger

export { SelectTrigger, Trigger }
