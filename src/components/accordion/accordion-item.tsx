import { component$, Slot, useContextProvider, useSignal, type QwikIntrinsicElements, useId } from "@builder.io/qwik"

import { type AccordionItemContext, accordionItemContextId } from "./accordion-context"

export type AccordionItemProps = {
	defaultValue?: boolean
} & QwikIntrinsicElements["div"]

const AccordionItem = component$(({ defaultValue = false, id, ...props }: AccordionItemProps) => {
	const localId = useId()
	const itemId = id || localId

	const isTriggerExpandedSig = useSignal<boolean>(defaultValue)

	const itemContext: AccordionItemContext = {
		itemId,
		isTriggerExpandedSig,
		defaultValue,
	}

	useContextProvider(accordionItemContextId, itemContext)

	return (
		<div id={itemId} data-type="item" data-item-id={itemId} {...props}>
			<Slot />
		</div>
	)
})

const Item = AccordionItem

export { AccordionItem, Item }
