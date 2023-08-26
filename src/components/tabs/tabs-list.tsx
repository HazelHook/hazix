import { component$, QwikIntrinsicElements, Slot } from "@builder.io/qwik"

export type TabListProps = QwikIntrinsicElements["div"]

export const TabList = component$((props: TabListProps) => {
	return (
		<div role="tablist" {...props}>
			<Slot />
		</div>
	)
})
