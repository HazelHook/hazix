import { QRL, createContextId } from "@builder.io/qwik"
import { Direction } from "components/tabs"

export type SelectContext = {
	open: boolean
	disabled: boolean
	required: boolean
	value?: string
	onValueChange: QRL<(value: string) => void>
	onOpenChange: QRL<(open: boolean) => void>
	dir: Direction
}

export const SelectContext = createContextId<SelectContext>("select")
