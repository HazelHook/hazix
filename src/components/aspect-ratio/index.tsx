import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

type AspectRatioProps = {
	ratio?: number
} & QwikIntrinsicElements["div"]

export const AspectRatio = component$((props: AspectRatioProps) => {
	const { ratio = 1 / 1, style, ...aspectRatioProps } = props

	const styles = typeof style === "object" ? style : {}

	return (
		<div
			style={{
				// ensures inner element is contained
				position: "relative",
				// ensures padding bottom trick maths works
				width: "100%",
				paddingBottom: `${100 / ratio}%`,
			}}
			data-hazix-aspect-ratio-wrapper=""
		>
			<div
				{...aspectRatioProps}
				style={{
					...styles,
					// ensures children expand in ratio
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				}}
			>
				<Slot />
			</div>
		</div>
	)
})
