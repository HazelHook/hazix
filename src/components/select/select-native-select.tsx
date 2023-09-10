import { $, component$, QwikIntrinsicElements, useSignal } from "@builder.io/qwik"
import { useContext } from "@builder.io/qwik"
import { useOn } from "@builder.io/qwik"
import { useVisibleTask$ } from "@builder.io/qwik"
import { SelectContext } from "./select-context"

export type NativeSelectProps = {
	class?: string
} & QwikIntrinsicElements["select"]

export const NativeSelect = component$(({ ...props }: NativeSelectProps) => {
	const selectContext = useContext(SelectContext)
	const ref = useSignal<HTMLElement>()

	useVisibleTask$(function populateNativeSelect({ track }) {
		const options = track(() => selectContext.optionsStore)

		options.length > 0 &&
			options.map((option) => {
				const optionElement = document.createElement("option")
				const optionValue = option.dataset.optionValue
				optionElement.setAttribute("value", optionValue!)
				ref.value?.append(optionElement)
			})
	})

	useOn(
		"change",
		$((e) => {
			const target = e.target as HTMLSelectElement
			target.value = selectContext.selectedOptionSig.value!
		}),
	)

	return (
		<select ref={ref} required aria-hidden tabIndex={-1} bind:value={selectContext.selectedOptionSig} {...props}>
			<option value="" />
		</select>
	)
})
