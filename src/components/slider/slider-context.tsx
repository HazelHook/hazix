import { createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik"

export type SliderRootContext = {
	thumbs: Set<HTMLElement>
}

const sliderContextId = createContextId<SliderRootContext>("slider")

export function useSliderContext() {
	return useContext(sliderContextId)
}

export function setupSliderContextProvider(data: SliderRootContext) {
	// eslint-disable-next-line qwik/use-method-usage
	const store = useStore(data)
	// eslint-disable-next-line qwik/use-method-usage
	useContextProvider(sliderContextId, store)

	return store
}
