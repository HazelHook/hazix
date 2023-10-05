import {  useSignal, useTask$ } from "@builder.io/qwik"

export function usePrevious<T>(sig: T) {
	const currentValue = useSignal<T>(sig)
	const previousSignal = useSignal<T | null>(null)

	useTask$(({ track }) => {
		const val = track(() => sig)

		previousSignal.value = currentValue.value
		currentValue.value = val
	})

	return previousSignal
}
