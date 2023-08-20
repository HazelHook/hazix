import { $, PropFunction, useSignal, useTask$ } from "@builder.io/qwik"

type UseControllableStateParams<T> = {
	prop?: T | undefined
	defaultProp?: T | undefined
	onChange$?: PropFunction<(state: T) => void>
}

type SetStateFn<T> = (prevState?: T) => T

function useControllableState<T>({ prop, defaultProp, onChange$ }: UseControllableStateParams<T>) {
	const uncontrolledProp = useUncontrolledState({ defaultProp, onChange$ })
	const isControlled = prop !== undefined
	const value = isControlled ? prop : uncontrolledProp

	const setValue = $((nextValue: T) => {
		if (isControlled) {
			const setter = nextValue as SetStateFn<T>
			const value = typeof nextValue === "function" ? setter(prop) : nextValue
			if (value !== prop) onChange$?.(value as T)
		} else {
			uncontrolledProp.value = nextValue
		}
	})

	return [value, setValue] as const
}

function useUncontrolledState<T>({ defaultProp, onChange$ }: Omit<UseControllableStateParams<T>, "prop">) {
	const uncontrolledState = useSignal<T | undefined>(defaultProp)
	const prevState = useSignal<T | undefined>(defaultProp)

	useTask$(() => {
		if (prevState.value !== uncontrolledState.value) {
			onChange$?.(uncontrolledState.value as T)
			prevState.value = uncontrolledState.value
		}
	})

	return uncontrolledState
}

export { useControllableState }
