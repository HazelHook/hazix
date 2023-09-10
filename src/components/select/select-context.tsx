import { Signal, createContextId } from "@builder.io/qwik"
import { Direction } from "components/tabs"

export type SelectContext = {
	optionsStore: HTMLElement[]
	disabled: boolean
	required: boolean
	selectedOptionSig: Signal<string | undefined>
	isOpenSig: Signal<boolean>
	triggerRefSig: Signal<HTMLElement | undefined>
	listBoxRefSig: Signal<HTMLElement | undefined>
	isListboxHiddenSig: Signal<boolean>
	dir: Direction
}

export const SelectContext = createContextId<SelectContext>("select")
