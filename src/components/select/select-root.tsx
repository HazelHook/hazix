import {
	$,
	PropFunction,
	QwikIntrinsicElements,
	Slot,
	component$,
	useContextProvider,
	useOnDocument,
	useSignal,
	useStore,
	useVisibleTask$,
} from "@builder.io/qwik"
import { SelectContext } from "./select-context"
import { VisuallyHidden } from "utils/components/visually-hidden"
import { NativeSelect } from "./select-native-select"
import { Placement, autoUpdate, computePosition, flip, offset as offsetMid } from "@floating-ui/dom"

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
	position?: Placement
	offset?: number
} & QwikIntrinsicElements["div"]

const Select = component$<SelectProps>((props) => {
	const {
		defaultOpen = false,
		open = defaultOpen,
		disabled = false,
		required = false,
		dir = "ltr",
		position = "bottom",
		offset = 10,
	} = props

	const rootRefSig = useSignal<HTMLElement>()
	const optionsStore = useStore([])
	const selectedOptionSig = useSignal("")
	const isOpenSig = useSignal(open)
	const triggerRefSig = useSignal<HTMLElement>()
	const listBoxRefSig = useSignal<HTMLElement>()
	const isListboxHiddenSig = useSignal(true)

	const selectContext: SelectContext = {
		required,
		disabled,
		dir,
		optionsStore,
		selectedOptionSig,
		isOpenSig,
		triggerRefSig,
		listBoxRefSig,
		isListboxHiddenSig,
	}

	const store = useStore<SelectContext>(selectContext)

	useContextProvider(SelectContext, store)

	useOnDocument(
		"click",
		$((e) => {
			const target = e.target as HTMLElement
			if (selectContext.isOpenSig.value === true && !rootRefSig.value?.contains(target)) {
				selectContext.isOpenSig.value = false
			}
		}),
	)

	useVisibleTask$(function setKeyHandler({ cleanup }) {
		function keyHandler(e: KeyboardEvent) {
			e.preventDefault()
			if (e.key === "Escape") {
				selectContext.isOpenSig.value = false
			}
		}
		rootRefSig.value?.addEventListener("keydown", keyHandler)
		cleanup(() => {
			rootRefSig.value?.removeEventListener("keydown", keyHandler)
		})
	})

	const updatePosition$ = $((referenceEl: HTMLElement, floatingEl: HTMLElement) => {
		computePosition(referenceEl, floatingEl, {
			placement: position,
			middleware: [flip(), offsetMid(offset)],
		}).then(({ x, y }) => {
			Object.assign(floatingEl.style, {
				left: `${x}px`,
				top: `${y}px`,
			})
		})
	})

	useVisibleTask$(async function toggleSelectListBox({ track }) {
		const trigger = track(() => selectContext.triggerRefSig.value)
		const content = track(() => selectContext.listBoxRefSig.value)
		const expanded = track(() => selectContext.isOpenSig.value)

		if (!trigger || !content) return

		updatePosition$(trigger, content)

		if (expanded) {
			content?.focus()
		} else {
			trigger?.focus()
		}
	})

	useVisibleTask$(({ cleanup }) => {
		const trigger = selectContext.triggerRefSig.value
		const content = selectContext.listBoxRefSig.value

		if (!trigger || !content) return

		updatePosition$(trigger, content)

		const updater = autoUpdate(trigger, content, async () => await updatePosition$(trigger, content))

		cleanup(() => updater())
	})

	useVisibleTask$(function collectOptions({ track }) {
		const listBox = track(() => selectContext.listBoxRefSig.value)

		if (listBox) {
			const collectedOptions = Array.from(listBox.querySelectorAll('[role="option"]')) as HTMLElement[]
			selectContext.optionsStore.push(...collectedOptions)
		}
	})

	return (
		<div ref={rootRefSig} {...props}>
			<Slot />
			{props.required ? (
				<VisuallyHidden>
					<NativeSelect />
				</VisuallyHidden>
			) : null}
		</div>
	)
})

const Root = Select

export { Root, Select }
