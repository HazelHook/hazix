import {
	$,
	CSSProperties,
	PropFunction,
	QwikIntrinsicElements,
	component$,
	useContextProvider,
	useOn,
	useSignal,
	useStore,
	useVisibleTask$,
} from "@builder.io/qwik"
import { DismissableLayerContext } from "./dismissable-layer-context"

const DISMISSABLE_LAYER_NAME = 'DismissableLayer'
const CONTEXT_UPDATE = 'dismissableLayer.update'
const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'


type DismissableLayerProps = {
	/**
	 * When `true`, hover/focus/click interactions will be disabled on elements outside
	 * the `DismissableLayer`. Users will need to click twice on outside elements to
	 * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
	 */
	disableOutsidePointerEvents?: boolean
	/**
	 * Event handler called when the escape key is down.
	 * Can be prevented.
	 */
	onEscapeKeyDown$?: (event: KeyboardEvent) => void
	/**
	 * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
	 * Can be prevented.
	 */
	onPointerDownOutside$?: (event: PointerDownOutsideEvent) => void
	/**
	 * Event handler called when the focus moves outside of the `DismissableLayer`.
	 * Can be prevented.
	 */
	onFocusOutside$?: (event: FocusOutsideEvent) => void
	/**
	 * Event handler called when an interaction happens outside the `DismissableLayer`.
	 * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
	 * Can be prevented.
	 */
	onInteractOutside$?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void
	/**
	 * Handler called when the `DismissableLayer` should be dismissed
	 */
	onDismiss$?: () => void
	style?: CSSProperties
} & Omit<QwikIntrinsicElements["div"], "style">

const DismissableLayer = component$<DismissableLayerProps>((props) => {
	const ref = useSignal<HTMLElement>()

	const store = useStore<DismissableLayerContext>({
		layers: new Set(),
		layersWithOutsidePointerEventsDisabled: new Set(),
		branches: new Set(),
	})

	useContextProvider(DismissableLayerContext, store)

	const focusOutside = useFocusOutside($((event) => {
		const target = event.target as HTMLElement
		const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target))
		if (isFocusInBranch) return
		onFocusOutside?.(event)
		onInteractOutside?.(event)
		if (!event.defaultPrevented) onDismiss?.()
	}), ownerDocument)

	useOn(
		"focuscapture",
		$((event) => {
			console.log(event)
		}),
	)

	useOn(
		"blurcapture",
		$((event) => {
			console.log(event)
		}),
	)

	useOn(
		"pointerdowncapture",
		$((event) => {
			console.log(event)
		}),
	)
	return (
		<div
		onPointerDownCapture$={}
			ref={ref}
			style={{
				pointerEvents: isBodyPointerEventsDisabled ? (isPointerEventsEnabled ? "auto" : "none") : undefined,
				...props.style,
			}}
		/>
	)
})



/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
function useFocusOutside(
	onFocusOutside?: PropFunction<(event: CustomEvent<{ originalEvent: FocusEvent}>) => void>,
	ownerDocument: Document = globalThis?.document,
) {
	const isFocusInsideReactTreeSig = useSignal(false)

	useVisibleTask$(() => {
		const handleFocus = (event: FocusEvent) => {
			if (event.target && !isFocusInsideReactTreeSig.value) {
				const eventDetail = { originalEvent: event }
				handleAndDispatchCustomEvent(FOCUS_OUTSIDE, onFocusOutside, eventDetail)
			}
		}
		ownerDocument.addEventListener("focusin", handleFocus)
		return () => ownerDocument.removeEventListener("focusin", handleFocus)
	})

	return {
		onFocusCapture: () => {isFocusInsideReactTreeSig.value = true},
		onBlurCapture: () => {isFocusInsideReactTreeSig.value = false},
	}
}

function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(
	name: string,
	handler: ((event: E) => void) | undefined,
	detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never),
) {
	const target = detail.originalEvent.target
	const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
	if (handler) target.addEventListener(name, handler as EventListener, { once: true })

	
	target.dispatchEvent(event)
}

const Root = DismissableLayer

export { DismissableLayer, Root }
