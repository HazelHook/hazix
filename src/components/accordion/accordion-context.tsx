import { Signal, QRL, createContextId } from "@builder.io/qwik"

export type AccordionType = "single" | "multiple"

export interface AccordionRootContext {
	updateTriggers$: QRL<() => void>
	focusFirstTrigger$: QRL<() => void>
	focusPreviousTrigger$: QRL<() => void>
	focusNextTrigger$: QRL<() => void>
	focusLastTrigger$: QRL<() => void>
	currFocusedTriggerIndexSig: Signal<number>
	currSelectedTriggerIndexSig: Signal<number>
	selectedTriggerIdSig: Signal
	triggerElementsSig: Signal<HTMLButtonElement[]>
	collapsible: boolean
	type?: AccordionType
	animated?: boolean
}

export interface AccordionItemContext {
	isTriggerExpandedSig: Signal<boolean>
	defaultValue: boolean
	itemId: string
}

export const accordionRootContextId = createContextId<AccordionRootContext>("accordion-root")

export const accordionItemContextId = createContextId<AccordionItemContext>("accordion-item")
