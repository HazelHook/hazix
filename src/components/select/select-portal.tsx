import { QwikIntrinsicElements, Slot, component$, useContext } from "@builder.io/qwik"
import { SelectContext } from "./select-context"
import { Portal as PrimitivPortal } from "components/portal"

export type SelectPortalProps = {} & QwikIntrinsicElements["div"]

const SelectPortal = component$<SelectPortalProps>((props) => {
	const context = useContext(SelectContext)

	return (
		<PrimitivPortal openSig={context.isOpenSig} contentRefSig={context.listBoxRefSig} {...props}>
			<Slot />
		</PrimitivPortal>
	)
})

const Portal = SelectPortal

export { SelectPortal, Portal }
