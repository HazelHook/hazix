import {
	component$,
	type QwikIntrinsicElements,
	Signal,
	useSignal,
	useContextProvider,
	useContext,
	Slot,
} from "@builder.io/qwik"
import { SwitchContext } from "./switch-context"

type SwitchCustomProps = {
	/**
	 * The controlled state of the toggle.
	 */
	checked?: Signal<boolean>
	/**
	 * The state of the toggle when initially rendered. Use `defaultPressed`
	 * if you do not need to control the state of the toggle.
	 * @defaultValue false
	 */
	defaultChecked?: boolean

	required?: boolean
}

export type SwitchProps = SwitchCustomProps & QwikIntrinsicElements["button"]

const Switch = component$<SwitchProps>((props) => {
	const {
		defaultChecked = false,
		// eslint-disable-next-line qwik/use-method-usage
		checked = useSignal(defaultChecked),
		class: classes,
		disabled,
		required,
		value = "on",
		...buttonProps
	} = props

	useContextProvider(SwitchContext, { openSignal: checked, disabled })

	console.log(checked.value)
	return (
		<button
			class={classes}
			type="button"
			role="switch"
			aria-checked={checked.value}
			aria-required={required}
			data-state={getState(checked.value)}
			data-disabled={disabled ? "" : undefined}
			disabled={disabled}
			value={value}
			onClick$={() => {
				console.log("HI")
				checked.value = !checked.value
			}}
			{...buttonProps}
		>
			<Slot />
		</button>
	)
})

const SwitchThumb = component$<QwikIntrinsicElements["span"]>((props) => {
	const context = useContext(SwitchContext)

	return (
		<span
			data-state={getState(context.openSignal.value)}
			data-disabled={context.disabled ? "" : undefined}
			{...props}
		/>
	)
})

export function getState(checked: boolean) {
	return checked ? "checked" : "unchecked"
}

export { Switch as Root, SwitchThumb as Thumb }
