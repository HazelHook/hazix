import {
	$,
	PropFunction,
	QwikMouseEvent,
	Signal,
	Slot,
	component$,
	useContextProvider,
	useSignal,
	useStore,
	useStylesScoped$,
	useTask$,
	useVisibleTask$,
	type QwikIntrinsicElements,
} from "@builder.io/qwik"
import { isBrowser } from "@builder.io/qwik/build"

import {
	AlignedPlacement,
	Side,
	autoUpdate,
	computePosition,
	flip,
	offset as offsetPlugin,
	shift,
} from "@floating-ui/dom"
import { PopoverContext } from "./popover-context"

export type PopoverProps = QwikIntrinsicElements["span"] & {
	/*
	 * The side where to show the popover
	 */
	placement?: Side | AlignedPlacement
	/**
	 * Popover is opened when trigger is clicked or mouse overed
	 */
	triggerEvent?: "click" | "mouseOver"
	/**
	 * offset between trigger and content
	 */
	offset?: number
	/**
	 * Open or close the popover when popover is controlled by the parent
	 */
	open?: boolean

	defaultOpen?: boolean

	/**
	 * When true the popover is not closed when click outside
	 */
	modal?: boolean
	/**
	 * Notify a state update to the parent
	 */
	onOpenChange$?: PropFunction<(open: boolean) => void>
}

export const Popover = component$(
	({
		triggerEvent = "click",
		onOpenChange$,
		modal,
		offset = 5,
		placement,
		open,
		defaultOpen,
		...restOfProps
	}: PopoverProps) => {
		const wrapperRef = useSignal<HTMLElement>()
		const triggerRef = useSignal<HTMLElement>()
		const contentRef = useSignal<HTMLElement>()

		const setOverlayRef$ = $((ref: Signal<HTMLElement | undefined>) => {
			if (ref) {
				contentRef.value = ref.value
			}
		})

		const setTriggerRef$ = $((ref: Signal<HTMLElement | undefined>) => {
			if (ref) {
				triggerRef.value = ref.value
			}
		})

		//relative here because absolute needs a containing block - Jack
		useStylesScoped$(`
       [data-type="popover-root"] {
        position: relative;
       }
    `)

		const contextService = useStore({
			open: defaultOpen || false,
			placement: placement,
			triggerEvent,
			setTriggerRef$,
			setOverlayRef$,
		})
		useContextProvider(PopoverContext, contextService)

		/**
		 * Close the popover and sync external states
		 */
		const closePopover = $(async () => {
			contextService.open = false

			if (contentRef) {
				contentRef.value?.classList.add("close")
				contentRef.value?.classList.remove("open")
			}

			if (onOpenChange$) await onOpenChange$(contextService.open)
		})

		/**
		 * Open the popover and sync external states
		 */
		const openPopover = $(async () => {
			contextService.open = true

			if (contentRef) {
				contentRef.value?.classList.add("open")
				contentRef.value?.classList.remove("close")
			}

			if (onOpenChange$) await onOpenChange$(contextService.open)
		})

		/**
		 * Toggle the popover state and emit update
		 */
		const togglePopover = $(async () => {
			if (contextService.open) {
				closePopover()
			} else {
				openPopover()
			}

			if (onOpenChange$) await onOpenChange$(contextService.open)
		})

		/**
		 * Initialize popover
		 * NOTE: why useTask instead useClientEffect?
		 * It needs to be invoked after the children useClientEffect
		 */
		useTask$(({ track }) => {
			const trigger = track(() => triggerRef.value as Element)
			const content = track(() => contentRef.value as HTMLElement)

			if (isBrowser && trigger && content) {
				autoUpdate(trigger, content, () => {
					computePosition(trigger, content, {
						middleware: [flip(), shift(), offsetPlugin(offset || 0)],
						placement: placement,
					}).then(({ x, y }) => {
						Object.assign(content.style, {
							left: `${x}px`,
							top: `${y}px`,
						})
					})
				})

				// Open popover after initialization
				if (open) {
					openPopover()
				}
			}
		})

		/**
		 * Sync open external property with internal context
		 * NOTE: useful when the popover status is controlled from the outside
		 */
		useVisibleTask$(({ track }) => {
			track(() => open)
			contextService.open = !!open
		})

		/**
		 * Watch open context property
		 * and apply CSS classes to show and hide the Popover Content
		 */
		useVisibleTask$(({ track }) => {
			track(() => contextService.open)
			if (!triggerRef.value || !contentRef.value) return

			if (contextService.open) {
				openPopover()
			} else {
				closePopover()
			}
		})

		/**
		 * clickOutsideHandler
		 */
		const clickHandler = $((e: QwikMouseEvent) => {
			// if the popover content is clicked: do nothing
			const isContentClicked = contentRef.value?.contains(e.target as HTMLElement)
			if (isContentClicked) {
				return
			}

			// if the trigger is Clicked
			const isTriggerClicked = triggerRef.value?.contains(e.target as HTMLElement)
			if (isTriggerClicked && triggerEvent === "click") {
				// toggle if triggered by 'click'
				togglePopover()
			} else {
				// otherwise close it if popover is triggered
				if (modal) return
				closePopover()
			}
		})

		return (
			<span {...restOfProps} data-type="popover-root" ref={wrapperRef} document:onClick$={clickHandler}>
				<Slot />
			</span>
		)
	},
)
