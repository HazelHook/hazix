import { QwikIntrinsicElements, component$ } from "@builder.io/qwik"

export type SeparatorProps = {
	orientation?: "horizontal" | "vertical"
	decorative?: boolean
} & QwikIntrinsicElements["div"]

export const Separator = component$<SeparatorProps>(({ orientation = "horizontal", decorative, ...props }) => {
	const ariaOrientation = orientation === "vertical" ? orientation : undefined
	const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" }

	if (orientation === "horizontal") {
		return <div {...props} class={`w-full h-px ${props.class}`} />
	}

	return <div class={`w-px h-full ${props.class}`} data-orientation={orientation} {...semanticProps} {...props} />
})
