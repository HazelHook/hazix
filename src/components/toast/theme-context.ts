import { CSSProperties, Component, QRL, QwikMouseEvent, createContextId } from "@builder.io/qwik"

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
export type ToastTypes = "normal" | "action" | "success" | "error" | "loading"

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>)

export interface Toast {
	id: number | string
	title?: string | Component<any>
	type?: ToastTypes
	icon?: Component<any>
	jsx?: Component<any>
	closeButton?: boolean
	invert?: boolean
	description?: Component<any>
	duration?: number
	delete?: boolean
	important?: boolean
	action?: {
		label: string
		onClick: (event: QwikMouseEvent<HTMLButtonElement>) => void
	}
	cancel?: {
		label: string
		onClick?: () => void
	}
	onDismiss?: (toast: Toast) => void
	onAutoClose?: (toast: Toast) => void
	promise?: PromiseT
	style?: CSSProperties
	class?: string
	descriptionClass?: string
}

export type ThemeStore = {
	toasts: Toast[]
	add: QRL<(this: ThemeStore, value: Toast) => void>
}

export const ToastContext = createContextId<ThemeStore>("toast-context")
