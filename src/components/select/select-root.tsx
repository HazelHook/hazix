import {
	$,
	PropFunction,
	QwikIntrinsicElements,
	Slot,
	component$,
	useContextProvider,
	useStore,
} from "@builder.io/qwik"
import { SelectContext } from "./select-context"

type Direction = "ltr" | "rtl"

export type SelectProps = {
	defaultValue?: string
	value?: string
	onValueChange?: PropFunction<(value: string) => void>
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: PropFunction<(open: boolean) => void>
	dir?: Direction
	name?: string
	disabled?: boolean
	required?: boolean
} & QwikIntrinsicElements["select"]

const Select = component$<SelectProps>((props) => {
	const {
		defaultOpen = false,
		open = defaultOpen,
		disabled = false,
		required = false,
		dir = "ltr",
		onValueChange,
		onOpenChange,
	} = props
	const store = useStore<SelectContext>({
		open,
		disabled,
		required,
		dir,
		onValueChange: $(function (this: SelectContext, val) {
			onValueChange?.(val)
			this.value = val
		}),
		onOpenChange: $(function (this: SelectContext, open) {
			onOpenChange?.(open)
			this.open = open
		}),
	})

	useContextProvider(SelectContext, store)
	return <Slot />
})

const Root = Select

export { Root, Select }
