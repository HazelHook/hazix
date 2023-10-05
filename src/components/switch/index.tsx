import {
	component$,
	type QwikIntrinsicElements,
	Signal,
	useSignal,
	useContextProvider,
	useContext,
	Slot,
	CSSProperties,
	useVisibleTask$,
} from "@builder.io/qwik"
import { SwitchContext } from "./switch-context"
import { useSize } from "utils/hooks/use-size"
import { usePrevious } from "utils/hooks/use-previous"

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
		name,
		...buttonProps
	} = props

	const buttonRef = useSignal<HTMLElement>()

	const hasConsumerStoppedPropagationSig = useSignal(false)

	useContextProvider(SwitchContext, { openSignal: checked, disabled })

	return (
		<>
			<button
				name={name}
				class={classes}
				ref={buttonRef}
				type="button"
				role="switch"
				aria-checked={checked.value}
				aria-required={required}
				data-state={getState(checked.value)}
				data-disabled={disabled ? "" : undefined}
				disabled={disabled}
				value={value}
				onClick$={(event) => {
					checked.value = !checked.value

					hasConsumerStoppedPropagationSig.value = event.isPropagationStopped()

					if (hasConsumerStoppedPropagationSig.value) {
						event.stopPropagation()
					}
				}}
				{...buttonProps}
			>
				<Slot />
			</button>
			<BubbleInput
				control={buttonRef}
				bubbles={!hasConsumerStoppedPropagationSig}
				value={value}
				name={name}
				checked={checked.value}
				required={required}
				disabled={disabled}
				// We transform because the input is absolutely positioned but we have
				// rendered it **after** the button. This pulls it back to sit on top
				// of the button.
				style={{ transform: "translateX(-100%)" }}
			/>
		</>
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

type InputProps = QwikIntrinsicElements["input"]
interface BubbleInputProps extends InputProps {
	control: Signal<HTMLElement | undefined>
	bubbles: boolean
	style?: CSSProperties
}

const BubbleInput = component$((props: BubbleInputProps) => {
	const { control, checked, bubbles = true, ...inputProps } = props
	const ref = useSignal<HTMLInputElement>()
	const prevCheckedSig = usePrevious(checked)
	const controlSizeSig = useSize(control.value)

	// Bubble checked change to parents (e.g form change event)
	useVisibleTask$(({ track }) => {
		const input = track(() => ref.value)
		track(() => checked)

		const inputProto = window.HTMLInputElement.prototype
		const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked") as PropertyDescriptor
		const setChecked = descriptor.set
		if (prevCheckedSig.value !== checked && setChecked) {
			const event = new Event("click", { bubbles })
			setChecked.call(input, checked)
			input?.dispatchEvent(event)
		}
	})

	return (
		<input
			type="checkbox"
			aria-hidden
			checked={checked}
			{...inputProps}
			tabIndex={-1}
			ref={ref}
			style={{
				...props.style,
				...controlSizeSig.value,
				position: "absolute",
				pointerEvents: "none",
				opacity: 0,
				margin: 0,
			}}
		/>
	)
})

export function getState(checked: boolean) {
	return checked ? "checked" : "unchecked"
}

export { Switch as Root, SwitchThumb as Thumb }
