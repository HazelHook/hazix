import { component$, Slot, type QwikIntrinsicElements, Signal, useSignal } from "@builder.io/qwik"

type ToggleCustomProps = {
	/**
	 * The controlled state of the toggle.
	 */
	pressed?: Signal<boolean>
	/**
	 * The state of the toggle when initially rendered. Use `defaultPressed`
	 * if you do not need to control the state of the toggle.
	 * @defaultValue false
	 */
	defaultPressed?: boolean
}

export type ToggleProps = ToggleCustomProps & QwikIntrinsicElements["button"]

export const Toggle = component$((props: ToggleProps) => {
	const {
		defaultPressed = false,
		// eslint-disable-next-line qwik/use-method-usage
		pressed = useSignal(defaultPressed),
		...buttonProps
	} = props

	return (
		<button
			type="button"
			aria-pressed={pressed?.value ?? defaultPressed ?? false}
			data-state={pressed?.value ? "on" : "off"}
			data-disabled={props.disabled ? "" : undefined}
			{...(buttonProps as QwikIntrinsicElements["button"])}
			onClick$={() => {
				pressed.value = !pressed.value
			}}
		>
			<Slot />
		</button>
	)
})
