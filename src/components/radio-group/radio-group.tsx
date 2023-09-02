import {
	$,
	AriaAttributes,
	QwikIntrinsicElements,
	Slot,
	component$,
	useContext,
	useContextProvider,
	useId,
	useSignal,
	useStore,
	useVisibleTask$,
} from "@builder.io/qwik"
import { Radio, RadioIndicator, RadioIndicatorProps, RadioProps } from "./radio"
import { RadioGroupContext } from "./radio-group-context"

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

type Direction = "ltr" | "rtl"
type Orientation = AriaAttributes["aria-orientation"]

export type RadioGroupProps = {
	required?: RadioProps["required"]
	disabled?: RadioProps["disabled"]
	dir?: Direction
	orientation?: Orientation
	loop?: boolean
	defaultValue?: string
	value?: string
} & QwikIntrinsicElements["div"]

const RadioGroup = component$<RadioGroupProps>((props) => {
	const { required = false, value, disabled = false, orientation, dir, ...groupProps } = props

	const store = useStore<RadioGroupContext>({
		required,
		disabled,
		value: value,
		setValue$: $(function (this: RadioGroupContext, val: string) {
			this.value = val
		}),
	})

	useContextProvider(RadioGroupContext, store)

	return (
		<div
			role="radiogroup"
			aria-required={required}
			aria-orientation={orientation}
			data-disabled={disabled ? "" : undefined}
			dir={dir}
			{...groupProps}
		>
			<Slot />
		</div>
	)
})

export type RadioGroupItemProps = RadioProps

const RadioGroupItem = component$<RadioGroupItemProps>((props) => {
	// eslint-disable-next-line qwik/use-method-usage
	const { disabled, value = useId(), ...itemProps } = props

	const context = useContext(RadioGroupContext)

	const isDisabled = context.disabled || disabled
	const isArrowKeyPressedSignal = useSignal(false)

	useVisibleTask$(({ cleanup }) => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (ARROW_KEYS.includes(event.key)) {
				isArrowKeyPressedSignal.value = true
			}
		}
		const handleKeyUp = () => {
			isArrowKeyPressedSignal.value = false
		}
		document.addEventListener("keydown", handleKeyDown)
		document.addEventListener("keyup", handleKeyUp)

		cleanup(() => {
			document.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("keyup", handleKeyUp)
		})
	})

	return (
		<Radio
			disabled={isDisabled}
			required={context.required}
			checked={context.value === value}
			value={value}
			{...itemProps}
			onClick$={() => context.setValue$(value as string)}
		>
			<Slot />
		</Radio>
	)
})

export type RadioGroupIndicatorProps = RadioIndicatorProps

const RadioGroupIndicator = component$<RadioGroupIndicatorProps>((props) => {
	return (
		<RadioIndicator {...props}>
			<Slot />
		</RadioIndicator>
	)
})

const Root = RadioGroup
const Item = RadioGroupItem
const Indicator = RadioGroupIndicator

export { RadioGroup, RadioGroupItem, RadioGroupIndicator, Root, Item, Indicator }
