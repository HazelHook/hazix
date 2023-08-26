import { QwikIntrinsicElements, component$, useContext } from "@builder.io/qwik"
import { ProgressContext } from "./progress-context"
import { getProgressState } from "./progress"

export type ProgressIndicatorProps = QwikIntrinsicElements["div"]

export const ProgressIndicator = component$((props: ProgressIndicatorProps) => {
	const context = useContext(ProgressContext)

	return (
		<div
			data-state={getProgressState(context.value, context.max)}
			data-value={context.value ?? undefined}
			data-max={context.max}
			{...props}
		/>
	)
})
