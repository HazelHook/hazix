import { $, useContext } from "@builder.io/qwik"
import { ToastContext } from "./toast-context"

export const useToast = () => {
	const context = useContext(ToastContext)

	// eslint-disable-next-line qwik/valid-lexical-scope
	const message = $((value: any) => context.message(value))

	return {
		toasts: context.toasts,
		counter: context.toastCounter,
		toast: {
			message$: message,
		},
	}
}

export * from "./toast"
export * from "./toaster"
