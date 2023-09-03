import {
	component$,
	useContext,
	useId,
	Slot,
	useTask$,
	$,
	useSignal,
	useVisibleTask$,
	type QwikIntrinsicElements,
	type QwikMouseEvent,
	useComputed$,
} from "@builder.io/qwik"
import { isBrowser, isServer } from "@builder.io/qwik/build"
import { KeyCode } from "../../utils"
import { TabsContext } from "./tabs-context"

export type TabProps = {
	onClick$?: (event: QwikMouseEvent) => void
	selectedClassName?: string
	disabled?: boolean
} & QwikIntrinsicElements["button"]

export const preventedKeys = [
	KeyCode.Home,
	KeyCode.End,
	KeyCode.PageDown,
	KeyCode.PageUp,
	KeyCode.ArrowDown,
	KeyCode.ArrowUp,
	KeyCode.ArrowLeft,
	KeyCode.ArrowRight,
]

export const Tab = component$((props: TabProps) => {
	const contextService = useContext(TabsContext)
	const isSelectedSig = useSignal(false)
	const serverAssignedIndexSig = useSignal<number | undefined>(undefined)
	const matchedTabPanelIdSig = useSignal<string | undefined>(undefined)
	const elementRefSig = useSignal<HTMLElement | undefined>()
	const uniqueTabId = useId()

	const selectedClassNameSig = useComputed$(() => {
		return props.selectedClassName || contextService.selectedClassName
	})

	useTask$(async function indexInitTask({ cleanup }) {
		if (isServer) {
			serverAssignedIndexSig.value = await contextService.getNextServerAssignedTabIndex$()
		}

		if (isBrowser) {
			contextService.reIndexTabs$()
		}
		cleanup(() => {
			contextService.reIndexTabs$()
		})
	})

	useTask$(async function isSelectedTask({ track }) {
		const isTabSelected = await track(() => contextService.isTabSelected$(uniqueTabId))
		if (isServer && !props.disabled) {
			isSelectedSig.value = await contextService.isIndexSelected$(serverAssignedIndexSig.value)
			return
		}
		isSelectedSig.value = isTabSelected
	})

	useTask$(function disabledTask({ track }) {
		track(() => props.disabled)

		if (props.disabled) {
			contextService.updateTabState$(uniqueTabId, { disabled: true })
		}
	})

	useVisibleTask$(async function setMatchedTabPanelIdTask({ track }) {
		matchedTabPanelIdSig.value = await track(() => contextService.getMatchedPanelId$(uniqueTabId))
	})

	useVisibleTask$(function preventDefaultOnKeysVisibleTask({ cleanup }) {
		function handler(event: KeyboardEvent) {
			if (preventedKeys.includes(event.key as KeyCode)) {
				event.preventDefault()
			}
			contextService.onTabKeyDown$(event.key as KeyCode, uniqueTabId)
		}
		elementRefSig.value?.addEventListener("keydown", handler)
		cleanup(() => {
			elementRefSig.value?.removeEventListener("keydown", handler)
		})
	})

	const selectIfAutomatic = $(() => {
		contextService.selectIfAutomatic$(uniqueTabId)
	})

	return (
		<button
			id={`tab-${uniqueTabId}`}
			data-tab-id={uniqueTabId}
			data-state={isSelectedSig.value ? "active" : "inactive"}
			data-disabled={props.disabled}
			type="button"
			role="tab"
			ref={elementRefSig}
			disabled={props.disabled}
			aria-disabled={props.disabled}
			onFocus$={selectIfAutomatic}
			onMouseEnter$={selectIfAutomatic}
			aria-selected={isSelectedSig.value}
			tabIndex={isSelectedSig.value ? 0 : -1}
			aria-controls={`tabpanel-${matchedTabPanelIdSig.value}`}
			class={`${isSelectedSig.value ? `selected ${selectedClassNameSig.value || ""}` : ""}${
				props.class ? ` ${props.class}` : ""
			}`}
			onClick$={(event) => {
				contextService.selectTab$(uniqueTabId)
				if (props.onClick$) {
					props.onClick$(event)
				}
			}}
			style={props.style}
		>
			<Slot />
		</button>
	)
})
