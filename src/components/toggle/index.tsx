import { component$, Slot, type QwikIntrinsicElements, $, PropFunction, Signal } from "@builder.io/qwik"
import { useControllableState } from "../../utils/hooks/use-controllable-state"

type ToggleCustomProps = {
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
} 

type ToggleProps = ToggleCustomProps & QwikIntrinsicElements["button"]

export const Toggle = component$((props: ToggleProps) => {
	const { pressed: pressedProp, defaultPressed = false, onPressedChange$, ...buttonProps } = props

	const [pressed, setPressed] = useControllableState<boolean>({
		prop: pressedProp ?? false,
		defaultProp: defaultPressed,
		onChange$: onPressedChange$,
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
