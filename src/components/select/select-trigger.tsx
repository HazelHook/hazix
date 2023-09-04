import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectTriggerProps = {
	disabled?: boolean
} & QwikIntrinsicElements["button"]

const SelectTrigger = component$<SelectTriggerProps>(() => {
	return (
		<button
			type="button"
			role="combobox"
			aria-controls={"context.contentId"}
			aria-expanded={"true"} // context value here
			aria-autocomplete="none"
			// dir={context.dir}
			// data-state={context.open ? 'open' : 'closed'}
			// disabled={isDisabled}
			// data-disabled={isDisabled ? '' : undefined}
			// data-placeholder={shouldShowPlaceholder(context.value) ? '' : undefined}
		>
			<Slot />
		</button>
	)
})

const Trigger = SelectTrigger

export { SelectTrigger, Trigger }
