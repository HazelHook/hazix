import { component$, Slot, type QwikIntrinsicElements, useSignal, $, PropFunction } from "@builder.io/qwik"

type ToggleProps = {
	/**
	 * The controlled state of the toggle.
	 */
	pressed?: boolean
	/**
	 * The state of the toggle when initially rendered. Use `defaultPressed`
	 * if you do not need to control the state of the toggle.
	 * @defaultValue false
	 */
	defaultPressed?: boolean
	/**
	 * The callback that fires when the state of the toggle changes.
	 */
	onPressedChange$?: PropFunction<(pressed: boolean) => void>
} & QwikIntrinsicElements["button"]

export const Toggle = component$((props: ToggleProps) => {
	const { pressed: pressedProp, defaultPressed = false, onPressedChange$, ...buttonProps } = props

	const controlled = pressedProp !== undefined
	const pressed = useSignal(defaultPressed)

	const onToggleClick = $(() => {
		pressed.value = !pressed.value

		if (onPressedChange$) {
			onPressedChange$(pressed.value)
		}
	})

	return (
		<button
			type="button"
			aria-pressed={controlled ? pressedProp : pressed.value}
			data-state={controlled ? pressedProp : pressed.value ? "on" : "off"}
			data-disabled={props.disabled ? "" : undefined}
			{...buttonProps}
			onClick$={onToggleClick}
		>
			<Slot />
		</button>
	)
})
