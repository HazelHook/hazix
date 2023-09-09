import {
	QwikIntrinsicElements,
	Signal,
	Slot,
	component$,
	createContextId,
	useComputed$,
	useContext,
	useContextProvider,
	useSignal,
	useVisibleTask$,
} from "@builder.io/qwik"
import { KeyCode } from "utils/index"
import { SelectContext } from "./select-context"

export type SelectItemProps = {
	disabled?: boolean
	value: string
} & QwikIntrinsicElements["div"]

export const selectOptionPreventedKeys = [KeyCode.ArrowDown, KeyCode.ArrowUp]

type SelectItemContext = {
	isSelectedSig: Signal<boolean>
}

export const SelectItemContext = createContextId<SelectItemContext>("select-item")

const SelectItem = component$(({ disabled, value, ...props }: SelectItemProps) => {
	const selectContext = useContext(SelectContext)

	const isSelectedSig = useComputed$(() => selectContext.selectedOptionSig.value === value)

	useContextProvider(SelectItemContext, { isSelectedSig })

	const optionRef = useSignal<HTMLElement>()

	const isFocusedSig = useSignal(false)

	useVisibleTask$(({ cleanup }) => {
		const keyHandler = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement
			if (selectOptionPreventedKeys.includes(e.key as KeyCode)) {
				e.preventDefault()
			}

			if (!disabled && e.key === "Tab" && target.dataset.optionValue === value) {
				selectContext.selectedOptionSig.value = value
				selectContext.isOpenSig.value = false
			}

			if (!disabled && (e.key === "Enter" || e.key === " ") && target.dataset.optionValue === value) {
				selectContext.selectedOptionSig.value = value
				selectContext.isOpenSig.value = false
			}
		}

		const blurHandler = () => {
			isFocusedSig.value = false
		}
		const focusHandler = () => {
			isFocusedSig.value = true
		}

		optionRef.value?.addEventListener("keydown", keyHandler)
		optionRef.value?.addEventListener("blur", blurHandler)
		optionRef.value?.addEventListener("focus", focusHandler)

		cleanup(() => {
			optionRef.value?.removeEventListener("keydown", keyHandler)
			optionRef.value?.removeEventListener("blur", blurHandler)
			optionRef.value?.removeEventListener("focus", focusHandler)
		})
	})

	return (
		<div
			ref={optionRef}
			role="option"
			tabIndex={disabled ? -1 : 0}
			data-highlighted={isFocusedSig.value ? "" : undefined}
			aria-disabled={disabled}
			aria-selected={value === selectContext.selectedOptionSig.value}
			data-option-value={value}
			data-disabled={disabled}
			onClick$={() => {
				if (!disabled) {
					selectContext.selectedOptionSig.value = value
					selectContext.isOpenSig.value = false
				}
			}}
			onMouseEnter$={(e) => {
				if (!disabled) {
					const target = e.target as HTMLElement
					target.focus()
				}
			}}
			{...props}
		>
			<Slot />
		</div>
	)
})
const Item = SelectItem

export { SelectItem, Item }
