import { component$, type QwikIntrinsicElements, useContext, Slot, type CSSProperties } from "@builder.io/qwik"
import { ScrollAreaContext } from "./scroll-area-context"

type ScrollAreaViewportProps = {
	style?: CSSProperties
} & Omit<QwikIntrinsicElements["div"], "style">

const ScrollAreaViewport = component$<ScrollAreaViewportProps>((props) => {
	const context = useContext(ScrollAreaContext)
	return (
		<>
			{/* Hide scrollbars cross-browser and enable momentum scroll for touch devices */}
			<style
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={
					"[data-hazix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-hazix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
				}
			/>
			<div
				data-hazix-scroll-area-viewport=""
				{...props}
				ref={context.viewportRef}
				style={{
					/**
					 * We don't support `visible` because the intention is to have at least one scrollbar
					 * if this component is used and `visible` will behave like `auto` in that case
					 * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
					 *
					 * We don't handle `auto` because the intention is for the native implementation
					 * to be hidden if using this component. We just want to ensure the node is scrollable
					 * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
					 * the browser from having to work out whether to render native scrollbars or not,
					 * we tell it to with the intention of hiding them in CSS.
					 */
					overflowX: context.scrollbarXEnabledSig.value ? "scroll" : "hidden",
					overflowY: context.scrollbarYEnabledSig.value ? "scroll" : "hidden",
					...props.style,
				}}
			>
				{/**
				 * `display: table` ensures our content div will match the size of its children in both
				 * horizontal and vertical axis so we can determine if scroll width/height changed and
				 * recalculate thumb sizes. This doesn't account for children with *percentage*
				 * widths that change. We'll wait to see what use-cases consumers come up with there
				 * before trying to resolve it.
				 */}
				<div ref={context.contentRef} style={{ minWidth: "100%", display: "table" }}>
					<Slot />
				</div>
			</div>
		</>
	)
})

const Viewport = ScrollAreaViewport

export { ScrollAreaViewport, Viewport }
