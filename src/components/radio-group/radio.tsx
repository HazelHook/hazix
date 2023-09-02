import { component$, type QwikIntrinsicElements, Slot, useContext, useContextProvider } from "@builder.io/qwik"
import { RadioContext } from "./radio-context"
import { RadioGroupContext } from "./radio-group-context"

type RadioCustomProps = {
	/**
	 * The controlled state of the toggle.
	 */
	checked?: boolean
	/**
	 * The state of the toggle when initially rendered. Use `defaultPressed`
	 * if you do not need to control the state of the toggle.
	 * @defaultValue false
	 */
	defaultChecked?: boolean

	value: string

	required?: boolean
}

export type RadioProps = RadioCustomProps & QwikIntrinsicElements["button"]

const Radio = component$<RadioProps>((props) => {
	const { defaultChecked = false, checked = defaultChecked, class: classes, disabled, value, ...buttonProps } = props

	useContextProvider(RadioContext, {
		value,
	})

	return (
		<button
			class={classes}
			type="button"
			role="radio"
			aria-checked={String(checked) as any}
			data-state={getState(checked)}
			data-disabled={disabled}
			disabled={disabled}
			value={value}
			{...buttonProps}
		>
			<Slot />
		</button>
	)
})

export type RadioIndicatorProps = {} & QwikIntrinsicElements["span"]

const RadioIndicator = component$<RadioIndicatorProps>((props) => {
	const radioContext = useContext(RadioContext)
	const radioGroupContext = useContext(RadioGroupContext)

	return (
		<span
			data-state={getState(radioGroupContext.value === radioContext.value)}
			data-disabled={radioGroupContext.value === radioContext.value ? "" : undefined}
			{...props}
		>
			<Slot />
		</span>
	)
})

export function getState(checked: boolean) {
	return checked ? "checked" : "unchecked"
}

export { Radio, RadioIndicator }
