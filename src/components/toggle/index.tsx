import { component$, Slot, type QwikIntrinsicElements, $, PropFunction, Signal } from "@builder.io/qwik"
import { useControllableState } from "../../utils/hooks/use-controllable-state"

type ToggleProps = {
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
	/**
	 * The callback that fires when the state of the toggle changes.
	 */
	onPressedChange$?: PropFunction<(pressed: boolean) => void>
} & QwikIntrinsicElements["button"]

export const Toggle = component$((props: ToggleProps) => {
	const { pressed: pressedProp, defaultPressed = false, onPressedChange$, ...buttonProps } = props

	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange$,
		defaultProp: defaultPressed,
	})

	// const handlePressed = $(setPressed)

	// const pressed = useSignal(defaultPressed)

	const onToggleClick = $(() => {
		setPressed(!pressed.value)
		// pressed.value = !pressed.value

		if (onPressedChange$) {
			onPressedChange$(pressed.value)
		}
	})

	return (
		<button
			type="button"
			aria-pressed={pressed.value}
			data-state={pressed.value ? "on" : "off"}
			data-disabled={props.disabled ? "" : undefined}
			{...buttonProps}
			onClick$={onToggleClick}
		>
			<Slot />
		</button>
	)
})
