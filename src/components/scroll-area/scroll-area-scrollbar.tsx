import {
	QwikIntrinsicElements,
	QwikPointerEvent,
	component$,
	useContext,
	useContextProvider,
	useSignal,
	useStore,
	useTask$,
} from "@builder.io/qwik"
import { ScrollAreaContext } from "./scroll-area-context"
import { ScrollbarContext } from "./scroll-area-scrollbar-context"

type ScrollAreaScrollbarProps = {
	orientation?: "horizontal" | "vertical"
} & QwikIntrinsicElements["div"]

const ScrollAreaScrollbar = component$<ScrollAreaScrollbarProps>((props) => {
	const context = useContext(ScrollAreaContext)
	const { scrollbarXEnabledSig, scrollbarYEnabledSig } = context
	const isHorizontal = props.orientation === "horizontal"

	useTask$(({ cleanup, track }) => {
		const isHoriz = track(() => isHorizontal)

		if (isHoriz) {
			scrollbarXEnabledSig.value = true
		} else {
			scrollbarYEnabledSig.value = true
		}

		cleanup(() => {
			if (isHoriz) {
				scrollbarXEnabledSig.value = false
			} else {
				scrollbarYEnabledSig.value = false
			}
		})
	})

	return context.type === "hover" ? (
		<ScrollAreaScrollbarHover {...props} ref={forwardedRef} />
	) : context.type === "scroll" ? (
		<ScrollAreaScrollbarScroll {...props} ref={forwardedRef} />
	) : context.type === "auto" ? (
		<ScrollAreaScrollbarAuto {...props} ref={forwardedRef} />
	) : context.type === "always" ? (
		<ScrollAreaScrollbarVisible {...props} ref={forwardedRef} />
	) : (
		<></>
	)
})

const ScrollAreaScrollbarAuto = component$<ScrollAreaScrollbarProps>((props) => {
	const context = useContext(ScrollAreaContext)

	const visibleSig = useSignal(false)
	const isHorizontal = props.orientation === "horizontal"

	// const handleResize = useDebounceCallback(() => {
	// 	if (context.viewportRef) {
	// 		const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth
	// 		const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight
	// 		visibleSig.value = isHorizontal ? isOverflowX : isOverflowY
	// 	}
	// }, 10)

	// useResizeObserver(context.viewport, handleResize)
	// useResizeObserver(context.content, handleResize)

	return <ScrollAreaScrollbarVisible data-state={visibleSig.value ? "visible" : "hidden"} {...props} />
})

const ScrollAreaScrollbarVisible = component$<ScrollAreaScrollbarProps>((props) => {
	const { orientation = "vertical", ...scrollbarProps } = props
	const context = useContext(ScrollAreaContext)

	const thumbRef = useSignal<Element | null>(null)
	const pointerOffsetRef = React.useRef(0)
	const [sizes, setSizes] = useSignal<Sizes>({
		content: 0,
		viewport: 0,
		scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
	})
	const thumbRatio = getThumbRatio(sizes.viewport, sizes.content)

	type UncommonProps = "onThumbPositionChange" | "onDragScroll" | "onWheelScroll"
	const commonProps: Omit<ScrollAreaScrollbarAxisPrivateProps, UncommonProps> = {
		...scrollbarProps,
		sizes,
		onSizesChange: setSizes,
		hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
		onThumbChange: (thumb) => (thumbRef.current = thumb),
		onThumbPointerUp: () => (pointerOffsetRef.current = 0),
		onThumbPointerDown: (pointerPos) => (pointerOffsetRef.current = pointerPos),
	}

	function getScrollPosition(pointerPos: number, dir?: Direction) {
		return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir)
	}

	if (orientation === "horizontal") {
		return (
			<ScrollAreaScrollbarX
				{...commonProps}
				ref={forwardedRef}
				onThumbPositionChange={() => {
					if (context.viewport && thumbRef.current) {
						const scrollPos = context.viewport.scrollLeft
						const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir)
						thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`
					}
				}}
				onWheelScroll={(scrollPos) => {
					if (context.viewport) context.viewport.scrollLeft = scrollPos
				}}
				onDragScroll={(pointerPos) => {
					if (context.viewport) {
						context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir)
					}
				}}
			/>
		)
	}

	if (orientation === "vertical") {
		return (
			<ScrollAreaScrollbarY
				{...commonProps}
				ref={forwardedRef}
				onThumbPositionChange={() => {
					if (context.viewport && thumbRef.current) {
						const scrollPos = context.viewport.scrollTop
						const offset = getThumbOffsetFromScroll(scrollPos, sizes)
						thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
					}
				}}
				onWheelScroll={(scrollPos) => {
					if (context.viewport) context.viewport.scrollTop = scrollPos
				}}
				onDragScroll={(pointerPos) => {
					if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos)
				}}
			/>
		)
	}

	return null
})

type ScrollAreaScrollbarImplProps = {} & QwikIntrinsicElements["div"]

const ScrollAreaScrollbarImpl = component$<ScrollAreaScrollbarImplProps>((props) => {
	const {
		sizes,
		hasThumb,
		onThumbChange$,
		onThumbPointerUp$,
		onThumbPointerDown$,
		onThumbPositionChange$,
		onDragScroll$,
		onWheelScroll$,
		onResize$,
		...scrollbarProps
	} = props

	const context = useContext(ScrollAreaContext)

	const scrollBarRef = useSignal<Element>()
	const rectRef = useSignal<ClientRect | null>(null)
	const prevWebkitUserSelectSig = useSignal<string>("")
	const viewport = context.viewportRef

	const maxScrollPos = sizes.content - sizes.viewport
	const handleWheelScroll = useCallbackRef(onWheelScroll$)
	const handleThumbPositionChange = useCallbackRef(onThumbPositionChange)
	const handleResize = useDebounceCallback(onResize, 10)

	function handleDragScroll(event: QwikPointerEvent) {
		if (rectRef.value) {
			const x = event.clientX - rectRef.value.left
			const y = event.clientY - rectRef.value.top
			onDragScroll({ x, y })
		}
	}

	/**
	 * We bind wheel event imperatively so we can switch off passive
	 * mode for document wheel event to allow it to be prevented
	 */
	useTask$(() => {
		const handleWheel = (event: WheelEvent) => {
			const element = event.target as HTMLElement
			const isScrollbarWheel = scrollbar?.contains(element)
			if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos)
		}
		document.addEventListener("wheel", handleWheel, { passive: false })
		return () => document.removeEventListener("wheel", handleWheel, { passive: false } as any)
	}, [viewport, scrollbar, maxScrollPos, handleWheelScroll])

	/**
	 * Update thumb position on sizes change
	 */
	useTask$(handleThumbPositionChange, [sizes, handleThumbPositionChange])

	useResizeObserver(scrollbar, handleResize)
	useResizeObserver(context.content, handleResize)

	const store = useStore<ScrollbarContext>({
		scrollbarRef,
		hasThumb,
        onThumbChange$,
        onThumbPointerUp$
        onThumbPointerDown$,
        onThumbPositionChange$,
	})

	useContextProvider(ScrollbarContext, store)

	return (
		
			<div
				{...scrollbarProps}
				ref={scrollBarRef}
				style={{ position: "absolute", ...scrollbarProps.style }}
				onPointerDown$={composeEventHandlers(props.onPointerDown, (event) => {
					const mainPointer = 0
					if (event.button === mainPointer) {
						const element = event.target as HTMLElement
						element.setPointerCapture(event.pointerId)
						rectRef.current = scrollbar!.getBoundingClientRect()
						// pointer capture doesn't prevent text selection in Safari
						// so we remove text selection manually when scrolling
						prevWebkitUserSelectSig.value = document.body.style.webkitUserSelect
						document.body.style.webkitUserSelect = "none"
						if (context.viewportRef) context.viewportRef.value?.style.scrollBehavior = "auto"
						handleDragScroll(event)
					}
				})}
				onPointerMove$={composeEventHandlers(props.onPointerMove, handleDragScroll)}
				onPointerUp$={composeEventHandlers(props.onPointerUp, (event) => {
					const element = event.target as HTMLElement
					if (element.hasPointerCapture(event.pointerId)) {
						element.releasePointerCapture(event.pointerId)
					}
					document.body.style.webkitUserSelect = prevWebkitUserSelectSig.value
					if (context.viewportRef) context.viewportRef.style.scrollBehavior = ""
					rectRef.value = null
				})}
			/>
	)
})

const Scrollbar = ScrollAreaScrollbar

export { ScrollAreaScrollbar, Scrollbar }
