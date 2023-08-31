import {
	component$,
	Slot,
	$,
	type QwikIntrinsicElements,
	QwikKeyboardEvent,
	useSignal,
	QwikMouseEvent,
	Signal,
	useStyles$,
} from "@builder.io/qwik"
import { setupCheckboxContextProvider } from "./checkbox-context"
import { makeSignal } from "utils/hooks/signal"

import styles from "./checkbox.css?inline"

export type CheckedState = boolean | "indeterminate"
export type CheckboxProps = Omit<QwikIntrinsicElements["button"], "checked" | "defaultChecked"> & {
	defaultChecked?: CheckedState
	checked?: Signal<CheckedState> | CheckedState
	required?: boolean
}

export const Root = component$<CheckboxProps>((props) => {
	const {
		class: classes,
		defaultChecked,
		checked: checkedProp,
		disabled,
		value = "on",
		required,
		...otherProps
	} = props
	useStyles$(styles)
	const otherPropsTyped: QwikIntrinsicElements["button"] = otherProps
	const ref = useSignal<HTMLButtonElement>()

	const context = setupCheckboxContextProvider(makeSignal<CheckedState>(checkedProp ?? defaultChecked ?? false))

	return (
		<>
			<input class="input" type="checkbox" aria-hidden tabIndex={-1} />
			<button
				type="button"
				role="checkbox"
				ref={ref}
				aria-checked={context.checked.value === "indeterminate" ? "mixed" : context.checked.value}
				aria-required={required}
				data-state={getState(context.checked.value ?? false)}
				data-disabled={disabled ? "" : undefined}
				disabled={disabled}
				value={value}
				{...otherPropsTyped}
				class={classes}
				onKeyDown$={[
					$((e: QwikKeyboardEvent) => {
						// According to WAI ARIA, Checkboxes don't activate on enter keypress
						if (e.key === "Enter") {
							e.stopPropagation()
						}
					}),
					otherPropsTyped.onKeyDown$,
				]}
				onClick$={[
					$((event: QwikMouseEvent) => {
						context.checked.value = context.checked.value === "indeterminate" ? true : !context.checked.value
						event.stopPropagation()
					}),
					otherPropsTyped.onClick$,
				]}
			>
				<Slot />
			</button>
		</>
	)
})

function getState(checked: CheckedState) {
	return checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked"
}
