import { QwikIntrinsicElements, Slot, component$, useId } from "@builder.io/qwik"

export type SelectGroupProps = {} & QwikIntrinsicElements["div"]

const SelectGroup = component$<SelectGroupProps>((props) => {
	const groupId = useId()

	return (
		<div role="group" aria-labelledby={groupId} {...props}>
			<Slot />
		</div>
	)
})

const Group = SelectGroup

export { SelectGroup, Group }
