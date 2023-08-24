import { useContext } from "@builder.io/qwik"
import { ToastContext } from "./toast-context"

export const useToast = () => {
	const context = useContext(ToastContext)

	return {
		toasts: context.toasts,
		counter: context.toastCounter,
		toast: {
			message$: context.message,
		},
	}
}

export * from "./toast"
export * from "./toaster"
