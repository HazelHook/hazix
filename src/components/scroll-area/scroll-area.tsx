import {
	CSSProperties,
	QwikIntrinsicElements,
	Slot,
	component$,
	useContextProvider,
	useSignal,
	useStore,
} from "@builder.io/qwik"
import { ScrollAreaContext } from "./scroll-area-context"

export type ScrollAreaProps = {
	type?: ScrollAreaContext["type"]
	dir?: ScrollAreaContext["dir"]
	style?: CSSProperties
	scrollHideDelay?: number
} & Omit<QwikIntrinsicElements["div"], "style">

const ScrollArea = component$<ScrollAreaProps>((props) => {
	const { type = "hover", dir = "ltr", scrollHideDelay = 600, ...scrollAreaProps } = props
	const scrollAreaRef = useSignal<Element>()
	const viewportRef = useSignal<Element>()
	const contentRef = useSignal<Element>()
	const scrollbarXRef = useSignal<Element>()
	const scrollbarYRef = useSignal<Element>()
	const cornerWidthSig = useSignal(0)
	const cornerHeightSig = useSignal(0)
	const scrollbarXEnabledSig = useSignal(false)
	const scrollbarYEnabledSig = useSignal(false)

	const store = useStore<ScrollAreaContext>({
		type,
		dir,
		scrollHideDelay,
		scrollAreaRef,
		viewportRef,
		contentRef,
		scrollbarXRef,
		scrollbarYRef,
		scrollbarXEnabledSig,
		scrollbarYEnabledSig,
		cornerWidthSig,
		cornerHeightSig,
	})

	useContextProvider(ScrollAreaContext, store)

	return (
		<div
			dir={dir}
			{...scrollAreaProps}
			ref={scrollAreaRef}
			style={{
				position: "relative",
				// Pass corner sizes as CSS vars to reduce re-renders of context consumers
				["--hazix-scroll-area-corner-width" as any]: `${cornerWidthSig.value}px`,
				["--hazix-scroll-area-corner-height" as any]: `${cornerHeightSig.value}px`,
				...props.style,
			}}
		>
			<Slot />
		</div>
	)
})

const Root = ScrollArea

export { ScrollArea, Root }
