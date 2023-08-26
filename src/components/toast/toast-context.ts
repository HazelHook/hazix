import { CSSProperties, Component, QRL, QwikMouseEvent, createContextId, useContext } from "@builder.io/qwik"

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
export type ToastTypes = "normal" | "action" | "success" | "error" | "loading"

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>)

export type PromiseData = ExternalToast & {
	loading: string | Component<any>
	success: string | Component<any>
	error: string | Component<any>
	finally?: () => void | Promise<void>
}

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

export type ExternalToast = Omit<Toast, "id" | "type" | "title"> & {
	id?: number | string
}

export interface Height {
	height: number
	toastId: number | string
}

export type ThemeStore = {
	toasts: Toast[]
	toastCounter: number
	add: QRL<(this: ThemeStore, value: Toast) => void>
	remove: QRL<(this: ThemeStore, toastId: string | number) => void>
	create: QRL<
		(
			this: ThemeStore,
			value: ExternalToast & { message?: string | Component<any>; type?: ToastTypes },
		) => string | number
	>
	message: QRL<(this: ThemeStore, value: { message: string | Component<any>; data?: ExternalToast }) => void>
	error: QRL<(this: ThemeStore, value: { message: string | Component<any>; data?: ExternalToast }) => void>
	success: QRL<(this: ThemeStore, value: { message: string | Component<any>; data?: ExternalToast }) => void>
	promise: QRL<(this: ThemeStore, promise: PromiseT<any>, data: PromiseData) => void>
}

export const ToastContext = createContextId<ThemeStore>("toast-context")
export function useToastContext() {
	return useContext(ToastContext)
}