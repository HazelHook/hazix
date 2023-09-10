import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectViewPortProps = {} & QwikIntrinsicElements["div"]

const SelectViewPort = component$<SelectViewPortProps>((props) => {
	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<style dangerouslySetInnerHTML="[data-hazix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-hazix-select-viewport]::-webkit-scrollbar{display:none}" />
			<div
				data-hazix-select-viewport
				style={{
					position: "relative",
					flex: 1,
					overflow: "auto",
					...(props as any).style,
				}}
			>
				<Slot />
			</div>
		</>
	)
})

const Viewport = SelectViewPort

export { SelectViewPort, Viewport }
