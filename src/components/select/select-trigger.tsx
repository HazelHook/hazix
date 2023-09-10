import { QwikIntrinsicElements, Slot, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik"
import { SelectContext } from "./select-context"
import { KeyCode } from "utils/keycode.types"

export type SelectTriggerProps = {
	disabled?: boolean
} & QwikIntrinsicElements["button"]

function shouldShowPlaceholder(value?: string) {
	return value === "" || value === undefined
}

export const selectOpenKeys = [KeyCode.ArrowDown, KeyCode.ArrowLeft, KeyCode.Enter, " "]

const SelectTrigger = component$<SelectTriggerProps>((props) => {
	const { disabled = false, ...triggerProps } = props
	const selectContext = useContext(SelectContext)

	const isDisabled = selectContext.disabled || disabled

	const triggerRef = useSignal<HTMLElement>()
	selectContext.triggerRefSig = triggerRef

	useVisibleTask$(function setClickHandler({ cleanup }) {
		function clickHandler(e: Event) {
			e.preventDefault()
			selectContext.isOpenSig.value = !selectContext.isOpenSig.value
		}
		triggerRef.value?.addEventListener("click", clickHandler)
		cleanup(() => {
			triggerRef.value?.removeEventListener("click", clickHandler)
		})
	})

	useVisibleTask$(function setKeyHandler({ cleanup }) {
		function keyHandler(e: KeyboardEvent) {
			if (e.key === "Home" || e.key === "End") {
				e.preventDefault()
			}
			if (selectOpenKeys.includes(e.key)) {
				selectContext.isOpenSig.value = true
			}
		}
		triggerRef.value?.addEventListener("keydown", keyHandler)
		cleanup(() => {
			triggerRef.value?.removeEventListener("keydown", keyHandler)
		})
	})

	return (
		<button
			ref={triggerRef}
			type="button"
			role="combobox"
			aria-controls={"context.contentId"}
			aria-expanded={selectContext.isOpenSig.value}
			aria-required={selectContext.required}
			aria-autocomplete="none"
			dir={selectContext.dir}
			data-state={selectContext.isOpenSig.value ? "open" : "closed"}
			disabled={isDisabled}
			data-disabled={isDisabled ? "" : undefined}
			data-placeholder={shouldShowPlaceholder(selectContext.selectedOptionSig.value) ? "" : undefined}
			{...triggerProps}
		>
			<Slot />
		</button>
	)
})

const Trigger = SelectTrigger

export { SelectTrigger, Trigger }
